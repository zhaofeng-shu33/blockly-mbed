/**
 * Visual Blocks Language
 *
 * Copyright 2012 Fred Lin.
 * https://github.com/gasolin/BlocklyDuino
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
 * @fileoverview Helper functions for generating mbed blocks.
 * @author gasolin@gmail.com (Fred Lin)
 */
'use strict';

goog.provide('Blockly.mbed.base');

goog.require('Blockly.mbed');


Blockly.mbed.base_delay = function() {
  var delay_time = Blockly.mbed.valueToCode(this, 'DELAY_TIME', Blockly.mbed.ORDER_ATOMIC) || '1000'
  var code = 'delay(' + delay_time + ');\n';
  return code;
};

Blockly.mbed.base_map = function() {
  var value_num = Blockly.mbed.valueToCode(this, 'NUM', Blockly.mbed.ORDER_NONE);
  var value_dmax = Blockly.mbed.valueToCode(this, 'DMAX', Blockly.mbed.ORDER_ATOMIC);
  var code = 'map(' + value_num + ', 0, 1024, 0, ' + value_dmax + ')';
  return [code, Blockly.mbed.ORDER_NONE];
};

Blockly.mbed.inout_buildin_led = function() {
  var dropdown_stat = this.getFieldValue('STAT');
  Blockly.mbed.setups_['setup_output_13'] = 'pinMode(13, OUTPUT);';
  var code = 'digitalWrite(13, ' + dropdown_stat + ');\n'
  return code;
};

Blockly.mbed.inout_digital_write = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var dropdown_stat = this.getFieldValue('STAT');
  Blockly.mbed.setups_['setup_output_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
  var code = 'digitalWrite(' + dropdown_pin + ', ' + dropdown_stat + ');\n'
  return code;
};

Blockly.mbed.inout_digital_read = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.mbed.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
  var code = 'digitalRead(' + dropdown_pin + ')';
  return [code, Blockly.mbed.ORDER_ATOMIC];
};

Blockly.mbed.inout_analog_write = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  //var dropdown_stat = this.getFieldValue('STAT');
  var value_num = Blockly.mbed.valueToCode(this, 'NUM', Blockly.mbed.ORDER_ATOMIC);
  //Blockly.mbed.setups_['setup_output'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = 'analogWrite(' + dropdown_pin + ', ' + value_num + ');\n';
  return code;
};

Blockly.mbed.inout_analog_read = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  //Blockly.mbed.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  var code = 'analogRead(' + dropdown_pin + ')';
  return [code, Blockly.mbed.ORDER_ATOMIC];
};

Blockly.mbed.inout_tone = function() {
  var dropdown_pin = this.getFieldValue("PIN");
  var value_num = Blockly.mbed.valueToCode(this, "NUM", Blockly.mbed.ORDER_ATOMIC);
  Blockly.mbed.setups_['setup_output'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = "tone(" + dropdown_pin + ", " + value_num + ");\n";
  return code;
};

Blockly.mbed.inout_notone = function() {
  var dropdown_pin = this.getFieldValue("PIN");
  Blockly.mbed.setups_['setup_output'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = "noTone(" + dropdown_pin + ");\n";
  return code;
};

Blockly.mbed.inout_highlow = function() {
  // Boolean values HIGH and LOW.
  var code = (this.getFieldValue('BOOL') == 'HIGH') ? 'HIGH' : 'LOW';
  return [code, Blockly.mbed.ORDER_ATOMIC];
};

/*
//servo
#include <Servo.h>

Servo servo_11;

void setup() {
  servo_11.attach(11);
}

void loop() {
servo_11.write(0);
delay(2000);

servo_11.write(150); //0~180
delay(2000);
}
*/
Blockly.mbed.servo_move = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var value_degree = Blockly.mbed.valueToCode(this, 'DEGREE', Blockly.mbed.ORDER_ATOMIC);
  //value_degree = value_degree.replace('(','').replace(')','')
  var delay_time = Blockly.mbed.valueToCode(this, 'DELAY_TIME', Blockly.mbed.ORDER_ATOMIC) || '1000'
  //delay_time = delay_time.replace('(','').replace(')','');

  Blockly.mbed.definitions_['define_servo'] = '#include <Servo.h>\n';
  Blockly.mbed.definitions_['var_servo' + dropdown_pin] = 'Servo servo_' + dropdown_pin + ';\n';
  Blockly.mbed.setups_['setup_servo_' + dropdown_pin] = 'servo_' + dropdown_pin + '.attach(' + dropdown_pin + ');\n';

  var code = 'servo_' + dropdown_pin + '.write(' + value_degree + ');\n' + 'delay(' + delay_time + ');\n';
  return code;
};

Blockly.mbed.servo_read_degrees = function() {
  var dropdown_pin = this.getFieldValue('PIN');

  Blockly.mbed.definitions_['define_servo'] = '#include &lt;Servo.h&gt;\n';
  Blockly.mbed.definitions_['var_servo' + dropdown_pin] = 'Servo servo_'+dropdown_pin+';\n';
  Blockly.mbed.setups_['setup_servo_' + dropdown_pin] = 'servo_' + dropdown_pin + '.attach(' + dropdown_pin + ');\n';

  var code = 'servo_' + dropdown_pin + '.read()';
  return code;
};

Blockly.mbed.serial_print = function() {
  var content = Blockly.mbed.valueToCode(this, 'CONTENT', Blockly.mbed.ORDER_ATOMIC) || '0'
  //content = content.replace('(','').replace(')','');

  Blockly.mbed.setups_['setup_serial_' + profile.default.serial] = 'Serial.begin(' + profile.default.serial + ');\n';

  var code = 'Serial.println(' + content + ');\n';
  return code;
};
