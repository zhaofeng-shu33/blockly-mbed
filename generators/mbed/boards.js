/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Implements the required data for functions for selecting
 *     amongst different mbed boards.
 */
'use strict';

goog.provide('Blockly.mbed.Boards');

goog.require('Blockly.mbed');


/**
 * Helper function to generate an array of pins (each an array of length 2) for
 * the digital IO.
 * @param {!integer} pinStart Start number for the IOs pin list to generate.
 * @param {!integer} pinEnd Last inclusive number for the list to generate.
 * @return {!array} Two dimensional array with the name and value for the
 *     digital IO pins.
 */
Blockly.mbed.Boards.generateDigitalIo = function(pinStart, pinEnd) {
  var digitalIo = [];
  for (var i = pinStart; i < (pinEnd + 1); i++) {
    digitalIo.push([i.toString(), i.toString()]);
  }
  return digitalIo;
};

/**
 * Helper function to generate an array of pins (each an array of length 2) for
 * the analogue IO.
 * @param {!integer} pinStart Start number for the IOs pin list to generate.
 * @param {!integer} pinEnd Last inclusive number for the list to generate.
 * @return {!array} Two dimensional array with the name and value for the
 *     analogue IO pins.
 */
Blockly.mbed.Boards.generateAnalogIo = function(pinStart, pinEnd) {
  var analogIo = [];
  for (var i = pinStart; i < (pinEnd + 1); i++) {
    analogIo.push(['A' + i.toString(), 'A' + i.toString()]);
  }
  return analogIo;
};

/**
 * Creates a new Board Profile copying all the attributes from an existing
 * profile, with the exception of the name, and optionally the description and
 * compiler flag.
 * @param {!string} name_ Mandatory new name of the new board profile.
 * @param {string=} description Optional new description of the new profile.
 * @param {string=} compilerFlag Optional new description of the new profile.
 * @return {!Object} Duplicated object with the different argument data.
 */
Blockly.mbed.Boards.duplicateBoardProfile =
    function(originalBoard, name_, description, compilerFlag) {
  return {
    name: name_,
    description: description || originalBoard.description,
    compilerFlag: compilerFlag || originalBoard.compilerFlag,
    analogPins: originalBoard.analogPins,
    digitalPins: originalBoard.digitalPins,
    pwmPins: originalBoard.pwmPins,
    serial: originalBoard.serial,
    serialPins: originalBoard.serialPins,
    serialSpeed: originalBoard.serialSpeed,
    spi: originalBoard.spi,
    spiPins: originalBoard.spiPins,
    spiClockDivide: originalBoard.spiClockDivide,
    i2c: originalBoard.i2c,
    i2cPins: originalBoard.i2cPins,
    i2cSpeed: originalBoard.i2cSpeed,
    builtinLed: originalBoard.builtinLed,
    interrupt: originalBoard.interrupt
  }
};

/** Object to contain all mbed board profiles. */
Blockly.mbed.Boards.profiles = new Object();


Blockly.mbed.Boards.profiles.nucleo_f103rb={
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
    serialMapper:{'PC_10':'Serial_3','PB_7':'Serial_1','PB_7':'Serial_1','PC_11':'Serial_3',
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
/** mbed Uno board profile. */
Blockly.mbed.Boards.profiles.uno = {
  name: 'mbed Uno',
  description: 'mbed Uno standard compatible board',
  compilerFlag: 'mbed:avr:uno',
  analogPins: Blockly.mbed.Boards.generateAnalogIo(0, 5),
  digitalPins: Blockly.mbed.Boards.generateDigitalIo(0, 13).concat(
                   Blockly.mbed.Boards.generateAnalogIo(0, 5)),
  pwmPins: [['3', 'LED1'], ['5', '5'], ['6', '6'], ['9', '9'], ['10', '10'],
            ['11', '11']],
  serial: [['serial', 'Serial']],
  serialPins: [['invalidSerial','invalidSerial']], //[myserial_RX_1_TX_1,myserial_RX_2_TX_2]
  serialSpeed: [['300', '300'], ['600', '600'], ['1200', '1200'],
                ['2400', '2400'], ['4800', '4800'], ['9600', '9600'],
                ['14400', '14400'], ['19200', '19200'], ['28800', '28800'],
                ['31250', '31250'], ['38400', '38400'], ['57600', '57600'],
                ['115200', '115200']],
  spi: [['SPI', 'SPI']],
  spiPins: { SPI: [['MOSI', '11'], ['MISO', '12'], ['SCK', '13']] },
  spiClockDivide: [['2 (8MHz)', 'SPI_CLOCK_DIV2'],
                   ['4 (4MHz)', 'SPI_CLOCK_DIV4'],
                   ['8 (2MHz)', 'SPI_CLOCK_DIV8'],
                   ['16 (1MHz)', 'SPI_CLOCK_DIV16'],
                   ['32 (500KHz)', 'SPI_CLOCK_DIV32'],
                   ['64 (250KHz)', 'SPI_CLOCK_DIV64'],
                   ['128 (125KHz)', 'SPI_CLOCK_DIV128']],
  i2c: [['I2C', 'Wire']],
  i2cPins: { Wire: [['SDA', 'A4'], ['SCL', 'A5']] },
  i2cSpeed: [['100kHz', '100000L'], ['400kHz', '400000L']],
  builtinLed: [['BUILTIN_1', '13']],
  interrupt: [['interrupt0', '2'], ['interrupt1', '3']]
};

/** mbed Nano board profile (ATmega328p). */
Blockly.mbed.Boards.profiles.nano = {
  name: 'mbed Nano',
  description: 'mbed Nano with ATmega328p board',
  compilerFlag: 'mbed:avr:nano',
  analogPins: Blockly.mbed.Boards.generateAnalogIo(0, 7),
  digitalPins: Blockly.mbed.Boards.generateDigitalIo(0, 13).concat(
                   Blockly.mbed.Boards.generateAnalogIo(0, 7)),
  pwmPins: Blockly.mbed.Boards.profiles.uno.pwmPins,
  serial: Blockly.mbed.Boards.profiles.uno.serial,
  serialPins: Blockly.mbed.Boards.profiles.uno.serialPins,
  serialSpeed: Blockly.mbed.Boards.profiles.uno.serialSpeed,
  spi: Blockly.mbed.Boards.profiles.uno.spi,
  spiPins: Blockly.mbed.Boards.profiles.uno.spiPins,
  spiClockDivide: Blockly.mbed.Boards.profiles.uno.spiClockDivide,
  i2c: Blockly.mbed.Boards.profiles.uno.i2c,
  i2cPins: Blockly.mbed.Boards.profiles.uno.i2cPins,
  i2cSpeed: Blockly.mbed.Boards.profiles.uno.i2cSpeed,
  builtinLed: Blockly.mbed.Boards.profiles.uno.builtinLed,
  interrupt: Blockly.mbed.Boards.profiles.uno.interrupt
};

/** mbed Duemilanove boards profile (ATmega168p, ATmega328p). */
Blockly.mbed.Boards.profiles.duemilanove_168p = {
  name: 'mbed Duemilanove 168p',
  description: 'mbed Duemilanove with ATmega168p compatible board',
  compilerFlag: 'mbed:avr:diecimila:cpu=atmega168',
  analogPins: Blockly.mbed.Boards.profiles.uno.analogPins,
  digitalPins: Blockly.mbed.Boards.profiles.uno.digitalPins,
  pwmPins: Blockly.mbed.Boards.profiles.uno.pwmPins,
  serial: Blockly.mbed.Boards.profiles.uno.serial,
  serialPins: Blockly.mbed.Boards.profiles.uno.serialPins,
  serialSpeed: Blockly.mbed.Boards.profiles.uno.serialSpeed,
  spi: Blockly.mbed.Boards.profiles.uno.spi,
  spiPins: Blockly.mbed.Boards.profiles.uno.spiPins,
  spiClockDivide: Blockly.mbed.Boards.profiles.uno.spiClockDivide,
  i2c: Blockly.mbed.Boards.profiles.uno.i2c,
  i2cPins: Blockly.mbed.Boards.profiles.uno.i2cPins,
  i2cSpeed: Blockly.mbed.Boards.profiles.uno.i2cSpeed,
  builtinLed: Blockly.mbed.Boards.profiles.uno.builtinLed,
  interrupt: Blockly.mbed.Boards.profiles.uno.interrupt
};
Blockly.mbed.Boards.profiles.duemilanove_328p =
    Blockly.mbed.Boards.duplicateBoardProfile(
        Blockly.mbed.Boards.profiles.duemilanove_168p,
        'mbed Duemilanove 328p',
        'mbed Duemilanove with ATmega328p compatible board',
        'mbed:avr:diecimila');

/** mbed Mega board profile. */
Blockly.mbed.Boards.profiles.mega = {
  name: 'mbed Mega',
  description: 'mbed Mega-compatible board',
  compilerFlag: 'mbed:avr:mega',
  analogPins: Blockly.mbed.Boards.generateAnalogIo(0, 15),
  //TODO: Check if the Mega can use analogue pins as digital, it would be
  //      logical but it is not clear on the mbed.cc website
  digitalPins: Blockly.mbed.Boards.generateDigitalIo(0, 53),
  pwmPins: Blockly.mbed.Boards.generateDigitalIo(2, 13).concat(
               Blockly.mbed.Boards.generateDigitalIo(44, 46)),
  serial: [['serial', 'Serial'], ['serial_1', 'Serial1'],
           ['serial_2', 'Serial2'], ['serial_3', 'Serial3']],
  serialPins: {
    Serial: [['TX', '0'], ['RX', '1']],
    Serial1: [['TX', '18'], ['TX', '19']],
    Serial2: [['TX', '16'], ['TX', '17']],
    Serial3: [['TX', '14'], ['TX', '15']]
  },
  serialSpeed: Blockly.mbed.Boards.profiles.uno.serialSpeed,
  spi: [['SPI', 'SPI']],
  spiPins: { SPI: [['MOSI', '51'], ['MISO', '50'], ['SCK', '52']] },
  //TODO: confirm the clock divides are the same for the DUE and UNO
  spiClockDivide: Blockly.mbed.Boards.profiles.uno.spiClockDivide,
  i2c: [['I2C', 'Wire']],
  i2cPins: { Wire: [['SDA', '20'], ['SCL', '21']] },
  i2cSpeed: [['100kHz', '100000L'], ['400kHz', '400000L']],
  builtinLed: Blockly.mbed.Boards.profiles.uno.builtinLed,
  interrupt: [['interrupt0', '2'], ['interrupt1', '3'], ['interrupt2', '21'],
              ['interrupt3', '20'], ['interrupt4', '19'], ['interrupt5', '18']]
};

/** mbed Leonardo board profile. */
Blockly.mbed.Boards.profiles.leonardo = {
  name: 'mbed Leonardo',
  description: 'mbed Leonardo-compatible board',
  compilerFlag: 'mbed:avr:leonardo',
  analogPins: Blockly.mbed.Boards.generateAnalogIo(0, 5).concat(
                  [['A6', '4'], ['A7', '6'], ['A8', '8'], ['A9', '9'],
                   ['A10', '10'], ['A11', '12']]),
  digitalPins: Blockly.mbed.Boards.generateDigitalIo(0, 13).concat(
                   Blockly.mbed.Boards.generateAnalogIo(0, 5)),
  pwmPins: Blockly.mbed.Boards.profiles.uno.pwmPins.concat([['13', '13']]),
  serial: Blockly.mbed.Boards.profiles.uno.serial,
  serialPins: Blockly.mbed.Boards.profiles.uno.serialPins,
  serialSpeed: Blockly.mbed.Boards.profiles.uno.serialSpeed,
  spi: [['SPI', 'SPI']],
  spiPins: { SPI: [['MOSI', 'ICSP-4'], ['MISO', 'ICSP-1'], ['SCK', 'ICSP-3']] },
  //TODO: confirm the clock divides are the same for the Leonardo and UNO
  spiClockDivide: Blockly.mbed.Boards.profiles.uno.spiClockDivide,
  i2c: [['I2C', 'Wire']],
  i2cPins: { Wire: [['SDA', '2'], ['SCL', '3']] },
  i2cSpeed: Blockly.mbed.Boards.profiles.uno.i2cSpeed,
  builtinLed: Blockly.mbed.Boards.profiles.uno.builtinLed,
  interrupt: [['interrupt0', '3'], ['interrupt1', '2'], ['interrupt2', '0'],
              ['interrupt3', '1'], ['interrupt4', '17']]
};

/** mbed Yun board processor and profile is identical to Leonardo. */
Blockly.mbed.Boards.profiles.yun =
    Blockly.mbed.Boards.duplicateBoardProfile(
        Blockly.mbed.Boards.profiles.leonardo,
        'mbed Yun',
        'mbed Yun compatible board');

/** Atmel Xplained mini boards profile (atmega328p, atmega328pb, atmega168pb).*/
Blockly.mbed.Boards.profiles.atmel_atmega328p_xplained_mini = {
  name: 'Atmel atmega328p Xplained mini',
  description: 'Atmel Xplained mini board with atmega328p (Uno compatible)',
  compilerFlag: 'atmel:avr:atmega328p_xplained_mini',
  analogPins: Blockly.mbed.Boards.profiles.uno.analogPins,
  digitalPins: Blockly.mbed.Boards.profiles.uno.digitalPins.concat(
      [['20', '20']]),
  pwmPins: Blockly.mbed.Boards.profiles.uno.pwmPins,
  serial: Blockly.mbed.Boards.profiles.uno.serial,
  serialPins: Blockly.mbed.Boards.profiles.uno.serialPins,
  serialSpeed: Blockly.mbed.Boards.profiles.uno.serialSpeed,
  spi: Blockly.mbed.Boards.profiles.uno.spi,
  spiPins: Blockly.mbed.Boards.profiles.uno.spiPins,
  spiClockDivide: Blockly.mbed.Boards.profiles.uno.spiClockDivide,
  i2c: Blockly.mbed.Boards.profiles.uno.i2c,
  i2cPins: Blockly.mbed.Boards.profiles.uno.i2cPins,
  i2cSpeed: Blockly.mbed.Boards.profiles.uno.i2cSpeed,
  builtinLed: [['BUILTIN_LED', '13']],
  interrupt: Blockly.mbed.Boards.profiles.uno.interrupt,
  builtinButton: [['BUILTIN_BUTTON', '20']]
};
Blockly.mbed.Boards.profiles.atmel_atmega328pb_xplained_mini =
    Blockly.mbed.Boards.duplicateBoardProfile(
        Blockly.mbed.Boards.profiles.atmel_atmega328p_xplained_mini,
        'Atmel atmega328pb Xplained mini',
        'Atmel Xplained mini board with atmega328pb (mbed Uno compatible)',
        'atmel:avr:atmega328pb_xplained_mini');
Blockly.mbed.Boards.profiles.atmel_atmega168pb_xplained_mini =
    Blockly.mbed.Boards.duplicateBoardProfile(
        Blockly.mbed.Boards.profiles.atmel_atmega328p_xplained_mini,
        'Atmel atmega168pb Xplained mini',
        'Atmel Xplained mini board with atmega168pb (mbed Uno compatible)',
        'atmel:avr:atmega168pb_xplained_mini');

/** ESP8266 for the Adafruit Huzzah. */
Blockly.mbed.Boards.profiles.esp8266_huzzah = {
  name: 'Adafruit Feather HUZZAH',
  description: 'Adafruit HUZZAH ESP8266 compatible board',
  compilerFlag: 'esp8266:esp8266:generic',
  analogPins: [['A0', 'A0']],
  digitalPins: [['0', '0'], ['2', '2'], ['4', '4'], ['5', '5'], ['12', '12'],
                ['13', '13'], ['14', '14'], ['15', '15'], ['16', '16']],
  pwmPins: [['2', '2']],
  serial: [['serial', 'Serial']],
  serialPins: { Serial: [['RX', 'RX'], ['TX', 'TX']] },
  serialSpeed: Blockly.mbed.Boards.profiles.uno.serial,
  spi: [['SPI', 'SPI']],
  spiPins: { SPI: [['MOSI', '13'], ['MISO', '12'], ['SCK', '14']] },
  spiClockDivide: Blockly.mbed.Boards.profiles.uno.spiClockDivide,
  i2c: [['I2C', 'Wire']],
  i2cPins: { Wire: [['SDA', '4'], ['SCL', '5']] },
  i2cSpeed: Blockly.mbed.Boards.profiles.uno.i2cSpeed,
  builtinLed: [['BUILTIN_1', '0']],
  interrupt: [['interrupt0', '2'], ['interrupt1', '3']]
};

/** ESP8266 for the Wemos D1 R2. */
Blockly.mbed.Boards.profiles.esp8266_wemos_d1 = {
  name: 'Wemos D1',
  description: 'Wemos D1 R2 compatible board',
  compilerFlag: 'esp8266:esp8266:generic',
  analogPins: [['A0', 'A0']],
  digitalPins: [['D0', 'D0'], ['D1', 'D1'], ['D2', 'D2'], ['D3', 'D3'],
                ['D4', 'D4'], ['D5', 'D5'], ['D6', 'D7'], ['D8', 'D8']],
  pwmPins:  [['D1', 'D1'], ['D2', 'D2'], ['D3', 'D3'], ['D4', 'D4'],
             ['D5', 'D5'], ['D6', 'D7'], ['D8', 'D8']],
  serial: [['serial', 'Serial']],
  serialPins: { Serial: [['RX', 'RX'], ['TX', 'TX']] },
  serialSpeed: Blockly.mbed.Boards.profiles.uno.serialSpeed,
  spi: [['SPI', 'SPI']],
  spiPins: { SPI: [['MOSI', 'D7'], ['MISO', 'D6'], ['SCK', 'D5']] },
  spiClockDivide: Blockly.mbed.Boards.profiles.uno.spiClockDivide,
  i2c: [['I2C', 'Wire']],
  i2cPins: { Wire: [['SDA', 'D2'], ['SCL', 'D1']] },
  i2cSpeed: Blockly.mbed.Boards.profiles.uno.i2cSpeed,
  builtinLed: [['BUILTIN_1', 'D4']],
  interrupt: [['D0', 'D0'], ['D1', 'D1'], ['D2', 'D2'], ['D3', 'D3'],
              ['D4', 'D4'], ['D5', 'D5'], ['D6', 'D7'], ['D8', 'D8']]
};

/** Set default profile to mbed standard-compatible board */
Blockly.mbed.Boards.selected = Blockly.mbed.Boards.profiles.nucleo_f103rb;

/**
 * Changes the mbed board profile selected, which trigger a refresh of the
 * blocks that use the profile.
 * @param {Blockly.Workspace} workspace Workspace to trigger the board change.
 * @param {string} newBoard Name of the new profile to set.
 */
Blockly.mbed.Boards.changeBoard = function(workspace, newBoard) {
  if (Blockly.mbed.Boards.profiles[newBoard] === undefined) {
    console.log('Tried to set non-existing mbed board: ' + newBoard);
    return;
  }
  Blockly.mbed.Boards.selected = Blockly.mbed.Boards.profiles[newBoard];
  // Update the pin out of all the blocks that uses them
  var blocks = workspace.getAllBlocks();
  for (var i = 0; i < blocks.length; i++) {
    var updateFields = blocks[i].updateFields;
    if (updateFields) {
      updateFields.call(blocks[i]);
    }
  }
};

/**
 * Refreshes the contents of a block Field Dropdown.
 * This is use to refresh the blocks after the board profile has been changed.
 * @param {!Blockly.Block} block Generated code.
 * @param {!string} fieldName Name of the block FieldDropdown to refresh.
 * @param {!string} boardKey Name of the board profile property to fetch.
 */
Blockly.mbed.Boards.refreshBlockFieldDropdown =
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
