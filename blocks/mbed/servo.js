/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview mbed blocks for the Servo library.
 *     The mbed Servo functions can be found in
 *     http://mbed.cc/en/reference/servo
 *
 * TODO: Add angle selector instead of block input.
 */
'use strict';

goog.provide('Blockly.Blocks.servo'); // "servo" not exist, initiate as {}

goog.require('Blockly.Blocks'); // not work in browser env
goog.require('Blockly.Types');




/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.servo.HUE = 60;

/**
 * @namespace Blockly.Blocks.servo_write
 */
Blockly.Blocks.servo_write ={};
/**
 * @namespace Blockly.Blocks.servo_read
 */
Blockly.Blocks.servo_read ={};

/**
 * Block for writing an angle value into a servo PWM pin.
 * @this Blockly.Block
 * @memberof Blockly.Blocks
 */
Blockly.Blocks.servo_write.init=function() {
    this.setColour(Blockly.Blocks.servo.HUE);
    this.appendValueInput('SERVO_PULSEWIDTH')
    .setCheck(Blockly.Types.NUMBER.checkList)
    .appendField(Blockly.Msg.ARD_SERVO_WRITE)
    .appendField(new Blockly.FieldDropdown(Blockly.mbed.Boards.selected.pwmPins), 'SERVO_PIN')
    .appendField('pulsewidth:');
    this.appendDummyInput()
    .appendField(new Blockly.FieldDropdown([['us','us'],['ms','ms']]), 'TimeDomain')    
    this.setInputsInline(true);                
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_SERVO_WRITE_TIP);
};

/**
 * Updates the content of the the pin related fields.
 * @memberof Blockly.Blocks
 * @this Blockly.Block
 */
Blockly.Blocks.servo_write.updateFields=function() {
    Blockly.mbed.Boards.refreshBlockFieldDropdown(
        this, 'SERVO_PIN', 'pwmPins');
};

/**
 * Block for reading an angle value of a servo PWM pin.
 * @memberof Blockly.Blocks
 * @this Blockly.Block
 */
Blockly.Blocks.servo_read.init= function() {
    this.setColour(Blockly.Blocks.servo.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SERVO_READ)
        .appendField(new Blockly.FieldDropdown(
            Blockly.mbed.Boards.selected.pwmPins), 'SERVO_PIN');
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip(Blockly.Msg.ARD_SERVO_READ_TIP);
};

/** 
 * @return {string} The type of return value for the block, an integer. 
 * @memberof Blockly.Blocks
 */
Blockly.Blocks.servo_read.getBlockType=function() {
    return Blockly.Types.NUMBER;
};

/**
 * Updates the content of the the pin related fields.
 * @this Blockly.Block
 * @memberof Blockly.Blocks
 */
Blockly.Blocks.servo_read.updateFields=function() {
    Blockly.mbed.Boards.refreshBlockFieldDropdown(
        this, 'SERVO_PIN', 'pwmPins');
};

