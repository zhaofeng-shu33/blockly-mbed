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

Blockly.mbed['lists_create_with'] = function(block) {
  // Create a list with any number of elements of any type.
  var elements = new Array(block.itemCount_);
  var variable_list_name = Blockly.mbed.variableDB_.getName(block.getFieldValue('list_name'), Blockly.Variables.NAME_TYPE);
  // initialize an array with identifier as variable_list_name, with type as ___, with length as block.itemCount_
  
  for (var i = 0; i < block.itemCount_; i++) {
    elements[i] = Blockly.mbed.valueToCode(block, 'ADD' + i,
        Blockly.mbed.ORDER_COMMA) || 'null';
    elements[i] = '\t'+variable_list_name+'['+i+']='+elements[i]+';\n';
  }
  var code = 'for(int i=0;i<='+block.itemCount_+';i++){\n' + elements.join('') + '}\n';
  return code;
};
Blockly.mbed['lists_repeat'] = Blockly.mbed.noGeneratorCodeInline;

Blockly.mbed['lists_length'] = Blockly.mbed.noGeneratorCodeInline;

Blockly.mbed['lists_isEmpty'] = Blockly.mbed.noGeneratorCodeInline;

Blockly.mbed['lists_indexOf'] = Blockly.mbed.noGeneratorCodeInline;

Blockly.mbed['lists_getIndex'] = function(block) {
  // Get element at index.
  // Note: Until January 2013 this block did not have MODE or WHERE inputs.
  var mode = block.getFieldValue('MODE') || 'GET';
  var where = block.getFieldValue('WHERE') || 'FROM_START';
  var listOrder = (where == 'RANDOM') ? Blockly.mbed.ORDER_COMMA :
      Blockly.mbed.ORDER_MEMBER;
  var list = Blockly.mbed.valueToCode(block, 'VALUE', listOrder) || '[]';

  switch (where) {
    case ('FIRST'):
      if (mode == 'GET') {
        var code = list + '[0]';
        return [code, Blockly.mbed.ORDER_MEMBER];
      } else if (mode == 'GET_REMOVE') {
        var code = list + '.shift()';
        return [code, Blockly.mbed.ORDER_MEMBER];
      } else if (mode == 'REMOVE') {
        return list + '.shift();\n';
      }
      break;
    case ('LAST'):
      if (mode == 'GET') {
        var code = list + '[last_index]';//sizeof(array_name)/sizeof(firstElement)-1
        return [code, Blockly.mbed.ORDER_MEMBER];
      } else if (mode == 'GET_REMOVE') {
        var code = list + '.pop()';
        return [code, Blockly.mbed.ORDER_MEMBER];
      } else if (mode == 'REMOVE') {
        return list + '.pop();\n';
      }
      break;
    case ('FROM_START'):
      var at = Blockly.mbed.getAdjusted(block, 'AT');
      if (mode == 'GET') {
        var code = list + '[' + at + ']';
        return [code, Blockly.mbed.ORDER_MEMBER];
      } else if (mode == 'GET_REMOVE') {
        var code = list + '.splice(' + at + ', 1)[0]';
        return [code, Blockly.mbed.ORDER_FUNCTION_CALL];
      } else if (mode == 'REMOVE') {
        return list + '.splice(' + at + ', 1);\n';
      }
      break;
    case ('FROM_END'):
      var at = Blockly.mbed.getAdjusted(block, 'AT', 1, true);
      if (mode == 'GET') {
        var code = list + '.slice(' + at + ')[0]';
        return [code, Blockly.mbed.ORDER_FUNCTION_CALL];
      } else if (mode == 'GET_REMOVE') {
        var code = list + '.splice(' + at + ', 1)[0]';
        return [code, Blockly.mbed.ORDER_FUNCTION_CALL];
      } else if (mode == 'REMOVE') {
        return list + '.splice(' + at + ', 1);';
      }
      break;
    case ('RANDOM'):
      var functionName = Blockly.mbed.provideFunction_(
          'listsGetRandomItem',
          ['function ' + Blockly.mbed.FUNCTION_NAME_PLACEHOLDER_ +
              '(list, remove) {',
           '  var x = Math.floor(Math.random() * list.length);',
           '  if (remove) {',
           '    return list.splice(x, 1)[0];',
           '  } else {',
           '    return list[x];',
           '  }',
           '}']);
      code = functionName + '(' + list + ', ' + (mode != 'GET') + ')';
      if (mode == 'GET' || mode == 'GET_REMOVE') {
        return [code, Blockly.mbed.ORDER_FUNCTION_CALL];
      } else if (mode == 'REMOVE') {
        return code + ';\n';
      }
      break;
  }
  throw 'Unhandled combination (lists_getIndex).';
};

Blockly.mbed['lists_setIndex'] = Blockly.mbed.noGeneratorCodeLine;
