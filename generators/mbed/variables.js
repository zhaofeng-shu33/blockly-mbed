/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating mbed code for variables blocks.
 */
'use strict';

goog.provide('Blockly.mbed.variables');

goog.require('Blockly.mbed');


/**
 * Code generator for variable (X) getter.
 * mbed code: loop { X }
 * @param {Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.mbed['variables_get'] = function(block) {
  var code = Blockly.mbed.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return [code, Blockly.mbed.ORDER_ATOMIC];
};

/**
 * Code generator for variable (X) setter (Y).
 * mbed code: type X;
 *               loop { X = Y; }
 * @param {Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.mbed['variables_set'] = function(block) {
  var argument0 = Blockly.mbed.valueToCode(block, 'VALUE',
      Blockly.mbed.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.mbed.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  return varName + ' = ' + argument0 + ';\n';
};

/**
 * Code generator for variable (X) casting (Y).
 * mbed code: loop { (Y)X }
 * @param {Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.mbed['variables_set_type'] = function(block) {
  var argument0 = Blockly.mbed.valueToCode(block, 'VARIABLE_SETTYPE_INPUT',
      Blockly.mbed.ORDER_ASSIGNMENT) || '0';
  var varType = Blockly.mbed.getmbedType_(
      Blockly.Types[block.getFieldValue('VARIABLE_SETTYPE_TYPE')]);
  var code = '(' + varType + ')(' + argument0 + ')';
  return [code, Blockly.mbed.ORDER_ATOMIC];
};
