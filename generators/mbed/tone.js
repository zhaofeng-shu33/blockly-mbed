/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Code generator for mbed Digital and Analogue input/output.
 *     mbed built in function docs: http://mbed.cc/en/Reference/HomePage
 */
'use strict';

goog.provide('Blockly.mbed.tone');

goog.require('Blockly.mbed');


/**
 * Function for turning the tone library on on a given pin (X).
 * mbed code: setup { pinMode(X, OUTPUT) }
 *               loop  { tone(X, frequency) }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */

Blockly.mbed['io_tone'] = function(block) {
  var pin = block.getFieldValue('TONEPIN');
  var freq = Blockly.mbed.valueToCode(block, 'FREQUENCY', Blockly.mbed.ORDER_ATOMIC);
  Blockly.mbed.reservePin(
      block, pin, Blockly.mbed.PinTypes.OUTPUT, 'Tone Pin');

  var pinSetupCode = 'pinMode(' + pin + ', OUTPUT);\n';
  Blockly.mbed.addSetup('io_' + pin, pinSetupCode, false);

  var code = 'tone(' + pin + ',' + freq + ');\n';
  return code;
};

Blockly.mbed['io_notone'] = function(block) {
  var pin = block.getFieldValue("TONEPIN");
  Blockly.mbed.reservePin(
      block, pin, Blockly.mbed.PinTypes.OUTPUT, 'Tone Pin');
  
  var pinSetupCode = 'pinMode(' + pin + ', OUTPUT);\n';
  Blockly.mbed.addSetup('io_' + pin, pinSetupCode, false);

  var code = 'noTone(' + pin + ');\n';
  return code;
};
