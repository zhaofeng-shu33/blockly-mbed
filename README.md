# USE Blockly to build a simple mbed C code generator

## Background

Graphical Code generator has been a trend nowadays. There is Arduino code generator with Blockly. This project tries to build
a mbed C code generator to help students prototyping their ideas more quickly.

## Ambition

Currently, the following blocks are considered:

   * GPIO
   * Servo
   * Serial
   * SPI

## Developer Build

The project is started from [BlocklyDuino](https://github.com/BlocklyDuino/BlocklyDuino) and [Ardublockly](https://github.com/carlosperate/ardublockly).

The index.html favor and index_utility.js wrapper are based on BlocklyDuino while the blocks and the generator is based on Ardublockly.

Notice that because Ardublockly changes some functions of google blockly core, blocks and msg, the project has to use in source build. 

Still, for developing and debugging, google "closure-library/" is needed but "blockly-master" branch is no longer needed.

## Release Build

We can compress the files in blocks/*, generators/* and use blockly_compressed.js. 

Therefore, no depedency on closure-library is needed and the browser can read only a few javascript files to make everything work.

Currently, I use nodejs "google-closure-compiler-js" modules to compress these files.

use node_compressed_language.js to build "node_compressed_language.js" from msg/*

use node_compressed_block.js to build "node_compressed_block.js" from blocks/*

use node_compressed_generator.js to build "node_compressed_generator.js" from generator/*

index.html is the release version of mbed-blockly.

## Reference
 
* [https://os.mbed.com/platforms/ST-Nucleo-F103RB/](https://os.mbed.com/platforms/ST-Nucleo-F103RB/) hardware information

* [https://developer-sjc-indigo-border.mbed.org/cookbook/Homepage](https://developer-sjc-indigo-border.mbed.org/cookbook/Homepage) SDK API reference

* [https://developers.google.com/blockly/guides/overview](https://developers.google.com/blockly/guides/overview) Google Blockly reference