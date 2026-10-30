# EasyBNO055_ESP
A library to make the BNO055 easy to use by adding an ESP32 thread to manage access. 

`start()` has a finite initialization timeout. If the BNO055 is missing or its
I2C communication fails, the sketch continues running and the background task
stops instead of retrying forever. Use `isReady()` when code needs to check
whether valid orientation samples are available.
