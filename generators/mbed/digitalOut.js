'use strict';

goog.provide('Blockly.mbed.digitalOut');

goog.require('Blockly.mbed');

Blockly.mbed['mbed_digitalOut'] = function(block) {
  var stateOutput = Blockly.mbed.valueToCode(
      block, 'STATE', Blockly.mbed.ORDER_ATOMIC) || 'LOW';
      
  var pinKey = block.getFieldValue('digitalOut_enum');
  // TODO: Assemble JavaScript into code variable.
  var digitalOut_Name = 'myDigitalOut'+ pinKey;
  Blockly.mbed.addDeclaration(digitalOut_Name , 'DigitalOut '+digitalOut_Name+'(' + pinKey + ');');
  
  var code = digitalOut_Name+'.write(' + stateOutput + ');\n';
  return code;  
};