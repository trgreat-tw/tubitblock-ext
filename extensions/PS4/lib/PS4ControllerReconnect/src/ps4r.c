#include "esp_mac.h"
#include "esp_log.h"
#include "PS4RMac.h"
#include "ps4r.h"
#include <esp_system.h>
#include <string.h>
#include "ps4r_int.h"

/* Detect ESP-IDF releases */
#include <esp_idf_version.h>

#if ESP_IDF_VERSION >= ESP_IDF_VERSION_VAL(5, 4, 1)
#include "esp_mac.h" //
#include "esp_spp_api.h" //
#endif

/********************************************************************************/
/*                              C O N S T A N T S                               */
/********************************************************************************/

static const uint8_t hid_cmd_payload_ps4_enable[] = { 0x43, 0x02 };

/********************************************************************************/
/*                         L O C A L    V A R I A B L E S                       */
/********************************************************************************/

static ps4r_connection_callback_t ps4r_connection_cb = NULL;
static ps4r_connection_object_callback_t ps4r_connection_object_cb = NULL;
static void* ps4r_connection_object = NULL;

static ps4r_event_callback_t ps4r_event_cb = NULL;
static ps4r_event_object_callback_t ps4r_event_object_cb = NULL;
static void* ps4r_event_object = NULL;

static volatile bool is_active = false;

/********************************************************************************/
/*                      P U B L I C    F U N C T I O N S                        */
/********************************************************************************/

/*******************************************************************************
**
** Function         ps4rInit
**
** Description      This initializes the bluetooth services to listen
**                  for an incoming PS4R controller connection.
**
**
** Returns          void
**
*******************************************************************************/
bool ps4rInit() {
  is_active = false;
  if (!ps4r_l2cap_init_services()) return false;
  if (!ps4r_sppInit()) { ps4r_l2cap_deinit_services(); return false; }
  return true;
}

/*******************************************************************************
**
** Function         ps4rDeinit
**
** Description      This deinitializes the bluetooth services to stop
**                  listening for incoming connections.
**
**
** Returns          void
**
*******************************************************************************/
void ps4rDeinit() {
    ps4r_l2cap_deinit_services();
#if ESP_IDF_VERSION >= ESP_IDF_VERSION_VAL(5, 4, 1)
    esp_spp_deinit();
#else
	  ps4r_spp_deinit();
#endif
}

/*******************************************************************************
**
** Function         ps4rIsConnected
**
** Description      This returns whether a PS4R controller is connected, based
**                  on whether a successful handshake has taken place.
**
**
** Returns          bool
**
*******************************************************************************/
bool ps4rIsConnected() {
  return is_active;
}

/*******************************************************************************
**
** Function         ps4rEnable
**
** Description      This triggers the PS4R controller to start continually
**                  sending its data.
**
**
** Returns          void
**
*******************************************************************************/
void ps4rEnable() {
  uint16_t length = sizeof(hid_cmd_payload_ps4_enable);
  hid_cmd_t hidCommand;

  hidCommand.code = hid_cmd_code_set_report | hid_cmd_code_type_feature;
  hidCommand.identifier = hid_cmd_identifier_ps4_enable;

  memcpy(hidCommand.data, hid_cmd_payload_ps4_enable, length);

  ps4r_l2cap_send_hid(&hidCommand, length);
  ps4rSetLed(32, 32, 200);
}

/*******************************************************************************
**
** Function         ps4rCmd
**
** Description      Send a command to the PS4R controller.
**
**
** Returns          void
**
*******************************************************************************/
void ps4rCmd(ps4r_cmd_t cmd) {
  hid_cmd_t hidCommand = { .data = { 0x80, 0x00, 0xFF } };
  uint16_t length = sizeof(hidCommand.data);

  hidCommand.code = hid_cmd_code_set_report | hid_cmd_code_type_output;
  hidCommand.identifier = hid_cmd_identifier_ps4_control;

  hidCommand.data[ps4r_control_packet_index_small_rumble] = cmd.smallRumble;  // Small Rumble
  hidCommand.data[ps4r_control_packet_index_large_rumble] = cmd.largeRumble;  // Big rumble

  hidCommand.data[ps4r_control_packet_index_red] = cmd.r;    // Red
  hidCommand.data[ps4r_control_packet_index_green] = cmd.g;  // Green
  hidCommand.data[ps4r_control_packet_index_blue] = cmd.b;   // Blue

  // Time to flash bright (255 = 2.5 seconds)
  hidCommand.data[ps4r_control_packet_index_flash_on_time] = cmd.flashOn;
  // Time to flash dark (255 = 2.5 seconds)
  hidCommand.data[ps4r_control_packet_index_flash_off_time] = cmd.flashOff;

  ps4r_l2cap_send_hid(&hidCommand, length);
}

/*******************************************************************************
**
** Function         ps4rSetLed
**
** Description      Sets the LEDs on the PS4R controller.
**
**
** Returns          void
**
*******************************************************************************/
void ps4rSetLed(uint8_t r, uint8_t g, uint8_t b) {
  ps4r_cmd_t cmd = { 0 };

  cmd.r = r;
  cmd.g = g;
  cmd.b = b;

  ps4rCmd(cmd);
}

/*******************************************************************************
**
** Function         ps4rSetOutput
**
** Description      Sets feedback on the PS4R controller.
**
**
** Returns          void
**
*******************************************************************************/
void ps4rSetOutput(ps4r_cmd_t prevCommand) {
  ps4rCmd(prevCommand);
}

/*******************************************************************************
**
** Function         ps4rSetConnectionCallback
**
** Description      Registers a callback for receiving PS4R controller
**                  connection notifications
**
**
** Returns          void
**
*******************************************************************************/
void ps4rSetConnectionCallback(ps4r_connection_callback_t cb) {
  ps4r_connection_cb = cb;
}

/*******************************************************************************
**
** Function         ps4rSetConnectionObjectCallback
**
** Description      Registers a callback for receiving PS4R controller
**                  connection notifications
**
**
** Returns          void
**
*******************************************************************************/
void ps4rSetConnectionObjectCallback(void* object, ps4r_connection_object_callback_t cb) {
  ps4r_connection_object_cb = cb;
  ps4r_connection_object = object;
}

/*******************************************************************************
**
** Function         ps4rSetEventCallback
**
** Description      Registers a callback for receiving PS4R controller events
**
**
** Returns          void
**
*******************************************************************************/
void ps4rSetEventCallback(ps4r_event_callback_t cb) {
  ps4r_event_cb = cb;
}

/*******************************************************************************
**
** Function         ps4rSetEventObjectCallback
**
** Description      Registers a callback for receiving PS4R controller events
**
**
** Returns          void
**
*******************************************************************************/
void ps4rSetEventObjectCallback(void* object, ps4r_event_object_callback_t cb) {
  ps4r_event_object_cb = cb;
  ps4r_event_object = object;
}

/*******************************************************************************
**
** Function         ps4rSetBluetoothMacAddress
**
** Description      Writes a Registers a callback for receiving PS4R controller
*events
**
**
** Returns          void
**
*******************************************************************************/
bool ps4rSetBluetoothMacAddress(const uint8_t* mac) {
  uint8_t baseMac[6];
  if (!ps4rMakeBaseMac(mac, baseMac)) return false;
#if ESP_IDF_VERSION >= ESP_IDF_VERSION_VAL(5, 4, 1)
  esp_err_t result=esp_iface_mac_addr_set(baseMac,ESP_MAC_BASE);
#else
  esp_err_t result=esp_base_mac_addr_set(baseMac);
#endif
  if (result != ESP_OK) ESP_LOGE("PS4R", "MAC setter rejected address: %d", (int)result);
  return result == ESP_OK;
}
/********************************************************************************/
/*                      L O C A L    F U N C T I O N S */
/********************************************************************************/
void ps4rConnectEvent(uint8_t connected) {
  if (connected) {
    ps4rEnable();
  } else {
    const bool was_active=is_active;
    is_active=false;
    if (was_active) {
      if (ps4r_connection_cb) ps4r_connection_cb(false);
      if (ps4r_connection_object_cb) ps4r_connection_object_cb(ps4r_connection_object,false);
    }
  }
}
void ps4rPacketEvent(ps4r_t data, ps4r_event_t event) {
  const bool first=!is_active;
  is_active=true;
  // Publish the first report too, before announcing an active controller.
  if (ps4r_event_cb) ps4r_event_cb(data,event);
  if (ps4r_event_object_cb) ps4r_event_object_cb(ps4r_event_object,data,event);
  if (first) {
    if (ps4r_connection_cb) ps4r_connection_cb(true);
    if (ps4r_connection_object_cb) ps4r_connection_object_cb(ps4r_connection_object,true);
  }
}
