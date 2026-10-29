#ifndef PS4R_H
#define PS4R_H

#include <stdbool.h>
#include <stdint.h>

/********************************************************************************/
/*                                  T Y P E S */
/********************************************************************************/

/********************/
/*    A N A L O G   */
/********************/

typedef struct {
  int8_t lx;
  int8_t ly;
  int8_t rx;
  int8_t ry;
} ps4r_analog_stick_t;

typedef struct {
  uint8_t l2;
  uint8_t r2;
} ps4r_analog_button_t;

typedef struct {
  ps4r_analog_stick_t stick;
  ps4r_analog_button_t button;
} ps4r_analog_t;

/*********************/
/*   B U T T O N S   */
/*********************/

typedef struct {
  uint8_t right : 1;
  uint8_t down : 1;
  uint8_t up : 1;
  uint8_t left : 1;

  uint8_t square : 1;
  uint8_t cross : 1;
  uint8_t circle : 1;
  uint8_t triangle : 1;

  uint8_t upright : 1;
  uint8_t downright : 1;
  uint8_t upleft : 1;
  uint8_t downleft : 1;

  uint8_t l1 : 1;
  uint8_t r1 : 1;
  uint8_t l2 : 1;
  uint8_t r2 : 1;

  uint8_t share : 1;
  uint8_t options : 1;
  uint8_t l3 : 1;
  uint8_t r3 : 1;

  uint8_t ps : 1;
  uint8_t touchpad : 1;
} ps4r_button_t;

/*******************************/
/*   S T A T U S   F L A G S   */
/*******************************/

typedef struct {
  uint8_t battery;
  uint8_t charging : 1;
  uint8_t audio : 1;
  uint8_t mic : 1;
} ps4r_status_t;

/********************/
/*   S E N S O R S  */
/********************/

typedef struct {
  int16_t x;
  int16_t y;
  int16_t z;
} ps4r_sensor_gyroscope_t;

typedef struct {
  int16_t x;
  int16_t y;
  int16_t z;
} ps4r_sensor_accelerometer_t;

typedef struct {
  ps4r_sensor_accelerometer_t accelerometer;
  ps4r_sensor_gyroscope_t gyroscope;
} ps4r_sensor_t;

/*******************/
/*    O T H E R    */
/*******************/

typedef struct {
  uint8_t smallRumble;
  uint8_t largeRumble;
  uint8_t r, g, b;
  uint8_t flashOn;
  uint8_t flashOff;  // Time to flash bright/dark (255 = 2.5 seconds)
} ps4r_cmd_t;

typedef struct {
  ps4r_button_t button_down;
  ps4r_button_t button_up;
  ps4r_analog_t analog_move;
} ps4r_event_t;

typedef struct {
  ps4r_analog_t analog;
  ps4r_button_t button;
  ps4r_status_t status;
  ps4r_sensor_t sensor;
  uint8_t* latestPacket;
} ps4r_t;

/***************************/
/*    C A L L B A C K S    */
/***************************/

typedef void (*ps4r_connection_callback_t)(uint8_t isConnected);
typedef void (*ps4r_connection_object_callback_t)(void* object, uint8_t isConnected);

typedef void (*ps4r_event_callback_t)(ps4r_t ps4r, ps4r_event_t event);
typedef void (*ps4r_event_object_callback_t)(void* object, ps4r_t ps4r, ps4r_event_t event);

/********************************************************************************/
/*                             F U N C T I O N S */
/********************************************************************************/

bool ps4rIsConnected();
void ps4r_sppSetLegacyPairing(bool enabled);
bool ps4rInit();
void ps4rDeinit();
void ps4rEnable();
void ps4rCmd(ps4r_cmd_t ps4r_cmd);
void ps4rSetConnectionCallback(ps4r_connection_callback_t cb);
void ps4rSetConnectionObjectCallback(void* object, ps4r_connection_object_callback_t cb);
void ps4rSetEventCallback(ps4r_event_callback_t cb);
void ps4rSetEventObjectCallback(void* object, ps4r_event_object_callback_t cb);
void ps4rSetLed(uint8_t r, uint8_t g, uint8_t b);
void ps4rSetOutput(ps4r_cmd_t prev_cmd);
bool ps4rSetBluetoothMacAddress(const uint8_t* mac);

#endif

void ps4r_sppSetClearBondsOnStart(bool enabled);
bool ps4r_sppCanAcceptConnections(void);
bool ps4r_clear_bonds(void);
void ps4r_bond_removed(const uint8_t* peer, int status);
