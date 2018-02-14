/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Variable blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.macro');

goog.require('Blockly.Blocks');


/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Blocks.macro.HUE = 300;

Blockly.Blocks['macro_get'] = {
  /**
   * Block for macro getter.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.MACRO_GET_HELPURL);
    this.setColour(Blockly.Blocks.macro.HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldMacro(
        Blockly.Msg.MACRO_DEFAULT_NAME), 'MACRO_NAME');
    this.setOutput(true);
    this.setTooltip(Blockly.Msg.MACRO_GET_TOOLTIP);
    this.contextMenuMsg_ = Blockly.Msg.MACRO_DEFINE_CREATE_SET;
  },
  contextMenuType_: 'macro_set',
  /**
   * Add menu option to create getter/setter block for this setter/getter.
   * @param {!Array} options List of menu options to add to.
   * @this Blockly.Block
   */
  customContextMenu: function(options) {
    var option = {enabled: true};
    var name = this.getFieldValue('VAR');
    option.text = this.contextMenuMsg_.replace('%1', name);
    var xmlField = goog.dom.createDom('field', null, name);
    xmlField.setAttribute('name', 'VAR');
    var xmlBlock = goog.dom.createDom('block', null, xmlField);
    xmlBlock.setAttribute('type', this.contextMenuType_);
    option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
    options.push(option);
  },
  /**
   * @return {!string} Retrieves the type (stored in varType) of this block.
   * @this Blockly.Block
   */
  getBlockType: function() {
    return [Blockly.Types.UNDEF, this.getFieldValue('VAR')];
  },
  getMacro: function() {
      var vars = [];
      for (var i = 0, input; input = this.inputList[i]; i++) {
        for (var j = 0, field; field = input.fieldRow[j]; j++) {
          if (field instanceof Blockly.FieldMacro) {
            vars.push(field.getValue());
          }
        }
  }
  return vars;      
  },
  renameMacro : function(oldName, newName) {
  for (var i = 0, input; input = this.inputList[i]; i++) {
    for (var j = 0, field; field = input.fieldRow[j]; j++) {
      if (field instanceof Blockly.FieldMacro &&
          Blockly.Names.equals(oldName, field.getValue())) {
        field.setValue(newName);
      }
    }
  }
 },  
};

Blockly.Blocks['macro_define'] = {
  /**
   * Block for variable setter.
   * @this Blockly.Block
   */
  init: function() {
    this.appendValueInput("MACRO_DEFINE_AS")
        .setCheck("Number")
        .appendField("define")
        .appendField(new Blockly.FieldMacro(
        Blockly.Msg.MACRO_DEFAULT_NAME), 'MACRO_NAME')
        .appendField("as");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);        
    this.setColour(Blockly.Blocks.macro.HUE);
    this.setTooltip(Blockly.Msg.VARIABLES_SET_TOOLTIP);
    this.setHelpUrl(Blockly.Msg.VARIABLES_SET_HELPURL);
    this.contextMenuMsg_ = Blockly.Msg.MACRO_DEFINE_CREATE_SET;
  },   
  contextMenuType_: 'macro_get',
  customContextMenu: Blockly.Blocks['macro_get'].customContextMenu,
  renameMacro : function(oldName, newName) {
      for (var i = 0, input; input = this.inputList[i]; i++) {
        for (var j = 0, field; field = input.fieldRow[j]; j++) {
          if (field instanceof Blockly.FieldMacro &&
              Blockly.Names.equals(oldName, field.getValue())) {
            field.setValue(newName);
          }
        }
      }
  },
  getMacro: function() {
      var vars = [];
      for (var i = 0, input; input = this.inputList[i]; i++) {
        for (var j = 0, field; field = input.fieldRow[j]; j++) {
          if (field instanceof Blockly.FieldMacro) {
            vars.push(field.getValue());
          }
        }
  }
  return vars;      
  },  
};
