/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Code generator for the mbed serial blocks.
 *     mbed Serial library docs: https://www.mbed.cc/en/Reference/Serial
 *
 * TODO: There are more functions that can be added:
 *       http://mbed.cc/en/Reference/Serial
 */
'use strict';

goog.provide('Blockly.mbed.serial');

goog.require('Blockly.mbed');

Blockly.mbed['print_content'] = function(block) {
  var format_content = Blockly.mbed.valueToCode(block, 'format_content', Blockly.mbed.ORDER_ATOMIC);
  var join_content = Blockly.mbed.valueToCode(block, 'join_content', Blockly.mbed.ORDER_ATOMIC) || '';
  // TODO: Assemble JavaScript into code variable.
  var code;
  if(join_content)  
     code = format_content+','+join_content;
  else
     code = format_content;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.mbed.ORDER_ATOMIC];
};
/**
 * Code generator of block for writing to the serial com.
 * mbed code: loop { Serial.print(X); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.mbed['serial_print'] = function(block) {
  var serialName = block.getFieldValue('SERIAL_Pins');
  var content = Blockly.mbed.valueToCode(
      block, 'CONTENT', Blockly.mbed.ORDER_ATOMIC) || '0';
  var content_str = Blockly.mbed.valueToCode(block, 'CONTENT_STR', Blockly.mbed.ORDER_ATOMIC) || '';      
  var checkbox_name = (block.getFieldValue('NEW_LINE') == 'TRUE');

  // var serialPins = Blockly.mbed.Boards.selected.serialPins[serialId];
  // for (var i = 0; i < serialPins.length; i++) {
    // Blockly.mbed.reservePin(block, serialPins[i][1],
        // Blockly.mbed.PinTypes.SERIAL, 'SERIAL ' + serialPins[i][0]);
  // }  
  
  if (checkbox_name) {
    content=content.slice(0,content.length-1)+'\\n"';
  }
  var code;
  if(content_str)
    code = serialName + '.printf(' + content+','+content_str + ');\n';  
  else
    code = serialName + '.printf(' + content + ');\n';        
  return code;
};
    
/**
 * Code generator for block for setting the serial com speed.
 * mbed code: setup{ Serial.begin(X); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code.
 */
Blockly.mbed['serial_setup'] = function(block) {
  var serialId = block.getFieldValue('SERIAL_ID');
  var serialId_TX = block.getFieldValue('SERIAL_ID_TX');
  var serialRX=Blockly.mbed.Boards.selected.serialMapper[serialId];
  var serialTX=Blockly.mbed.Boards.selected.serialMapper[serialId_TX];
  console.assert(serialRX==serialTX);
  var serialName = serialRX;
  var serialSpeed = block.getFieldValue('SPEED');
  var serialSetupCode = serialName + '.baud(' + serialSpeed + ');';
  //Add serialId, serialID_TX to Blockly.mbed.Boards.selected.serialPins
  Blockly.mbed.addDeclaration('serial_' + serialId, 'Serial '+serialName+'(' + serialId+','+serialId_TX + ');');
  //Blockly.mbed.addSetup('serial_' + serialId, serialSetupCode, true);
  var code = serialSetupCode+'\n';
  return code;
};
