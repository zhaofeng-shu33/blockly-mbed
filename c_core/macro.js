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
 * @fileoverview Utility functions for handling Macro.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Macro');

// TODO(scr): Fix circular dependencies
// goog.require('Blockly.Block');
goog.require('Blockly.Workspace');
goog.require('goog.string');


/**
 * Category to separate macro names from procedures and generated functions.
 */
Blockly.Macro.NAME_TYPE = 'macro';

/**
 * Find all user-created Macro.
 * @param {!Blockly.Block|!Blockly.Workspace} root Root block or workspace.
 * @return {!Array.<string>} Array of macro names.
 */
Blockly.Macro.allMacro = function(root) {
  var blocks;
  if (root.getDescendants) {
    // Root is Block.
    blocks = root.getDescendants();
  } else if (root.getAllBlocks) {
    // Root is Workspace.
    blocks = root.getAllBlocks();
  } else {
    throw 'Not Block or Workspace: ' + root;
  }
  var macroHash = Object.create(null);
  // Iterate through every block and add each macro to the hash.
  for (var x = 0; x < blocks.length; x++) {
    if(blocks[x].getMacro==undefined)
        continue;
    var blockMacro = blocks[x].getMacro();
    for (var y = 0; y < blockMacro.length; y++) {
      var varName = blockMacro[y];
      // macro name may be null if the block is only half-built.
      if (varName) {
        macroHash[varName.toLowerCase()] = varName;
      }
    }
  }
  // Flatten the hash into a list.
  var macroList = [];
  for (var name in macroHash) {
    macroList.push(macroHash[name]);
  }
  return macroList;
};

/**
 * Find all instances of the specified macro and rename them.
 * @param {string} oldName macro to rename.
 * @param {string} newName New macro name.
 * @param {!Blockly.Workspace} workspace Workspace rename Macro in.
 */
Blockly.Macro.renameMacro = function(oldName, newName, workspace) {
  Blockly.Events.setGroup(true);
  var blocks = workspace.getAllBlocks();
  // Iterate through every block.
  for (var i = 0; i < blocks.length; i++) {
      if(blocks[i].renameMacro==undefined)
          continue;
    blocks[i].renameMacro(oldName, newName);
  }
  Blockly.Events.setGroup(false);
};

/**
 * Construct the blocks required by the flyout for the macro category.
 * @param {!Blockly.Workspace} workspace The workspace contianing Macro.
 * @return {!Array.<!Element>} Array of XML block elements.
 */
Blockly.Macro.flyoutCategory = function(workspace) {
  var macroList = Blockly.Macro.allMacro(workspace);
  macroList.sort(goog.string.caseInsensitiveCompare);
  // In addition to the user's Macro, we also want to display the default
  // macro name at the top.  We also don't want this duplicated if the
  // user has created a macro of the same name.
  goog.array.remove(macroList, Blockly.Msg.Macro_DEFAULT_NAME);
  macroList.unshift(Blockly.Msg.Macro_DEFAULT_NAME);

  var xmlList = [];
  for (var i = 0; i < macroList.length; i++) {
    if (Blockly.Blocks['Macro_set']) {
      // <block type="Macro_set" gap="8">
      //   <field name="VAR">item</field>
      // </block>
      var block = goog.dom.createDom('block');
      block.setAttribute('type', 'Macro_set');
      if (Blockly.Blocks['Macro_get']) {
        block.setAttribute('gap', 8);
      }
      var field = goog.dom.createDom('field', null, macroList[i]);
      field.setAttribute('name', 'VAR');
      block.appendChild(field);
      xmlList.push(block);
    }
    if (Blockly.Blocks['Macro_get']) {
      // <block type="Macro_get" gap="24">
      //   <field name="VAR">item</field>
      // </block>
      var block = goog.dom.createDom('block');
      block.setAttribute('type', 'Macro_get');
      if (Blockly.Blocks['Macro_set']) {
        block.setAttribute('gap', 24);
      }
      var field = goog.dom.createDom('field', null, macroList[i]);
      field.setAttribute('name', 'VAR');
      block.appendChild(field);
      xmlList.push(block);
    }
  }
  return xmlList;
};

/**
* Return a new macro name that is not yet being used. This will try to
* generate single letter macro names in the range 'i' to 'z' to start with.
* If no unique name is located it will try 'i' to 'z', 'a' to 'h',
* then 'i2' to 'z2' etc.  Skip 'l'.
 * @param {!Blockly.Workspace} workspace The workspace to be unique in.
* @return {string} New macro name.
*/
Blockly.Macro.generateUniqueName = function(workspace) {
  var macroList = Blockly.Macro.allMacro(workspace);
  var newName = '';
  if (macroList.length) {
    var nameSuffix = 1;
    var letters = 'ijkmnopqrstuvwxyzabcdefgh';  // No 'l'.
    var letterIndex = 0;
    var potName = letters.charAt(letterIndex);
    while (!newName) {
      var inUse = false;
      for (var i = 0; i < macroList.length; i++) {
        if (macroList[i].toLowerCase() == potName) {
          // This potential name is already used.
          inUse = true;
          break;
        }
      }
      if (inUse) {
        // Try the next potential name.
        letterIndex++;
        if (letterIndex == letters.length) {
          // Reached the end of the character sequence so back to 'i'.
          // a new suffix.
          letterIndex = 0;
          nameSuffix++;
        }
        potName = letters.charAt(letterIndex);
        if (nameSuffix > 1) {
          potName += nameSuffix;
        }
      } else {
        // We can use the current potential name.
        newName = potName;
      }
    }
  } else {
    newName = 'i';
  }
  return newName;
};
