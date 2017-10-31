# USE Blockly to build a simple mbed C code generator

## Background

Graphical Code generator has been a trend nowadays. There is Arduino code generator with Blockly. This project tries to build
a mbed C code generator to help students prototyping their ideas more quickly.

## Ambition

Currently, the following blocks are considered:

   * LED
   * Servo
   * Motor
   * Accelerator Sensor
   * LCD

## Build type

The project is started from [BlocklyDuino](https://github.com/BlocklyDuino/BlocklyDuino) and [https://github.com/carlosperate/ardublockly](Ardublockly).
The index.html favor and index_utility.js wrapper are based on BlocklyDuino while the blocks and generator are based on Ardublockly.
Notice that because Ardublockly changes some functions of google blockly core,blocks and msg, the project has to use in source build. Still, for developing and debuggin google "closure-library/" is needed but "blockly-master" branch is no longer needed.

## Reference
 
[https://os.mbed.com/platforms/ST-Nucleo-F103RB/](https://os.mbed.com/platforms/ST-Nucleo-F103RB/)

