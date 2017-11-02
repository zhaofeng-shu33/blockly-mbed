/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview mbed code generator for the Servo library blocks.
 *     The mbed Servo library docs: http://mbed.cc/en/reference/servo
 *
 * TODO: If angle selector added to blocks edit code here.
 */
'use strict';

goog.provide('Blockly.mbed.servo');

goog.require('Blockly.mbed');


/**
 * Code generator to set an angle (Y) value to a servo PWM pin (X).
 * mbed code: #include <Servo.h>
 *               Servo myServoX;
 *               setup { myServoX.attach(X); }
 *               loop  { myServoX.write(Y);  }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.mbed['servo_write'] = function(block) {
  var pinKey = block.getFieldValue('SERVO_PIN');
  var servoPeriod = Blockly.mbed.valueToCode(
      block, 'SERVO_PERIOD', Blockly.mbed.ORDER_ATOMIC) || '1';
  var servoPulseWidth = Blockly.mbed.valueToCode(
      block, 'SERVO_PULSEWIDTH', Blockly.mbed.ORDER_ATOMIC) || '1';      
  var servoName = 'myServo' + pinKey;

  Blockly.mbed.reservePin(
      block, pinKey, Blockly.mbed.PinTypes.SERVO, 'Servo Write');

  //Blockly.mbed.addInclude('servo', '#include <Servo.h>');
  Blockly.mbed.addDeclaration('servo_' + pinKey, 'PwmOut '+servoName+'(' + pinKey + ');');

  //var setupCode = servoName + '.attach(' + pinKey + ');';
  //Blockly.mbed.addSetup('servo_' + pinKey, setupCode, true);

  var code = servoName + '.period(' + servoPeriod + ');\n';
  code = code + servoName + '.pulsewidth(' + servoPulseWidth + ');\n';
  return code;
};

/**
 * Code generator to read an angle value from a servo PWM pin (X).
 * mbed code: #include <Servo.h>
 *               Servo myServoX;
 *               setup { myServoX.attach(X); }
 *               loop  { myServoX.read();    }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.mbed['servo_read'] = function(block) {
  var pinKey = block.getFieldValue('SERVO_PIN');
  var servoName = 'myServo' + pinKey;

  Blockly.mbed.reservePin(
      block, pinKey, Blockly.mbed.PinTypes.SERVO, 'Servo Read');

  Blockly.mbed.addInclude('servo', '#include <Servo.h>');
  Blockly.mbed.addDeclaration('servo_' + pinKey, 'Servo ' + servoName + ';');

  var setupCode = servoName + '.attach(' + pinKey + ');';
  Blockly.mbed.addSetup('servo_' + pinKey, setupCode, true);

  var code = servoName + '.read()';
  return [code, Blockly.mbed.ORDER_ATOMIC];
};
