/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Code generator for mbed Digital and Analogue input/output.
 *     mbed built in function docs: http://mbed.cc/en/Reference/HomePage
 */
'use strict';

goog.provide('Blockly.mbed.IO');

goog.require('Blockly.mbed');


/**
 * Function for 'set pin' (X) to a state (Y).
 * mbed code: setup { pinMode(X, OUTPUT); }
 *               loop  { digitalWrite(X, Y); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.mbed['io_digitalwrite'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var stateOutput = Blockly.mbed.valueToCode(
      block, 'STATE', Blockly.mbed.ORDER_ATOMIC) || 'LOW';

  Blockly.mbed.reservePin(
      block, pin, Blockly.mbed.PinTypes.OUTPUT, 'Digital Write');

  var digitalOut_Name = 'myDigitalOut'+ pin;
  Blockly.mbed.addDeclaration(digitalOut_Name , 'DigitalOut '+digitalOut_Name+'(' + pin + ');');
  
  var code = digitalOut_Name+'.write(' + stateOutput + ');\n';
  return code;
};

/**
 * Function for reading a digital pin (X).
 * mbed code: setup { pinMode(X, INPUT); }
 *               loop  { digitalRead(X)     }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.mbed['io_digitalread'] = function(block) {
  var pin = block.getFieldValue('PIN');
  Blockly.mbed.reservePin(
      block, pin, Blockly.mbed.PinTypes.INPUT, 'Digital Read');

  var digitalIn_Name = 'myDigitalIn'+ pin;
  Blockly.mbed.addDeclaration(digitalIn_Name , 'DigitalIn '+digitalIn_Name+'(' + pin + ');');

  var code = digitalIn_Name+'.read()';
  return [code, Blockly.mbed.ORDER_ATOMIC];
};

/**
 * Function for setting the state (Y) of a built-in LED (X).
 * mbed code: setup { pinMode(X, OUTPUT); }
 *               loop  { digitalWrite(X, Y); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.mbed['io_builtin_led'] = function(block) {
  var pin = block.getFieldValue('BUILT_IN_LED');
  var stateOutput = Blockly.mbed.valueToCode(
      block, 'STATE', Blockly.mbed.ORDER_ATOMIC) || 'LOW';

  Blockly.mbed.reservePin(
      block, pin, Blockly.mbed.PinTypes.OUTPUT, 'Set LED');

  var digitalOut_Name = 'myDigitalOut'+ pin;
  Blockly.mbed.addDeclaration(digitalOut_Name , 'DigitalOut '+digitalOut_Name+'(' + pin + ');');
  
  var code = digitalOut_Name+'.write(' + stateOutput + ');\n';
  return code;
};

/**
 * Function for setting the state (Y) of an analogue output (X).
 * mbed code: setup { pinMode(X, OUTPUT); }
 *               loop  { analogWrite(X, Y);  }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.mbed['io_analogwrite'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var stateOutput = Blockly.mbed.valueToCode(
      block, 'NUM', Blockly.mbed.ORDER_ATOMIC) || '0';

  Blockly.mbed.reservePin(
      block, pin, Blockly.mbed.PinTypes.OUTPUT, 'Analogue Write');

  var pinSetupCode = 'pinMode(' + pin + ', OUTPUT);';
  Blockly.mbed.addSetup('io_' + pin, pinSetupCode, false);

  // Warn if the input value is out of range
  if ((stateOutput < 0) || (stateOutput > 255)) {
    block.setWarningText('The analogue value set must be between 0 and 255',
                         'pwm_value');
  } else {
    block.setWarningText(null, 'pwm_value');
  }

  var code = 'analogWrite(' + pin + ', ' + stateOutput + ');\n';
  return code;
};

/**
 * Function for reading an analogue pin value (X).
 * mbed code: setup { pinMode(X, INPUT); }
 *            loop  { analogRead(X)      }
 *  modified on 2018/4/25
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.mbed['io_analogread'] = function(block) {
  var pin = block.getFieldValue('PIN');
  Blockly.mbed.reservePin(
      block, pin, Blockly.mbed.PinTypes.INPUT, 'Analogue Read');
  var ioName = 'myIO' + pin;

  Blockly.mbed.addDeclaration('io_' + pin, 'AnalogIn ' + ioName + '(' + pin + ');');

  var code = ioName + '.read()';  
  return [code, Blockly.mbed.ORDER_ATOMIC];
};

/**
 * Value for defining a digital pin state.
 * mbed code: loop { HIGH / LOW }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.mbed['io_highlow'] = function(block) {
  var code = block.getFieldValue('STATE');
  return [code, Blockly.mbed.ORDER_ATOMIC];
};

Blockly.mbed['io_pulsein'] = function(block) {
  var pin = block.getFieldValue("PULSEPIN");
  var type = Blockly.mbed.valueToCode(block, "PULSETYPE", Blockly.mbed.ORDER_ATOMIC);

  Blockly.mbed.reservePin(
      block, pin, Blockly.mbed.PinTypes.INPUT, 'Pulse Pin');

  var pinSetupCode = 'pinMode(' + pin + ', INPUT);\n';
  Blockly.mbed.addSetup('io_' + pin, pinSetupCode, false);

  var code = 'pulseIn(' + pin + ', ' + type + ')';

  return [code, Blockly.mbed.ORDER_ATOMIC];
};

Blockly.mbed['io_pulsetimeout'] = function(block) {
  var pin = block.getFieldValue("PULSEPIN");
  var type = Blockly.mbed.valueToCode(block, "PULSETYPE", Blockly.mbed.ORDER_ATOMIC);
  var timeout = Blockly.mbed.valueToCode(block, "TIMEOUT", Blockly.mbed.ORDER_ATOMIC);

  Blockly.mbed.reservePin(
      block, pin, Blockly.mbed.PinTypes.INPUT, 'Pulse Pin');

  var pinSetupCode = 'pinMode(' + pin + ', INPUT);\n';
  Blockly.mbed.addSetup('io_' + pin, pinSetupCode, false);

  var code = 'pulseIn(' + pin + ', ' + type + ', ' + timeout + ')';

  return [code, Blockly.mbed.ORDER_ATOMIC];
}; 
