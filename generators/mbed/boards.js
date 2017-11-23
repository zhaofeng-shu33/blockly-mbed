/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Implements the required data for functions for selecting
 *     amongst different mbed boards.
 */
'use strict';

goog.provide('Blockly.mbed.boards');

goog.require('Blockly.mbed');


Blockly.mbed.Boards=new Object();
/** Object to contain all mbed board profiles. */
Blockly.mbed.Boards['profiles'] = new Object();

/**
 * Helper function to generate an array of pins (each an array of length 2) for
 * the analogue IO.
 * @param {!integer} pinStart Start number for the IOs pin list to generate.
 * @param {!integer} pinEnd Last inclusive number for the list to generate.
 * @return {!array} Two dimensional array with the name and value for the
 *     analogue IO pins.
 */
Blockly.mbed.Boards['generateAnalogIo'] = function(pinStart, pinEnd) {
  var analogIo = [];
  for (var i = pinStart; i < (pinEnd + 1); i++) {
    analogIo.push(['A' + i.toString(), 'A' + i.toString()]);
  }
  return analogIo;
};

Blockly.mbed.Boards['profiles']['nucleo_f103rb']={
    name: 'NUCLEO F103RB',
    description: 'mbed NUCLEO standard compatible board',
    /*GPIO*/
    digitalPins: [['PC_9','PC_9'],['PB_8','PB_8'],['PB_9','PB_9'],['PA_5','PA_5'],['PA_6','PA_6'],['PA_7','PA_7'],['PB_6','PB_6'],['PC_7','PC_7'],['PA_9','PA_9'],['PA_8','PA_8'],['PB_10','PB_10'],['PB_4','PB_4'],['PB_5','PB_5'],['PB_3','PB_3'],['PA_10','PA_10'],['PA_2','PA_2'],['PA_3','PA_3'],['PC_8','PC_8'],['PC_6','PC_6'],['PC_5','PC_5'],['PA_12','PA_12'],['PA_11','PA_11'],['PB_12','PB_12'],['PB_11','PB_11'],['PB_2','PB_2'],['PB_1','PB_1'],['PB_15','PB_15'],['PB_14','PB_14'],['PB_13','PB_13'],['PC_4','PC_4'],['PC_10','PC_10'],['PC_12','PC_12'],['PA_13','PA_13'],['PA_14','PA_14'],['PA_15','PA_15'],['PB_7','PB_7'],['PC_13','PC_13'],['PC_14','PC_14'],['PC_15','PC_15'],['PF_0','PF_0'],['PF_1','PF_1'],['PC_2','PC_2'],['PC_3','PC_3'],['PC_11','PC_11'],['PD_2','PD_2'],['PA_0','PA_0'],['PA_1','PA_1'],['PA_4','PA_4'],['PB_0','PB_0'],['PC_1','PC_1'],['PC_0','PC_0']],
    analogPins: Blockly.mbed.Boards.generateAnalogIo(0, 5),    
    /*not distinguish Timer */
    pwmPins: [['PC_9','PC_9'],['PA_6','PA_6'],['PA_7','PA_7'],['PC_7','PC_7'],['PA_9','PA_9'],['PA_8','PA_8'],['PB_10','PB_10'],['PB_4','PB_4'],['PB_5','PB_5'],['PB_3','PB_3'],['PA_10','PA_10'],['PA_2','PA_2'],['PA_3','PA_3'],['PC_8','PC_8'],['PC_6','PC_6'],['PA_11','PA_11'],['PB_11','PB_11'],['PB_1','PB_1'],['PB_15','PB_15'],['PB_14','PB_14'],['PB_13','PB_13'],['PC_4','PC_4'],['PA_15','PA_15'],['PA_1','PA_1'],['PB_0','PB_0']],
    serialPinsRX:[['PA_10','PA_10'],['PA_3','PA_3'],['PB_11','PB_11'],['PB_7','PB_7'],['PC_11','PC_11']],
    serialPinsTX:[['PB_6','PB_6'],['PC_10','PC_10'],['PA_9','PA_9'],['PB_10','PB_10'],['PA_2','PA_2']],
    serialPins:[['Serial_1','Serial_1'],['Serial_2','Serial_2'],['Serial_3','Serial_3']],
    serialMapper:{'PC_10':'Serial_3','PB_7':'Serial_1','PC_11':'Serial_3',
    'PB_6':'Serial_1','PA_9':'Serial_1','PB_10':'Serial_3','PA_10':'Serial_1','PA_2':'Serial_2',
    'PA_3':'Serial_2','PB_11':'Serial_3'},
    serialSpeed: [['9600', '9600'],['300', '300'], ['600', '600'], ['1200', '1200'],
                ['2400', '2400'], ['4800', '4800'],
                ['14400', '14400'], ['19200', '19200'], ['28800', '28800'],
                ['31250', '31250'], ['38400', '38400'], ['57600', '57600'],
                ['115200', '115200']],
    spi: [['SPI2', 'SPI2'],['SPI1', 'SPI1']],
    spi1_choice:[['PA_5,PA_6,PA_7','PA_5,PA_6,PA_7'],['PB_3,PB_4,PB_5','PB_3,PB_4,PB_5']],
    spi1_alternative:{'MOSI': 'PB_5', 'MISO':'PB_4', 'SCK': 'PB_3'},
    spiPins: { SPI1: {'MOSI': 'PA_7','MISO': 'PA_6','SCK': 'PA_5'},
               SPI2: {'MOSI': 'PB_15','MISO': 'PB_14','SCK': 'PB_13'}},
    i2c: [['I2C', 'Wire']],
    i2cPins: { Wire: [['SDA', 'A4'], ['SCL', 'A5']] },
    i2cSpeed: [['100kHz', '100000L'], ['400kHz', '400000L']],
    builtinLed: [['LED_1', 'PA_5']],
    interrupt: [['interrupt0', '2'], ['interrupt1', '3']]    
}
/** Set default profile to mbed standard-compatible board */
Blockly.mbed.Boards['selected'] = Blockly.mbed.Boards['profiles']['nucleo_f103rb'];

/**
 * Refreshes the contents of a block Field Dropdown.
 * This is use to refresh the blocks after the board profile has been changed.
 * @param {!Blockly.Block} block Generated code.
 * @param {!string} fieldName Name of the block FieldDropdown to refresh.
 * @param {!string} boardKey Name of the board profile property to fetch.
 */
Blockly.mbed.Boards['refreshBlockFieldDropdown'] =
    function(block, fieldName, boardKey) {
  var field = block.getField(fieldName);
  var fieldValue = field.getValue();
  var dataArray = Blockly.mbed.Boards.selected[boardKey];
  field.menuGenerator_ = dataArray;

  var currentValuePresent = false;
  for (var i = 0; i < dataArray.length; i++) {
    if (fieldValue == dataArray[i][1]) {
      currentValuePresent = true;
    }
  }
  // If the old value is not present any more, add a warning to the block.
  if (!currentValuePresent) {
    block.setWarningText(
        'The old pin value ' + fieldValue + ' is no longer available.', 'bPin');
  } else {
    block.setWarningText(null, 'bPin');
  }
};