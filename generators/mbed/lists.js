/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating mbed code for list blocks.
 *
 * TODO: A lot of this can be converted to arrays code by creating functions to
 *       replicate this kind of behavior.
 */
'use strict';

goog.provide('Blockly.mbed.lists');

goog.require('Blockly.mbed');


Blockly.mbed['lists_create_empty'] = Blockly.mbed.noGeneratorCodeInline;

Blockly.mbed['lists_create_with'] = Blockly.mbed.noGeneratorCodeInline;

Blockly.mbed['lists_repeat'] = Blockly.mbed.noGeneratorCodeInline;

Blockly.mbed['lists_length'] = Blockly.mbed.noGeneratorCodeInline;

Blockly.mbed['lists_isEmpty'] = Blockly.mbed.noGeneratorCodeInline;

Blockly.mbed['lists_indexOf'] = Blockly.mbed.noGeneratorCodeInline;

Blockly.mbed['lists_getIndex'] = Blockly.mbed.noGeneratorCodeInline;

Blockly.mbed['lists_setIndex'] = Blockly.mbed.noGeneratorCodeLine;
