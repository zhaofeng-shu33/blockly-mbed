/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * Based on work of Fred Lin (gasolin@gmail.com) for Blocklyduino.
 *
 * @fileoverview Helper functions for generating mbed language (C++).
 */
'use strict';

goog.provide('Blockly.mbed');

goog.require('Blockly.Generator');
goog.require('Blockly.StaticTyping');


/**
 * mbed code generator.
 * @type {!Blockly.Generator}
 */
Blockly.mbed = new Blockly.Generator('mbed');
Blockly.mbed.StaticTyping = new Blockly.StaticTyping();

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * mbed specific keywords defined in: http://mbed.cc/en/Reference/HomePage
 * @private
 */
Blockly.mbed.addReservedWords(
    'Blockly,' +  // In case JS is evaled in the current window.
    'setup,loop,if,else,for,switch,case,while,do,break,continue,return,goto,' +
    'define,include,HIGH,LOW,INPUT,OUTPUT,INPUT_PULLUP,true,false,integer,' +
    'constants,floating,point,void,boolean,char,unsigned,byte,int,word,long,' +
    'float,double,string,String,array,static,volatile,const,sizeof,pinMode,' +
    'digitalWrite,digitalRead,analogReference,analogRead,analogWrite,tone,' +
    'noTone,shiftOut,shitIn,pulseIn,millis,micros,delay,delayMicroseconds,' +
    'min,max,abs,constrain,map,pow,sqrt,sin,cos,tan,randomSeed,random,' +
    'lowByte,highByte,bitRead,bitWrite,bitSet,bitClear,bit,attachInterrupt,' +
    'detachInterrupt,interrupts,noInterrupts');

/** Order of operation ENUMs. */
Blockly.mbed.ORDER_ATOMIC = 0;         // 0 "" ...
Blockly.mbed.ORDER_UNARY_POSTFIX = 1;  // expr++ expr-- () [] .
Blockly.mbed.ORDER_UNARY_PREFIX = 2;   // -expr !expr ~expr ++expr --expr
Blockly.mbed.ORDER_MULTIPLICATIVE = 3; // * / % ~/
Blockly.mbed.ORDER_ADDITIVE = 4;       // + -
Blockly.mbed.ORDER_SHIFT = 5;          // << >>
Blockly.mbed.ORDER_RELATIONAL = 6;     // >= > <= <
Blockly.mbed.ORDER_EQUALITY = 7;       // == != === !==
Blockly.mbed.ORDER_BITWISE_AND = 8;    // &
Blockly.mbed.ORDER_BITWISE_XOR = 9;    // ^
Blockly.mbed.ORDER_BITWISE_OR = 10;    // |
Blockly.mbed.ORDER_LOGICAL_AND = 11;   // &&
Blockly.mbed.ORDER_LOGICAL_OR = 12;    // ||
Blockly.mbed.ORDER_CONDITIONAL = 13;   // expr ? expr : expr
Blockly.mbed.ORDER_ASSIGNMENT = 14;    // = *= /= ~/= %= += -= <<= >>= &= ^= |=
Blockly.mbed.ORDER_NONE = 99;          // (...)

/**
 * A list of types tasks that the pins can be assigned. Used to track usage and
 * warn if the same pin has been assigned to more than one task.
 */
Blockly.mbed.PinTypes = {
  INPUT: 'INPUT',
  OUTPUT: 'OUTPUT',
  PWM: 'PWM',
  SERVO: 'SERVO',
  STEPPER: 'STEPPER',
  SERIAL: 'SERIAL',
  I2C: 'I2C/TWI',
  SPI: 'SPI'
};

/**
 * mbed generator short name for
 * Blockly.Generator.prototype.FUNCTION_NAME_PLACEHOLDER_
 * @type {!string}
 */
Blockly.mbed.DEF_FUNC_NAME = Blockly.mbed.FUNCTION_NAME_PLACEHOLDER_;

/**
 * Initialises the database of global definitions, the setup function, function
 * names, and variable names.
 * @param {Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.mbed.init = function(workspace) {
  // Create a dictionary of definitions to be printed at the top of the sketch
  Blockly.mbed.includes_ = Object.create(null);
  // Create a dictionary of global definitions to be printed after variables
  Blockly.mbed.definitions_ = Object.create(null);
  // Create a dictionary of variables
  Blockly.mbed.variables_ = Object.create(null);
  // Create a dictionary of functions from the code generator
  Blockly.mbed.codeFunctions_ = Object.create(null);
  // Create a dictionary of functions created by the user
  Blockly.mbed.userFunctions_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions)
  Blockly.mbed.functionNames_ = Object.create(null);
  // Create a dictionary of setups to be printed in the setup() function
  Blockly.mbed.setups_ = Object.create(null);
  // Create a dictionary of pins to check if their use conflicts
  Blockly.mbed.pins_ = Object.create(null);

  if (!Blockly.mbed.variableDB_) {
    Blockly.mbed.variableDB_ =
        new Blockly.Names(Blockly.mbed.RESERVED_WORDS_);
  } else {
    Blockly.mbed.variableDB_.reset();
  }

  // Iterate through to capture all blocks types and set the function arguments
  var varsWithTypes = Blockly.mbed.StaticTyping.collectVarsWithTypes(workspace);
  Blockly.mbed.StaticTyping.setProcedureArgs(workspace, varsWithTypes);

  // Set variable declarations with their mbed type in the defines dictionary
  for (var varName in varsWithTypes) {
    Blockly.mbed.addVariable(varName,
        Blockly.mbed.getmbedType_(varsWithTypes[varName]) +' ' +
        Blockly.mbed.variableDB_.getName(varName, Blockly.Variables.NAME_TYPE) + ';');
  }
};

/**
 * Prepare all generated code to be placed in the sketch specific locations.
 * @param {string} code Generated main program (loop function) code.
 * @return {string} Completed sketch code.
 */
Blockly.mbed.finish = function(code) {
  // Convert the includes, definitions, and functions dictionaries into lists
  var includes = ['#define HIGH 1','#define LOW 0','#include "mbed.h"'], definitions = [], variables = [], functions = [];
  for (var name in Blockly.mbed.includes_) {
    includes.push(Blockly.mbed.includes_[name]);
  }
  if (includes.length) {
    includes.push('\n');
  }
  for (var name in Blockly.mbed.variables_) {
    variables.push(Blockly.mbed.variables_[name]);
  }
  if (variables.length) {
    variables.push('\n');
  }
  for (var name in Blockly.mbed.definitions_) {
    definitions.push(Blockly.mbed.definitions_[name]);
  }
  if (definitions.length) {
    definitions.push('\n');
  }
  for (var name in Blockly.mbed.codeFunctions_) {
    functions.push(Blockly.mbed.codeFunctions_[name]);
  }
  for (var name in Blockly.mbed.userFunctions_) {
    functions.push(Blockly.mbed.userFunctions_[name]);
  }
  if (functions.length) {
    functions.push('\n');
  }

  // userSetupCode added at the end of the setup function without leading spaces
  var setups = [''], userSetupCode= '';
  if (Blockly.mbed.setups_['userSetupCode'] !== undefined) {
    userSetupCode = '\n' + Blockly.mbed.setups_['userSetupCode'];
    delete Blockly.mbed.setups_['userSetupCode'];
  }
  for (var name in Blockly.mbed.setups_) {
    setups.push(Blockly.mbed.setups_[name]);
  }
  if (userSetupCode) {
    setups.push(userSetupCode);
  }

  // Clean up temporary data
  delete Blockly.mbed.includes_;
  delete Blockly.mbed.definitions_;
  delete Blockly.mbed.codeFunctions_;
  delete Blockly.mbed.userFunctions_;
  delete Blockly.mbed.functionNames_;
  delete Blockly.mbed.setups_;
  delete Blockly.mbed.pins_;
  Blockly.mbed.variableDB_.reset();

  var allDefs = includes.join('\n') + variables.join('\n') +
      definitions.join('\n') + functions.join('\n\n');
  //var setup = 'void setup() {' + setups.join('\n  ') + '\n}\n\n';
  var loop = 'int main() {\n  ' + code.replace(/\n/g, '\n  ') + '\n}';
  return allDefs + loop;
};

/**
 * Adds a string of "include" code to be added to the sketch.
 * Once a include is added it will not get overwritten with new code.
 * @param {!string} includeTag Identifier for this include code.
 * @param {!string} code Code to be included at the very top of the sketch.
 */
Blockly.mbed.addInclude = function(includeTag, code) {
  if (Blockly.mbed.includes_[includeTag] === undefined) {
    Blockly.mbed.includes_[includeTag] = code;
  }
};

/**
 * Adds a string of code to be declared globally to the sketch.
 * Once it is added it will not get overwritten with new code.
 * @param {!string} declarationTag Identifier for this declaration code.
 * @param {!string} code Code to be added below the includes.
 */
Blockly.mbed.addDeclaration = function(declarationTag, code) {
  if (Blockly.mbed.definitions_[declarationTag] === undefined) {
    Blockly.mbed.definitions_[declarationTag] = code;
  }
};

/**
 * Adds a string of code to declare a variable globally to the sketch.
 * Only if overwrite option is set to true it will overwrite whatever
 * value the identifier held before.
 * @param {!string} varName The name of the variable to declare.
 * @param {!string} code Code to be added for the declaration.
 * @param {boolean=} overwrite Flag to ignore previously set value.
 * @return {!boolean} Indicates if the declaration overwrote a previous one.
 */
Blockly.mbed.addVariable = function(varName, code, overwrite) {
  var overwritten = false;
  if (overwrite || (Blockly.mbed.variables_[varName] === undefined)) {
    Blockly.mbed.variables_[varName] = code;
    overwritten = true;
  }
  return overwritten;
};

/**
 * Adds a string of code into the mbed setup() function. It takes an
 * identifier to not repeat the same kind of initialisation code from several
 * blocks. If overwrite option is set to true it will overwrite whatever
 * value the identifier held before.
 * @param {!string} setupTag Identifier for the type of set up code.
 * @param {!string} code Code to be included in the setup() function.
 * @param {boolean=} overwrite Flag to ignore previously set value.
 * @return {!boolean} Indicates if the new setup code overwrote a previous one.
 */
Blockly.mbed.addSetup = function(setupTag, code, overwrite) {
  var overwritten = false;
  if (overwrite || (Blockly.mbed.setups_[setupTag] === undefined)) {
    Blockly.mbed.setups_[setupTag] = code;
    overwritten = true;
  }
  return overwritten;
};

/**
 * Adds a string of code as a function. It takes an identifier (meant to be the
 * function name) to only keep a single copy even if multiple blocks might
 * request this function to be created.
 * A function (and its code) will only be added on first request.
 * @param {!string} preferedName Identifier for the function.
 * @param {!string} code Code to be included in the setup() function.
 * @return {!string} A unique function name based on input name.
 */
Blockly.mbed.addFunction = function(preferedName, code) {
  if (Blockly.mbed.codeFunctions_[preferedName] === undefined) {
    var uniqueName = Blockly.mbed.variableDB_.getDistinctName(
        preferedName, Blockly.Generator.NAME_TYPE);
    Blockly.mbed.codeFunctions_[preferedName] =
        code.replace(Blockly.mbed.DEF_FUNC_NAME, uniqueName);
    Blockly.mbed.functionNames_[preferedName] = uniqueName;
  }
  return Blockly.mbed.functionNames_[preferedName];
};

/**
 * Description.
 * @param {!Blockly.Block} block Description.
 * @param {!string} pin Description.
 * @param {!string} pinType Description.
 * @param {!string} warningTag Description.
 */
Blockly.mbed.reservePin = function(block, pin, pinType, warningTag) {
  if (Blockly.mbed.pins_[pin] !== undefined) {
    if (Blockly.mbed.pins_[pin] != pinType) {
      block.setWarningText(Blockly.Msg.ARD_PIN_WARN1.replace('%1', pin)
		.replace('%2', warningTag).replace('%3', pinType)
		.replace('%4', Blockly.mbed.pins_[pin]), warningTag);
    } else {
      block.setWarningText(null, warningTag);
    }
  } else {
    Blockly.mbed.pins_[pin] = pinType;
    block.setWarningText(null, warningTag);
  }
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything. A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.mbed.scrubNakedValue = function(line) {
  return line + ';\n';
};

/**
 * Encode a string as a properly escaped mbed string, complete with quotes.
 * @param {string} string Text to encode.
 * @return {string} mbed string.
 * @private
 */
Blockly.mbed.quote_ = function(string) {
  // TODO: This is a quick hack.  Replace with goog.string.quote
  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\\n')
                 .replace(/\$/g, '\\$')
                 .replace(/'/g, '\\\'');
  return '\"' + string + '\"';
};

/**
 * Common tasks for generating mbed from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The mbed code created for this block.
 * @return {string} mbed code with comments and subsequent blocks added.
 * @this {Blockly.CodeGenerator}
 * @private
 */
Blockly.mbed.scrub_ = function(block, code) {
  if (code === null) { return ''; } // Block has handled code generation itself

  var commentCode = '';
  // Only collect comments for blocks that aren't inline
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    if (comment) {
      commentCode += this.prefixLines(comment, '// ') + '\n';
    }
    // Collect comments for all value arguments
    // Don't collect comments for nested statements
    for (var x = 0; x < block.inputList.length; x++) {
      if (block.inputList[x].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[x].connection.targetBlock();
        if (childBlock) {
          var comment = this.allNestedComments(childBlock);
          if (comment) {
            commentCode += this.prefixLines(comment, '// ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = this.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};

/**
 * Generates mbed Types from a Blockly Type.
 * @param {!Blockly.Type} typeBlockly The Blockly type to be converted.
 * @return {string} mbed type for the respective Blockly input type, in a
 *     string format.
 * @private
 */
Blockly.mbed.getmbedType_ = function(typeBlockly) {
  switch (typeBlockly.typeId) {
    case Blockly.Types.SHORT_NUMBER.typeId:
      return 'char';
    case Blockly.Types.NUMBER.typeId:
      return 'int';
    case Blockly.Types.LARGE_NUMBER.typeId:
      return 'long';
    case Blockly.Types.DECIMAL.typeId:
      return 'float';
    case Blockly.Types.TEXT.typeId:
      return 'String';
    case Blockly.Types.CHARACTER.typeId:
      return 'char';
    case Blockly.Types.BOOLEAN.typeId:
      return 'boolean';
    case Blockly.Types.NULL.typeId:
      return 'void';
    case Blockly.Types.UNDEF.typeId:
      return 'undefined';      
    case Blockly.Types.CHILD_BLOCK_MISSING.typeId:
      // If no block connected default to int, change for easier debugging
      //return 'ChildBlockMissing';
      return 'int';
    default:
      return 'Invalid Blockly Type';
    }
};

/** Used for not-yet-implemented block code generators */
Blockly.mbed.noGeneratorCodeInline = function() {
  return ['', Blockly.mbed.ORDER_ATOMIC];
};

/** Used for not-yet-implemented block code generators */
Blockly.mbed.noGeneratorCodeLine = function() { return ''; };
