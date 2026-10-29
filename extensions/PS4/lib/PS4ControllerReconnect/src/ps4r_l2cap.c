// PS4R experimental reconnect transport. Original PS4Controller is unchanged.
#ifndef LOG_LOCAL_LEVEL
#define LOG_LOCAL_LEVEL 3
#endif
#include <stdint.h>
#include <stdbool.h>
#include <string.h>
#include "ps4r.h"
#include "ps4r_int.h"
#include "esp_log.h"
#include "esp_bt.h"
#include "esp_bt_main.h"
#include "esp_gap_bt_api.h"
#include "stack/gap_api.h"
#include "stack/bt_types.h"
#include "stack/l2c_api.h"
#include "osi/allocator.h"
#define PS4R_TAG "PS4R"

static uint16_t control_cid, interrupt_cid;
static bool control_local, interrupt_local, control_peer, interrupt_peer;
static bool transport_ready, have_peer;
static BD_ADDR peer_address;
static void connect_ind(BD_ADDR, uint16_t, uint16_t, uint8_t);
static void connect_cfm(uint16_t, uint16_t);
static void config_ind(uint16_t, tL2CAP_CFG_INFO*);
static void config_cfm(uint16_t, tL2CAP_CFG_INFO*);
static void disconnect_ind(uint16_t, bool);
static void disconnect_cfm(uint16_t, uint16_t);
static void data_ind(uint16_t, BT_HDR*);
static void congestion(uint16_t, bool);
static const tL2CAP_APPL_INFO callbacks = {
    connect_ind, connect_cfm, NULL, config_ind, config_cfm,
    disconnect_ind, disconnect_cfm, NULL, data_ind, congestion, NULL
};

void ps4r_l2cap_restore_connectable(void) {
    if (!ps4r_sppCanAcceptConnections()) {
        ESP_LOGI(PS4R_TAG, "CONNECTABLE blocked: bond cleanup incomplete");
        return;
    }
    const esp_err_t result = esp_bt_gap_set_scan_mode(ESP_BT_CONNECTABLE, ESP_BT_NON_DISCOVERABLE);
    ESP_LOGI(PS4R_TAG, "CONNECTABLE result=%d", (int)result);
}

// Clear our state before requesting the other channel's asynchronous close.
// Later callbacks belonging to those old CIDs must not reset a new session.
static void close_session(uint16_t already_closed, bool acl_closed) {
    const uint16_t old_control = control_cid, old_interrupt = interrupt_cid;
    const bool existed = have_peer || transport_ready;
    control_cid = interrupt_cid = 0;
    control_local = interrupt_local = control_peer = interrupt_peer = false;
    transport_ready = have_peer = false;
    memset(peer_address, 0, sizeof(peer_address));
    ps4rResetParser();
    if (existed) ps4rConnectEvent(false);
    if (!acl_closed) {
        if (old_control && old_control != already_closed) L2CA_DisconnectReq(old_control);
        if (old_interrupt && old_interrupt != already_closed) L2CA_DisconnectReq(old_interrupt);
    }
    ps4r_l2cap_restore_connectable();
}

void ps4r_l2cap_acl_disconnected(const uint8_t* address) {
    if (have_peer && memcmp(peer_address, address, sizeof(peer_address)) == 0) {
        close_session(0, true);
    } else if (!have_peer) {
        ps4r_l2cap_restore_connectable();
    }
}

static bool known_cid(uint16_t cid) {
    return cid && (cid == control_cid || cid == interrupt_cid);
}

static void check_ready(void) {
    if (!transport_ready && control_cid && interrupt_cid &&
        control_local && interrupt_local && control_peer && interrupt_peer) {
        transport_ready = true;
        ESP_LOGI(PS4R_TAG, "HID READY ctrl=%u intr=%u", control_cid, interrupt_cid);
        ps4rConnectEvent(true);
    }
}

bool ps4r_l2cap_init_services(void) {
    control_cid = interrupt_cid = 0;
    control_local = interrupt_local = control_peer = interrupt_peer = false;
    transport_ready = have_peer = false;
    ps4rResetParser();
    const uint16_t psms[] = {BT_PSM_HID_CONTROL, BT_PSM_HID_INTERRUPT};
    for (int i = 0; i < 2; ++i) {
        if (!L2CA_Register(psms[i], (tL2CAP_APPL_INFO*)&callbacks)) {
            ESP_LOGE(PS4R_TAG, "REGISTER FAILED psm=%u", psms[i]);
            if (i) L2CA_Deregister(psms[0]);
            return false;
        }
        if (!BTM_SetSecurityLevel(false, "PS4R", BTM_SEC_SERVICE_FIRST_EMPTY + i, 0, psms[i], 0, 0)) {
            ESP_LOGE(PS4R_TAG, "SECURITY REGISTER FAILED psm=%u", psms[i]);
            L2CA_Deregister(psms[i]);
            if (i) L2CA_Deregister(psms[0]);
            return false;
        }
    }
    return true;
}

void ps4r_l2cap_deinit_services(void) {
    close_session(0, false);
    L2CA_Deregister(BT_PSM_HID_CONTROL);
    L2CA_Deregister(BT_PSM_HID_INTERRUPT);
}

void ps4r_l2cap_send_hid(hid_cmd_t* command, uint8_t length) {
    if (!transport_ready || !control_cid || length > sizeof(command->data)) return;
    BT_HDR* buffer = (BT_HDR*)osi_malloc(BT_DEFAULT_BUFFER_SIZE);
    if (!buffer) {
        ESP_LOGE(PS4R_TAG, "TX allocation failed");
        return;
    }
    buffer->length = length + (sizeof(*command) - sizeof(command->data));
    buffer->offset = L2CAP_MIN_OFFSET;
    memcpy((uint8_t*)(buffer + 1) + buffer->offset, command, buffer->length);
    // L2CAP owns this buffer after DataWrite, including failure handling.
    const uint8_t result = L2CA_DataWrite(control_cid, buffer);
    if (result != L2CAP_DW_SUCCESS) ESP_LOGE(PS4R_TAG, "TX cid=%u result=%u", control_cid, result);
}

static void connect_ind(BD_ADDR address, uint16_t cid, uint16_t psm, uint8_t id) {
    ESP_LOGI(PS4R_TAG, "CONNECT cid=%u psm=%u peer=%02x:%02x:%02x:%02x:%02x:%02x",
        cid, psm, address[0], address[1], address[2], address[3], address[4], address[5]);
    if (!ps4r_sppCanAcceptConnections() || (psm != BT_PSM_HID_CONTROL && psm != BT_PSM_HID_INTERRUPT) ||
        (have_peer && memcmp(peer_address, address, sizeof(peer_address)) != 0) ||
        (psm == BT_PSM_HID_CONTROL && control_cid && control_cid != cid) ||
        (psm == BT_PSM_HID_INTERRUPT && interrupt_cid && interrupt_cid != cid)) {
        L2CA_CONNECT_RSP(address, id, cid, L2CAP_CONN_NO_RESOURCES, 0, NULL, NULL);
        return;
    }
    if (!have_peer) {
        ps4rResetParser();
        memcpy(peer_address, address, sizeof(peer_address));
        have_peer = true;
    }
    if (psm == BT_PSM_HID_CONTROL) {
        control_cid = cid;
        control_local = control_peer = false;
    } else {
        interrupt_cid = cid;
        interrupt_local = interrupt_peer = false;
    }
    if (!L2CA_CONNECT_RSP(address, id, cid, L2CAP_CONN_OK, 0, NULL, NULL)) {
        ESP_LOGE(PS4R_TAG, "CONNECT response failed cid=%u", cid);
        close_session(0, false);
        return;
    }
    tL2CAP_CFG_INFO config = {0};
    config.mtu_present = true;
    config.mtu = 672;
    if (!L2CA_CONFIG_REQ(cid, &config)) {
        ESP_LOGE(PS4R_TAG, "CONFIG request failed cid=%u", cid);
        close_session(0, false);
    }
}

static void connect_cfm(uint16_t cid, uint16_t result) {
    ESP_LOGI(PS4R_TAG, "CONNECT confirm cid=%u result=%u", cid, result);
    if (known_cid(cid) && result != L2CAP_CONN_OK && result != L2CAP_CONN_PENDING) close_session(0, false);
}

static void config_cfm(uint16_t cid, tL2CAP_CFG_INFO* config) {
    if (!known_cid(cid) || !config) return;
    ESP_LOGI(PS4R_TAG, "CONFIG confirm cid=%u result=%u", cid, config->result);
    if (config->result == L2CAP_CFG_PENDING) return;
    if (config->result != L2CAP_CFG_OK) {
        close_session(0, false);
        return;
    }
    if (cid == control_cid) control_local = true;
    if (cid == interrupt_cid) interrupt_local = true;
    check_ready();
}

static void config_ind(uint16_t cid, tL2CAP_CFG_INFO* config) {
    if (!known_cid(cid) || !config) return;
    config->result = L2CAP_CFG_OK;
    if (!L2CA_ConfigRsp(cid, config)) {
        ESP_LOGE(PS4R_TAG, "CONFIG response failed cid=%u", cid);
        close_session(0, false);
        return;
    }
    if (cid == control_cid) control_peer = true;
    if (cid == interrupt_cid) interrupt_peer = true;
    check_ready();
}

static void disconnect_ind(uint16_t cid, bool ack) {
    ESP_LOGI(PS4R_TAG, "DISCONNECT cid=%u ack=%u", cid, ack);
    if (ack) L2CA_DisconnectRsp(cid);
    if (known_cid(cid)) close_session(cid, false);
}

static void disconnect_cfm(uint16_t cid, uint16_t result) {
    ESP_LOGI(PS4R_TAG, "DISCONNECT confirm cid=%u result=%u", cid, result);
    if (known_cid(cid)) close_session(cid, false);
}

static void data_ind(uint16_t cid, BT_HDR* buffer) {
    if (!buffer) return;
    // Retain the original parser's legacy buffer layout/axis semantics.
    // Only a full-size report from this session may reach that parser.
    if (transport_ready && cid == interrupt_cid && buffer->length >= 43) ps4r_parsePacket(buffer->data);
    osi_free(buffer);
}

static void congestion(uint16_t cid, bool blocked) {
    ESP_LOGI(PS4R_TAG, "CONGESTION cid=%u blocked=%u", cid, blocked);
}
