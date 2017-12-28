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
 * @fileoverview Macro input field.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.FieldMacro');

goog.require('Blockly.FieldDropdown');
goog.require('Blockly.Msg');
goog.require('Blockly.Macro');
goog.require('Blockly.utils');
goog.require('goog.string');


/**
 * Class for a Macro's dropdown field.
 * @param {?string} varname The default name for the Macro.  If null,
 *     a unique Macro name will be generated.
 * @param {Function=} opt_validator A function that is executed when a new
 *     option is selected.  Its sole argument is the new option value.
 * @extends {Blockly.FieldDropdown}
 * @constructor
 */
Blockly.FieldMacro = function(varname, opt_validator) {
  Blockly.FieldMacro.superClass_.constructor.call(this,
      this.dropdownCreate, opt_validator);
  this.setValue(varname || '');
};
goog.inherits(Blockly.FieldMacro, Blockly.FieldDropdown);

/**
 * Sets a new change handler for angle field.
 * @param {Function} handler New change handler, or null.
 */
Blockly.FieldMacro.prototype.setValidator = function(handler) {
  var wrappedHandler;
  if (handler) {
    // Wrap the user's change handler together with the Macro rename handler.
    wrappedHandler = function(value) {
      var v1 = handler.call(this, value);
      if (v1 === null) {
        var v2 = v1;
      } else {
        if (v1 === undefined) {
          v1 = value;
        }
        var v2 = Blockly.FieldMacro.dropdownChange.call(this, v1);
        if (v2 === undefined) {
          v2 = v1;
        }
      }
      return v2 === value ? undefined : v2;
    };
  } else {
    wrappedHandler = Blockly.FieldMacro.dropdownChange;
  }
  Blockly.FieldMacro.superClass_.setValidator.call(this, wrappedHandler);
};

/**
 * Install this dropdown on a block.
 */
Blockly.FieldMacro.prototype.init = function() {
  if (this.fieldGroup_) {
    // Dropdown has already been initialized once.
    return;
  }
  Blockly.FieldMacro.superClass_.init.call(this);
  if (!this.getValue()) {
    // Macro without names get uniquely named for this workspace.
    var workspace =
        this.sourceBlock_.isInFlyout ?
            this.sourceBlock_.workspace.targetWorkspace :
            this.sourceBlock_.workspace;
    this.setValue(Blockly.Macro.generateUniqueName(workspace));
  }
};

/**
 * Get the Macro's name (use a MacroDB to convert into a real name).
 * Unline a regular dropdown, Macro are literal and have no neutral value.
 * @return {string} Current text.
 */
Blockly.FieldMacro.prototype.getValue = function() {
  return this.getText();
};

/**
 * Set the Macro name.
 * @param {string} newValue New text.
 */
Blockly.FieldMacro.prototype.setValue = function(newValue) {
  if (this.sourceBlock_ && Blockly.Events.isEnabled()) {
    Blockly.Events.fire(new Blockly.Events.Change(
        this.sourceBlock_, 'field', this.name, this.value_, newValue));
  }
  this.value_ = newValue;
  this.setText(newValue);
};

/**
 * Return a sorted list of Macro names for Macro dropdown menus.
 * Include a special option at the end for creating a new Macro name.
 * @return {!Array.<string>} Array of Macro names.
 * @this {!Blockly.FieldMacro}
 */
Blockly.FieldMacro.prototype.dropdownCreate = function() {
  if (this.sourceBlock_ && this.sourceBlock_.workspace) {
    var MacroList =
        Blockly.Macro.allMacro(this.sourceBlock_.workspace);
  } else {
    var MacroList = [];
  }
  // Ensure that the currently selected Macro is an option.
  var name = this.getText();
  if (name && MacroList.indexOf(name) == -1) {
    MacroList.push(name);
  }
  MacroList.sort(goog.string.caseInsensitiveCompare);
  MacroList.push(Blockly.Msg.RENAME_MACRO);
  MacroList.push(Blockly.Msg.NEW_MACRO);
  // Macro are not language-specific, use the name as both the user-facing
  // text and the internal representation.
  var options = [];
  for (var x = 0; x < MacroList.length; x++) {
    options[x] = [MacroList[x], MacroList[x]];
  }
  return options;
};

/**
 * Event handler for a change in Macro name.
 * Special case the 'New Macro...' and 'Rename Macro...' options.
 * In both of these special cases, prompt the user for a new name.
 * @param {string} text The selected dropdown menu option.
 * @return {null|undefined|string} An acceptable new Macro name, or null if
 *     change is to be either aborted (cancel button) or has been already
 *     handled (rename), or undefined if an existing Macro was chosen.
 * @this {!Blockly.FieldMacro}
 */
Blockly.FieldMacro.dropdownChange = function(text) {
  function promptName(promptText, defaultText, callback) {
    Blockly.hideChaff();
    var newVar = Blockly.prompt(promptText, defaultText, function(newVar) {
      // Merge runs of whitespace.  Strip leading and trailing whitespace.
      // Beyond this, all names are legal.
      if (newVar) {
        newVar = newVar.replace(/[\s\xa0]+/g, ' ').replace(/^ | $/g, '');
        if (newVar == Blockly.Msg.RENAME_MACRO ||
            newVar == Blockly.Msg.NEW_MACRO) {
          // Ok, not ALL names are legal...
          newVar = null;
        }
      }
      callback(newVar);
    });
  }
  var workspace = this.sourceBlock_.workspace;
  if (text == Blockly.Msg.RENAME_MACRO) {
    var oldVar = this.getText();
    promptName(Blockly.Msg.RENAME_MACRO_TITLE.replace('%1', oldVar),
               oldVar, function(text) {
      if (text) {
        Blockly.Macro.renameMacro(oldVar, text, workspace);
      }
    });
    return null;
  } else if (text == Blockly.Msg.NEW_MACRO) {
    /*promptName(Blockly.Msg.NEW_MACRO_TITLE, '', function(text) {
      // Since Macro are case-insensitive, ensure that if the new Macro
      // matches with an existing Macro, the new case prevails throughout.
      if (text) {
        Blockly.Macro.renameMacro(text, text, workspace);
        //TODO: need to add here what too do with the newly created Macro
      }
    });*/
    //TODO: this return Macro needs to be made redundant
    return Blockly.Macro.generateUniqueName(workspace);
  }
  return undefined;
};
