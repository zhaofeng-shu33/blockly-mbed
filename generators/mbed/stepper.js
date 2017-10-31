/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview mbed code generator for the Stepper library blocks.
 *     The mbed Stepper library docs: http://mbed.cc/en/Reference/Stepper
 */
'use strict';

goog.provide('Blockly.mbed.stepper');

goog.require('Blockly.mbed');


/**
 * Code generator for the stepper generator configuration. Nothing is added
 * to the 'loop()' function. Sets the pins (X and Y), steps per revolution (Z),
 * speed(A) and instance name (B).
 * mbed code: #include <Stepper.h>
 *               Stepper B(Z, X, Y);
 *               setup() { B.setSpeed(A); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Empty string as no code goes into 'loop()'.
 */
Blockly.mbed['stepper_config'] = function(block) {
  var pin1 = block.getFieldValue('STEPPER_PIN1');
  var pin2 = block.getFieldValue('STEPPER_PIN2');
  var pinType = Blockly.mbed.PinTypes.STEPPER;
  var stepperName = block.getFieldValue('STEPPER_NAME');
  var stepperSteps = Blockly.mbed.valueToCode(block, 'STEPPER_STEPS',
      Blockly.mbed.ORDER_ATOMIC) || '360';
  var stepperSpeed = Blockly.mbed.valueToCode(block, 'STEPPER_SPEED',
      Blockly.mbed.ORDER_ATOMIC) || '90';
  
  //stepper is a variable containing the used pins
  Blockly.mbed.addVariable(stepperName,
      'int ' + stepperName + '[2] = {' + pin1 + ', ' + pin2 + '};', true);
  stepperName = 'stepper_' + stepperName

  Blockly.mbed.reservePin(block, pin1, pinType, 'Stepper');
  Blockly.mbed.reservePin(block, pin2, pinType, 'Stepper');

  Blockly.mbed.addInclude('stepper', '#include <Stepper.h>');

  var globalCode = 'Stepper ' + stepperName + '(' + stepperSteps + ', ' +
      pin1 + ', ' + pin2 + ');';
  Blockly.mbed.addDeclaration(stepperName, globalCode);

  var setupCode = stepperName + '.setSpeed(' + stepperSpeed + ');';
  Blockly.mbed.addSetup(stepperName, setupCode, true);

  return '';
};

/**
 * Code generator for moving the stepper instance (X) a number of steps (Y).
 * Library info in the setHelpUrl link.
 * This block requires the stepper_config block to be present.
 * mbed code: loop { X.steps(Y) }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.mbed['stepper_step'] = function(block) {
  var stepperInstanceName = 'stepper_' + block.getFieldValue('STEPPER_NAME');
  var stepperSteps = Blockly.mbed.valueToCode(block, 'STEPPER_STEPS',
      Blockly.mbed.ORDER_ATOMIC) || '0';
  var code = stepperInstanceName + '.step(' + stepperSteps + ');\n';
  return code;
};
