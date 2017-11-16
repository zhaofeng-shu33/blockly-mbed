/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Blocks for the mbed serial communication functions.
 *     The mbed built in functions syntax can be found at:
 *     http://mbed.cc/en/Reference/HomePage
 *
 * TODO: There are more function that can be added:
 *       http://mbed.cc/en/Reference/Serial
 */
'use strict';

goog.provide('Blockly.Blocks.serial');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.serial.HUE = 160;

Blockly.Blocks['serial_setup'] = {
  /**
   * Block for setting the speed of the serial connection.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://mbed.cc/en/Serial/Begin');
    this.setColour(Blockly.Blocks.serial.HUE);
    this.appendDummyInput()
        .appendField("Serial Setup RX:")
        .appendField(
            new Blockly.FieldDropdown(
                Blockly.mbed.Boards.selected.serialPinsRX), 'SERIAL_ID')
        .appendField("TX:")                        
        .appendField(
            new Blockly.FieldDropdown(
                Blockly.mbed.Boards.selected.serialPinsTX), 'SERIAL_ID_TX')                
        .appendField(Blockly.Msg.ARD_SERIAL_SPEED)
        .appendField(
            new Blockly.FieldDropdown(
                Blockly.mbed.Boards.selected.serialSpeed), 'SPEED')
        .appendField(Blockly.Msg.ARD_SERIAL_BPS);
    this.setInputsInline(true);
    this.setPreviousStatement(false, null);
    this.setNextStatement(true, null);    
    this.setTooltip(Blockly.Msg.ARD_SERIAL_SETUP_TIP);
  },
  /**
   * Returns the serial instance name.
   * @return {!string} Serial instance name.
   * @this Blockly.Block
   */
  getSerialSetupInstance: function() {
    return Blockly.mbed.Boards.selected.serialMapper[this.getFieldValue('SERIAL_ID')]
    },
  onchange: function() {
    if (!this.workspace) { return; }  // Block has been deleted.

    //Get the Serial instance from this block
    var serialId = this.getFieldValue('SERIAL_ID');
    var serialId_TX = this.getFieldValue('SERIAL_ID_TX');
    var serialRX=Blockly.mbed.Boards.selected.serialMapper[serialId];
    var serialTX=Blockly.mbed.Boards.selected.serialMapper[serialId_TX];
    if(serialRX==serialTX)
       this.setWarningText(null,'serial_rx_tx_mismatch');
    else
       this.setWarningText(serialRX+" mismatches "+serialTX,'serial_rx_tx_mismatch');
   },
  /**
   * Updates the content of the the serial related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.mbed.Boards.refreshBlockFieldDropdown(
        this, 'SERIAL_ID', 'digitalPins');
    Blockly.mbed.Boards.refreshBlockFieldDropdown(
        this, 'SERIAL_ID_TX', 'digitalPins');        
    Blockly.mbed.Boards.refreshBlockFieldDropdown(
        this, 'SPEED', 'serialSpeed');
  }
};
Blockly.Blocks['print_content'] = {
  init: function() {
    this.appendValueInput("format_content")
        .setCheck(null);
    this.setInputsInline(true);              
    this.appendValueInput("join_content")
        .setCheck(null)
        .appendField("join");
    this.setInputsInline(false);                      
    this.setOutput(true, null);
    this.setColour(Blockly.Blocks.serial.HUE);
    this.setTooltip("print format extra content");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['serial_attach'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(Blockly.mbed.Boards.selected.serialPins), 'SERIAL_Pins')
        .appendField("attach");
    this.appendStatementInput("function_body")
        .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.serial.HUE);
    this.setTooltip("attach an interrupt function to configured serial");
    this.setHelpUrl("");
    this.arguments_ = [];
  }
};
Blockly.Blocks['serial_print'] = {
  /**
   * Block for creating a write to serial com function.
   * @this Blockly.Block
   */
  init: function() {
    // Blockly.mbed.Boards.selected.serialPins=[['invalidSerial','invalidSerial']];
    // var blocks = Blockly.mainWorkspace.getTopBlocks();
    // for (var x = 0; x < blocks.length; x++) {
        // var func = blocks[x].getSerialSetupInstance;    
        // if (func) {
           // var setupBlockInstanceName = func.call(blocks[x]);
           // if(setupBlockInstanceName.startsWith('mySerial')){
               // Blockly.mbed.Boards.selected.serialPins.push([setupBlockInstanceName,setupBlockInstanceName]);
           // }
        // }
    // }
      
    this.setHelpUrl('http://www.mbed.cc/en/Serial/Print');
    this.setColour(Blockly.Blocks.serial.HUE);
    this.appendValueInput('CONTENT')
        .setCheck(Blockly.Types.TEXT.checkList)  
        .appendField(new Blockly.FieldDropdown(Blockly.mbed.Boards.selected.serialPins), 'SERIAL_Pins')
        .appendField(Blockly.Msg.ARD_SERIAL_PRINT);
    this.appendValueInput('CONTENT_STR')
        .setCheck(null)
        .appendField(new Blockly.FieldCheckbox('TRUE'), 'NEW_LINE')
        .appendField(Blockly.Msg.ARD_SERIAL_PRINT_NEWLINE);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_SERIAL_PRINT_TIP);
    
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of serial_setup and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function() {
    if (!this.workspace) { return; }  // Block has been deleted.

    //Get the Serial instance from this block
    var thisInstanceName = this.getFieldValue('SERIAL_Pins');
    var setupInstancePresent = false;
    //Iterate through top level blocks to find setup instance for the serial id
    var blocks = Blockly.mainWorkspace.getTopBlocks();
     for (var x = 0; x < blocks.length; x++) {
      var func = blocks[x].getSerialSetupInstance;
      if (func) {
        var setupBlockInstanceName = func.call(blocks[x]);
        if (thisInstanceName == setupBlockInstanceName) {
          setupInstancePresent = true;
        }
      }
    }
    if (!setupInstancePresent) {
      this.setWarningText(Blockly.Msg.ARD_SERIAL_PRINT_WARN.replace('%1', 
			    thisInstanceName), 'serial_setup');
    } else {
      this.setWarningText(null, 'serial_setup');
    }
  },
  /**
   * Updates the content of the the serial related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.mbed.Boards.refreshBlockFieldDropdown(
        this, 'SERIAL_Pins', 'serialPins');
  }
};
