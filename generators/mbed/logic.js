/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating mbed code for the logic blocks.
 */
'use strict';

goog.provide('Blockly.mbed.logic');

goog.require('Blockly.mbed');


/**
 * Code generator to create if/if else/else statement.
 * mbed code: loop { if (X)/else if ()/else { X } }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.mbed['controls_if'] = function(block) {
  var n = 0;
  var argument = Blockly.mbed.valueToCode(block, 'IF' + n,
      Blockly.mbed.ORDER_NONE) || 'false';
  var branch = Blockly.mbed.statementToCode(block, 'DO' + n);
  var code = 'if (' + argument + ') {\n' + branch + '}';
  for (n = 1; n <= block.elseifCount_; n++) {
    argument = Blockly.mbed.valueToCode(block, 'IF' + n,
        Blockly.mbed.ORDER_NONE) || 'false';
    branch = Blockly.mbed.statementToCode(block, 'DO' + n);
    code += ' else if (' + argument + ') {\n' + branch + '}';
  }
  if (block.elseCount_) {
    branch = Blockly.mbed.statementToCode(block, 'ELSE');
    code += ' else {\n' + branch + '}';
  }
  return code + '\n';
};

/**
 * Code generator for the comparison operator block.
 * mbed code: loop { X operator Y }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.mbed['logic_compare'] = function(block) {
  var OPERATORS = {
    'EQ': '==',
    'NEQ': '!=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };
  var operator = OPERATORS[block.getFieldValue('OP')];
  var order = (operator == '==' || operator == '!=') ?
      Blockly.mbed.ORDER_EQUALITY : Blockly.mbed.ORDER_RELATIONAL;
  var argument0 = Blockly.mbed.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.mbed.valueToCode(block, 'B', order) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

/**
 * Code generator for the logic operator block.
 * mbed code: loop { X operator Y }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.mbed['logic_operation'] = function(block) {
  var operator = (block.getFieldValue('OP') == 'AND') ? '&&' : '||';
  var order = (operator == '&&') ? Blockly.mbed.ORDER_LOGICAL_AND :
      Blockly.mbed.ORDER_LOGICAL_OR;
  var argument0 = Blockly.mbed.valueToCode(block, 'A', order) || 'false';
  var argument1 = Blockly.mbed.valueToCode(block, 'B', order) || 'false';
  if (!argument0 && !argument1) {
    // If there are no arguments, then the return value is false.
    argument0 = 'false';
    argument1 = 'false';
  } else {
    // Single missing arguments have no effect on the return value.
    var defaultArgument = (operator == '&&') ? 'true' : 'false';
    if (!argument0) {
      argument0 = defaultArgument;
    }
    if (!argument1) {
      argument1 = defaultArgument;
    }
  }
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

/**
 * Code generator for the logic negate operator.
 * mbed code: loop { !X }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.mbed['logic_negate'] = function(block) {
  var order = Blockly.mbed.ORDER_UNARY_PREFIX;
  var argument0 = Blockly.mbed.valueToCode(block, 'BOOL', order) || 'false';
  var code = '!' + argument0;
  return [code, order];
};

/**
 * Code generator for the boolean values true and false.
 * mbed code: loop { true/false }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.mbed['logic_boolean'] = function(block) {
  var code = (block.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false';
  return [code, Blockly.mbed.ORDER_ATOMIC];
};

/**
 * Code generator for the null value.
 * mbed code: loop { X ? Y : Z }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.mbed['logic_null'] = function(block) {
  var code = 'NULL';
  return [code, Blockly.mbed.ORDER_ATOMIC];
};

/**
 * Code generator for the ternary operator.
 * mbed code: loop { NULL }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 *
 * TODO: Check types of THEN and ELSE blocks and add warning to this block if
 *       they are different from each other.
 */
Blockly.mbed['logic_ternary'] = function(block) {
  var valueIf = Blockly.mbed.valueToCode(block, 'IF',
      Blockly.mbed.ORDER_CONDITIONAL) || 'false';
  var valueThen = Blockly.mbed.valueToCode(block, 'THEN',
      Blockly.mbed.ORDER_CONDITIONAL) || 'null';
  var valueElse = Blockly.mbed.valueToCode(block, 'ELSE',
      Blockly.mbed.ORDER_CONDITIONAL) || 'null';
  var code = valueIf + ' ? ' + valueThen + ' : ' + valueElse;
  return [code, Blockly.mbed.ORDER_CONDITIONAL];
};
