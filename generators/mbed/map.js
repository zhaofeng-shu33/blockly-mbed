/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Code generator for the mbed map functionality.
 *     mbed built-in function docs: http://mbed.cc/en/Reference/HomePage
 */
'use strict';

goog.provide('Blockly.mbed.map');

goog.require('Blockly.mbed');


/**
 * Code generator for the map block.
 * mbed code: loop { map(x, 0, 1024, 0, y) }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.mbed['base_map'] = function(block) {
  var valueNum = Blockly.mbed.valueToCode(
      block, 'NUM', Blockly.mbed.ORDER_NONE) || '0';
  var valueDmax = Blockly.mbed.valueToCode(
      block, 'DMAX', Blockly.mbed.ORDER_ATOMIC) || '0';

  var code = 'map(' + valueNum + ', 0, 1024, 0, ' + valueDmax + ')';
  return [code, Blockly.mbed.ORDER_NONE];
};
