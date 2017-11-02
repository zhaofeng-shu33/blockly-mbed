/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview mbed code generator for the Time blocks.
 *     mbed built-in function docs: http://mbed.cc/en/Reference/HomePage
 */
'use strict';

goog.provide('Blockly.mbed.time');

goog.require('Blockly.mbed');


/**
 * Code generator for the delay mbed block.
 * mbed code: loop { delay(X); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
 Blockly.mbed['time_delay'] = function(block) {
  var delayTime = Blockly.mbed.valueToCode(
      block, 'DELAY_TIME_MILI', Blockly.mbed.ORDER_ATOMIC) || '0';
  var code = 'wait(' + delayTime/1000.0 + ');\n';
  return code;
};

/**
 * Code generator for the delayMicroseconds block.
 * mbed code: loop { delayMicroseconds(X); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
 Blockly.mbed['time_delaymicros'] = function(block) {
  var delayTimeMs = Blockly.mbed.valueToCode(
      block, 'DELAY_TIME_MICRO', Blockly.mbed.ORDER_ATOMIC) || '0';
  var code = 'delayMicroseconds(' + delayTimeMs + ');\n';
  return code;
};

/**
 * Code generator for the elapsed time in milliseconds block.
 * mbed code: loop { millis() }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
 Blockly.mbed['time_millis'] = function(block) {
  var code = 'millis()';
  return [code, Blockly.mbed.ORDER_ATOMIC];
};

/**
 * Code generator for the elapsed time in microseconds block.
 * mbed code: loop { micros() }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
 Blockly.mbed['time_micros'] = function(block) {
  var code = 'micros()';
  return [code, Blockly.mbed.ORDER_ATOMIC];
};

/**
 * Code generator for the wait forever (end of program) block
 * mbed code: loop { while(true); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
 Blockly.mbed['infinite_loop'] = function(block) {
  return 'while(true);\n';
};
