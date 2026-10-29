#ifndef LOG_LOCAL_LEVEL
#define LOG_LOCAL_LEVEL 3
#endif
#include "esp_idf_version.h"
#include "esp_bt.h"
#include "esp_bt_device.h"
#include "esp_bt_main.h"
#include "esp_gap_bt_api.h"
#include "esp_log.h"
#include "esp_spp_api.h"
#include "ps4r.h"
#include "ps4r_int.h"

#define PS4_TAG "PS4_SPP"

/********************************************************************************/
/*              L O C A L    F U N C T I O N     P R O T O T Y P E S            */
/********************************************************************************/
static bool legacy_pairing;
static bool clear_bonds_on_start;
static bool connection_allowed = true;
void ps4r_sppSetClearBondsOnStart(bool enabled) { clear_bonds_on_start = enabled; }
bool ps4r_sppCanAcceptConnections(void) { return connection_allowed; }
void ps4r_sppSetLegacyPairing(bool enabled) { legacy_pairing = enabled; }

static const char* acl_reason_name(unsigned reason) {
  switch (reason) {
    case 0x105: return "AUTHENTICATION_FAILURE";
    case 0x106: return "PIN_OR_KEY_MISSING";
    case 0x108: return "CONNECTION_TIMEOUT";
    case 0x113: return "REMOTE_USER_TERMINATED";
    case 0x115: return "REMOTE_POWER_OFF";
    case 0x116: return "LOCAL_HOST_TERMINATED";
    default: return "OTHER";
  }
}

#define PS4R_PEER_FMT "%02x:%02x:%02x:%02x:%02x:%02x"
#define PS4R_PEER(a) (a)[0],(a)[1],(a)[2],(a)[3],(a)[4],(a)[5]
static void gapCallback(esp_bt_gap_cb_event_t event, esp_bt_gap_cb_param_t* param) {
  if (!param) return;
  switch (event) {
    case ESP_BT_GAP_REMOVE_BOND_DEV_COMPLETE_EVT:
      ESP_LOGI("PS4R", "BOND REMOVE COMPLETE status=%u peer=" PS4R_PEER_FMT,
        param->remove_bond_dev_cmpl.status, PS4R_PEER(param->remove_bond_dev_cmpl.bda));
      ps4r_bond_removed(param->remove_bond_dev_cmpl.bda, (int)param->remove_bond_dev_cmpl.status);
      break;
    case ESP_BT_GAP_AUTH_CMPL_EVT:
      ESP_LOGI("PS4R", "AUTH status=%u hex=0x%x peer=" PS4R_PEER_FMT " bonds=%d",
        param->auth_cmpl.stat, (unsigned)param->auth_cmpl.stat,
        PS4R_PEER(param->auth_cmpl.bda), esp_bt_gap_get_bond_device_num());
      break;
    case ESP_BT_GAP_CFM_REQ_EVT: {
      // No display or keyboard: SSP Just Works. Do not log or invent key material.
      const esp_err_t result = esp_bt_gap_ssp_confirm_reply(param->cfm_req.bda, !legacy_pairing);
      ESP_LOGI("PS4R", "SSP CONFIRM accept=%u result=%d peer=" PS4R_PEER_FMT,
        !legacy_pairing, (int)result, PS4R_PEER(param->cfm_req.bda));
      break;
    }
    case ESP_BT_GAP_PIN_REQ_EVT: {
      // Optional legacy experiment only; never guess a sixteen-digit PIN.
      esp_bt_pin_code_t pin = {'0','0','0','0'};
      const bool accept = legacy_pairing && !param->pin_req.min_16_digit;
      const esp_err_t result = esp_bt_gap_pin_reply(param->pin_req.bda, accept, accept ? 4 : 0, pin);
      ESP_LOGI("PS4R", "PIN REQUEST accept=%u min16=%u result=%d peer=" PS4R_PEER_FMT,
        accept, param->pin_req.min_16_digit, (int)result, PS4R_PEER(param->pin_req.bda));
      break;
    }
    case ESP_BT_GAP_KEY_REQ_EVT: {
      const esp_err_t result = esp_bt_gap_ssp_passkey_reply(param->key_req.bda, false, 0);
      ESP_LOGI("PS4R", "PASSKEY INPUT unavailable result=%d", (int)result);
      break;
    }
    case ESP_BT_GAP_KEY_NOTIF_EVT:
      ESP_LOGI("PS4R", "PASSKEY NOTIFICATION (no display/input)");
      break;
#if ESP_IDF_VERSION >= ESP_IDF_VERSION_VAL(5, 3, 0)
    case ESP_BT_GAP_ACL_CONN_CMPL_STAT_EVT:
      ESP_LOGI("PS4R", "ACL CONNECT status=%u handle=%u peer=" PS4R_PEER_FMT,
        param->acl_conn_cmpl_stat.stat, param->acl_conn_cmpl_stat.handle,
        PS4R_PEER(param->acl_conn_cmpl_stat.bda));
      break;
    case ESP_BT_GAP_ACL_DISCONN_CMPL_STAT_EVT:
      ESP_LOGI("PS4R", "ACL DISCONNECT reason=%u hex=0x%x %s handle=%u peer=" PS4R_PEER_FMT,
        param->acl_disconn_cmpl_stat.reason, (unsigned)param->acl_disconn_cmpl_stat.reason,
        acl_reason_name((unsigned)param->acl_disconn_cmpl_stat.reason),
        param->acl_disconn_cmpl_stat.handle, PS4R_PEER(param->acl_disconn_cmpl_stat.bda));
      ps4r_l2cap_acl_disconnected(param->acl_disconn_cmpl_stat.bda);
      break;
#endif
    default:
      break;
  }
}

static void sppCallback(esp_spp_cb_event_t event, esp_spp_cb_param_t* param);

/********************************************************************************/
/*                      P U B L I C    F U N C T I O N S                        */
/********************************************************************************/

/*******************************************************************************
**
** Function         ps4r_sppInit
**
** Description      Initialise the SPP server to allow to be connected to
**
** Returns          void
**
*******************************************************************************/
bool ps4r_sppInit() {
  esp_err_t ret;


#ifndef ARDUINO_ARCH_ESP32
  esp_bt_controller_config_t bt_cfg = BT_CONTROLLER_INIT_CONFIG_DEFAULT();
  if ((ret = esp_bt_controller_init(&bt_cfg)) != ESP_OK) {
    ESP_LOGE(PS4_TAG, "%s initialize controller failed: %s\n", __func__, esp_err_to_name(ret));
    return false;
  }

  if ((ret = esp_bt_controller_enable(BT_MODE)) != ESP_OK) {
    ESP_LOGE(PS4_TAG, "%s enable controller failed: %s\n", __func__, esp_err_to_name(ret));
    return false;
  }

  if ((ret = esp_bluedroid_init()) != ESP_OK) {
    ESP_LOGE(PS4_TAG, "%s initialize bluedroid failed: %s\n", __func__, esp_err_to_name(ret));
    return false;
  }

  if ((ret = esp_bluedroid_enable()) != ESP_OK) {
    ESP_LOGE(PS4_TAG, "%s enable bluedroid failed: %s\n", __func__, esp_err_to_name(ret));
    return false;
  }
#endif

  if (esp_bt_gap_register_callback(gapCallback) != ESP_OK) return false;
  connection_allowed = !clear_bonds_on_start;
  if (clear_bonds_on_start) {
    if (esp_bt_gap_set_scan_mode(ESP_BT_NON_CONNECTABLE, ESP_BT_NON_DISCOVERABLE) != ESP_OK) {
      ESP_LOGE("PS4R", "BONDS FAILED cannot suspend connections");
      return false;
    }
    if (!ps4r_clear_bonds()) return false;
    connection_allowed = true;
  }
  if (!legacy_pairing) {
    esp_bt_io_cap_t capability = ESP_BT_IO_CAP_NONE;
    ret = esp_bt_gap_set_security_param(ESP_BT_SP_IOCAP_MODE, &capability, sizeof(capability));
    if (ret != ESP_OK) {
      ESP_LOGE("PS4R", "PAIRING config failed result=%d", (int)ret);
      return false;
    }
  }
  esp_bt_pin_code_t pin = {0};
  ret = esp_bt_gap_set_pin(ESP_BT_PIN_TYPE_VARIABLE, 0, pin);
  if (ret != ESP_OK) {
    ESP_LOGE("PS4R", "PIN config failed result=%d", (int)ret);
    return false;
  }
  ESP_LOGI("PS4R", "PAIRING CONFIG mode=%s bonds=%d", legacy_pairing ? "LEGACY_TEST" : "SSP_NO_IO", esp_bt_gap_get_bond_device_num());

  if ((ret = esp_spp_register_callback(sppCallback)) != ESP_OK) {
    ESP_LOGE(PS4_TAG, "%s spp register failed: %s\n", __func__, esp_err_to_name(ret));
    return false;
  }

  if ((ret = esp_spp_init(ESP_SPP_MODE_CB)) != ESP_OK) {
    ESP_LOGE(PS4_TAG, "%s spp init failed: %s\n", __func__, esp_err_to_name(ret));
    return false;
  }
  return true;
}

/*******************************************************************************
**
** Function         ps4r_spp_deinit
**
** Description      Deinitialise the SPP server
**
** Returns          void
**
*******************************************************************************/
void ps4r_spp_deinit() {

    esp_err_t ret;

    if ((ret = esp_spp_deinit()) != ESP_OK) {
        ESP_LOGE(PS4_TAG, "%s spp deinit failed: %s\n", __func__, esp_err_to_name(ret));
        return;
    }

#ifndef ARDUINO_ARCH_ESP32
    if ((ret = esp_bluedroid_disable()) != ESP_OK) {
        ESP_LOGE(PS4_TAG, "%s disable bluedroid failed: %s\n", __func__, esp_err_to_name(ret));
        return;
    }

    if ((ret = esp_bluedroid_deinit()) != ESP_OK) {
        ESP_LOGE(PS4_TAG, "%s deinitialize bluedroid failed: %s\n", __func__, esp_err_to_name(ret));
        return;
    }

    if ((ret = esp_bt_controller_disable()) != ESP_OK) {
        ESP_LOGE(PS4_TAG, "%s disable controller failed: %s\n", __func__, esp_err_to_name(ret));
        return;
    }

    if ((ret = esp_bt_controller_deinit()) != ESP_OK) {
        ESP_LOGE(PS4_TAG, "%s deinitialize controller failed: %s\n", __func__, esp_err_to_name(ret));
        return;
    }
#endif
}

/********************************************************************************/
/*                      L O C A L    F U N C T I O N S                          */
/********************************************************************************/

/*******************************************************************************
**
** Function         sppCallback
**
** Description      Callback for SPP events, only used for the init event to
**                  configure the SPP server
**
** Returns          void
**
*******************************************************************************/
static void sppCallback(esp_spp_cb_event_t event, esp_spp_cb_param_t* param) {
  if (event == ESP_SPP_INIT_EVT) {
    ESP_LOGI(PS4_TAG, "ESP_SPP_INIT_EVT");
    ps4r_l2cap_restore_connectable();
  }
}
