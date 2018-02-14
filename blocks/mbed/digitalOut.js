'use strict';

goog.provide('Blockly.Blocks.digitalOut');

goog.require('Blockly.Blocks');

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.digitalOut.HUE = 230;


Blockly.Blocks['mbed_digitalOut'] = {
  init: function() {
    this.appendValueInput('STATE')
        .appendField(Blockly.Msg.ARD_DIGITALWRITE)        
        .appendField(new Blockly.FieldDropdown([["LED1","LED1"], ["LED2","LED2"]]), "digitalOut_enum");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.digitalOut.HUE);
    this.setTooltip(Blockly.Msg.ARD_DIGITALWRITE_TIP);
    this.setHelpUrl("");
  }
};