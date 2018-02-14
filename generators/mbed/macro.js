/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating mbed code for macro blocks.
 */
'use strict';

goog.provide('Blockly.mbed.macro');

goog.require('Blockly.mbed');


/**
 * Code generator for variable (X) getter.
 * mbed code: loop { X }
 * @param {Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.mbed['macro_get'] = function(block) {
  var code = Blockly.mbed.variableDB_.getName(block.getFieldValue('MACRO_NAME'),
      Blockly.Macro.NAME_TYPE);
  return [code, Blockly.mbed.ORDER_ATOMIC];
};

/**
 * Code generator for variable (X) setter (Y).
 * mbed code: type X;
 *               loop { X = Y; }
 * @param {Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.mbed['macro_define'] = function(block) {
  var argument0 = Blockly.mbed.valueToCode(block, 'MACRO_DEFINE_AS',
      Blockly.mbed.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.mbed.variableDB_.getName(
      block.getFieldValue('MACRO_NAME'), Blockly.Macro.NAME_TYPE);
  Blockly.mbed.addDeclaration(varName,'#define '+varName+' '+argument0);
  return '';
};

