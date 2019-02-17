/**
 * @license 
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @fileoverview additional messages for new blocks.
 * @version 1.0
 * Last modified on 12/03/2018 
 */

/**
 * @fileoverview English strings.
 * @author 616545598@qq.com (zhaofeng-shu33)
 *
 * After modifying this file, run 'build_language.py' from the parent directory to generate msg/js/en.js
 */
'use strict';

goog.provide('Blockly.Msg.en');

goog.require('Blockly.Msg');


/// Mbed Types
Blockly.Msg.MBED_TYPE_CHAR = 'Character';
Blockly.Msg.MBED_TYPE_TEXT = 'Text';
Blockly.Msg.MBED_TYPE_BOOL = 'Boolean';
Blockly.Msg.MBED_TYPE_SHORT = 'Short Number';
Blockly.Msg.MBED_TYPE_NUMBER = 'Number';
Blockly.Msg.MBED_TYPE_LONG = 'Large Number';
Blockly.Msg.MBED_TYPE_DECIMAL = 'Decimal';
Blockly.Msg.MBED_TYPE_ARRAY = 'Array';
Blockly.Msg.MBED_TYPE_NULL = 'Null';
Blockly.Msg.MBED_TYPE_UNDEF = 'Undefined';
Blockly.Msg.MBED_TYPE_CHILDBLOCKMISSING = 'ChildBlockMissing';

/// Mbed Blocks
Blockly.Msg.MBED_HIGH = 'HIGH';
Blockly.Msg.MBED_LOW = 'LOW';
Blockly.Msg.MBED_ANALOGREAD = 'read analog pin#';
Blockly.Msg.MBED_ANALOGREAD_TIP = 'Return value between 0 and 1024';
Blockly.Msg.MBED_ANALOGWRITE = 'set analog pin#';
Blockly.Msg.MBED_VALUE = 'value';
Blockly.Msg.MBED_ANALOGWRITE_TIP = 'Write analog value between 0 and 255 to a specific PWM Port';
Blockly.Msg.MBED_HIGHLOW_TIP = 'Set a pin state logic High or Low.';
Blockly.Msg.MBED_DIGITALREAD = 'read digital pin#';
Blockly.Msg.MBED_DIGITALREAD_TIP = 'Read digital value on a pin: HIGH or LOW';
Blockly.Msg.MBED_DIGITALWRITE = 'set digitial pin#';
Blockly.Msg.MBED_WRITE_TO = 'to';
Blockly.Msg.MBED_DIGITALWRITE_TIP = 'Write digital value HIGH or LOW to a specific Port';
Blockly.Msg.MBED_BUILTIN_LED = 'set built-in LED';
Blockly.Msg.MBED_BUILTIN_LED_TIP = 'Light on or off for the built-in LED of the Arduino';
Blockly.Msg.MBED_DEFINE = 'Define';
Blockly.Msg.MBED_TONE_PIN = 'Tone PIN#';
Blockly.Msg.MBED_TONE_FREQ = 'frequency';
Blockly.Msg.MBED_TONE_PIN_TIP = 'Generate audio tones on a pin';
Blockly.Msg.MBED_NOTONE_PIN = 'No tone PIN#';
Blockly.Msg.MBED_NOTONE_PIN_TIP = 'Stop generating a tone on a pin';
Blockly.Msg.MBED_MAP = 'Map';
Blockly.Msg.MBED_MAP_VAL = 'value to [0-';
Blockly.Msg.MBED_MAP_TIP = 'Re-maps a number from [0-1024] to another.';
Blockly.Msg.MBED_FUN_RUN_SETUP = 'Arduino run first:';
Blockly.Msg.MBED_FUN_RUN_LOOP = 'Arduino loop forever:';
Blockly.Msg.MBED_FUN_RUN_TIP = 'Defines the Arduino setup() and loop() functions.';
Blockly.Msg.MBED_PIN_WARN1 = 'Pin %1 is needed for %2 as pin %3. Already used as %4.';
Blockly.Msg.MBED_SERIAL_SETUP = 'Setup';
Blockly.Msg.MBED_SERIAL_SPEED = ':  speed to';
Blockly.Msg.MBED_SERIAL_BPS = 'bps';
Blockly.Msg.MBED_SERIAL_SETUP_TIP = 'Selects the speed for a specific Serial peripheral';
Blockly.Msg.MBED_SERIAL_PRINT = 'print';
Blockly.Msg.MBED_SERIAL_PRINT_NEWLINE = 'add new line';
Blockly.Msg.MBED_SERIAL_PRINT_TIP = 'Prints data to the console/serial port as human-readable ASCII text.';
Blockly.Msg.MBED_SERIAL_PRINT_WARN = 'A setup block for %1 must be added to the workspace to use this block!'
Blockly.Msg.MBED_SERVO_WRITE = 'set SERVO from Pin';
Blockly.Msg.MBED_SERVO_WRITE_TO = 'to';
Blockly.Msg.MBED_SERVO_WRITE_DEG_180 = 'Degrees (0~180)';
Blockly.Msg.MBED_SERVO_WRITE_TIP = 'Set a Servo to an specified angle';
Blockly.Msg.MBED_SERVO_READ = 'read SERVO from PIN#';
Blockly.Msg.MBED_SERVO_READ_TIP = 'Read a Servo angle';
Blockly.Msg.MBED_SPI_SETUP = 'Setup';
Blockly.Msg.MBED_SPI_SETUP_CONF = 'configuration:';
Blockly.Msg.MBED_SPI_SETUP_SHIFT = 'data shift';
Blockly.Msg.MBED_SPI_SETUP_MSBFIRST = 'MSBFIRST';
Blockly.Msg.MBED_SPI_SETUP_LSBFIRST = 'LSBFIRST';
Blockly.Msg.MBED_SPI_SETUP_DIVIDE = 'clock divide';
Blockly.Msg.MBED_SPI_SETUP_MODE = 'SPI mode (idle - edge)';
Blockly.Msg.MBED_SPI_SETUP_MODE0 = '0 (Low - Falling)';
Blockly.Msg.MBED_SPI_SETUP_MODE1 = '1 (Low - Rising)';
Blockly.Msg.MBED_SPI_SETUP_MODE2 = '2 (High - Falling)';
Blockly.Msg.MBED_SPI_SETUP_MODE3 = '3 (High - Rising)';
Blockly.Msg.MBED_SPI_SETUP_TIP = 'Configures the SPI peripheral.';
Blockly.Msg.MBED_SPI_TRANS_NONE = 'none';
Blockly.Msg.MBED_SPI_TRANS_VAL = 'transfer';
Blockly.Msg.MBED_SPI_TRANS_SLAVE = 'to slave pin';
Blockly.Msg.MBED_SPI_TRANS_TIP = 'Send a SPI message to an specified slave device.';
Blockly.Msg.MBED_SPI_TRANS_WARN1 = 'A setup block for %1 must be added to the workspace to use this block!';
Blockly.Msg.MBED_SPI_TRANS_WARN2 = 'Old pin value %1 is no longer available.';
Blockly.Msg.MBED_SPI_TRANSRETURN_TIP = 'Send a SPI message to an specified slave device and get data back.';
Blockly.Msg.MBED_STEPPER_SETUP = 'Setup stepper motor';
Blockly.Msg.MBED_STEPPER_MOTOR = 'stepper motor:';
Blockly.Msg.MBED_STEPPER_DEFAULT_NAME = 'MyStepper';
Blockly.Msg.MBED_STEPPER_PIN1 = 'pin1#';
Blockly.Msg.MBED_STEPPER_PIN2 = 'pin2#';
Blockly.Msg.MBED_STEPPER_REVOLVS = 'how many steps per revolution';
Blockly.Msg.MBED_STEPPER_SPEED = 'set speed (rpm) to';
Blockly.Msg.MBED_STEPPER_SETUP_TIP = 'Configures a stepper motor pinout and other settings.';
Blockly.Msg.MBED_STEPPER_STEP = 'move stepper';
Blockly.Msg.MBED_STEPPER_STEPS = 'steps';
Blockly.Msg.MBED_STEPPER_STEP_TIP = 'Turns the stepper motor a specific number of steps.';
Blockly.Msg.MBED_STEPPER_COMPONENT = 'stepper';
Blockly.Msg.MBED_COMPONENT_WARN1 = 'A %1 configuration block with the same %2 name must be added to use this block!';
Blockly.Msg.MBED_TIME_DELAY = 'wait';
Blockly.Msg.MBED_TIME_MS = 'milliseconds';
Blockly.Msg.MBED_TIME_DELAY_TIP = 'Wait specific time in milliseconds';
Blockly.Msg.MBED_TIME_DELAY_MICROS = 'microseconds';
Blockly.Msg.MBED_TIME_DELAY_MICRO_TIP = 'Wait specific time in microseconds';
Blockly.Msg.MBED_TIME_MILLIS = 'current elapsed Time (milliseconds)';
Blockly.Msg.MBED_TIME_MILLIS_TIP = 'Returns the number of milliseconds since the Arduino board began running the current program. Has to be stored in a positive long integer';
Blockly.Msg.MBED_TIME_MICROS = 'current elapsed Time (microseconds)';
Blockly.Msg.MBED_TIME_MICROS_TIP = 'Returns the number of microseconds since the Arduino board began running the current program. Has to be stored in a positive long integer';
Blockly.Msg.MBED_TIME_INF = 'wait forever (end program)';
Blockly.Msg.MBED_TIME_INF_TIP = 'Wait indefinitely, stopping the program.'
Blockly.Msg.MBED_VAR_AS = 'as';
Blockly.Msg.MBED_VAR_AS_TIP = 'Sets a value to a specific type';
Blockly.Msg.MBED_PULSEREAD = 'Read';
Blockly.Msg.MBED_PULSEON = 'pulse on pin #';
Blockly.Msg.MBED_PULSETIMEOUT = 'timeout after';
Blockly.Msg.MBED_PULSETIMEOUT_MS = '';
Blockly.Msg.MBED_PULSE_TIP = 'Measures the duration of a pulse on the selected pin.';
Blockly.Msg.MBED_PULSETIMEOUT_TIP = 'Measures the duration of a pulse on the selected pin, if it is within the timeout.';
Blockly.Msg.MBED_SETTONE = 'Set tone on pin #';
Blockly.Msg.MBED_TONEFREQ = 'at frequency';
Blockly.Msg.MBED_TONE_TIP = 'Sets tone on pin to specified frequency within range 31 - 65535';
Blockly.Msg.MBED_TONE_WARNING = 'Frequency must be in range 31 - 65535';
Blockly.Msg.MBED_NOTONE = 'Turn off tone on pin #';
Blockly.Msg.MBED_NOTONE_TIP = 'Turns the tone off on the selected pin';

/// Mbed macros
Blockly.Msg.MBED_NEW_MACRO = 'New macro...';
Blockly.Msg.MBED_NEW_MACRO_TITLE = 'New macro name:';
Blockly.Msg.MBED_RENAME_MACRO = 'Rename macro...'
Blockly.Msg.MBED_RENAME_MACRO_TITLE = 'Rename all "%1" macros to:';
Blockly.Msg.MBED_MACRO_DEFAULT_NAME = 'newMacro';
Blockly.Msg.MBED_MACRO_DEFINE_CREATE_SET = 'Create "define %1"';
Blockly.Msg.MBED_MACRO_GET_HELPURL = '';
Blockly.Msg.MBED_MACRO_GET_TOOLTIP = 'get the value of this macro';
Blockly.Msg.MBED_MACRO_DEFINE = 'define %1 as %2';
Blockly.Msg.MBED_MACRO_DEFINE_HELPURL = '';
Blockly.Msg.MBED_MACRO_DEFINE_TOOLTIP = 'Defines this macro to be equal to the input.';