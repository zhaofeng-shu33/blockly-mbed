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

Still, for developing and debugging, google [https://github.com/google/closure-library](closure-library) is needed but "blockly-master" branch is no longer needed.

## Release Build

We can compress the files in blocks/*, generators/* and use blockly_compressed.js. 

Therefore, no depedency on closure-library is needed and the browser can read only a few javascript files to make everything work.

Currently, I use nodejs "google-closure-compiler-js" modules to compress these files.

use node_compressed_utility.js to build "node_compressed_utility.js" from msg/*

use node_compressed_block.js to build "node_compressed_block.js" from blocks/*

use node_compressed_generator.js to build "node_compressed_generator.js" from generator/*

index.html is the release version of mbed-blockly.

## Version

The current implementation supports mbed OS 2 only. Mbed OS 5 will be considered in the future release.

## Enhanced feature to core library of blockly

To make Blockly support code generation of C code, we add a few js files under the folder "c_core" without changing the original code of blockly.

instances.js
field_variable.js
field_instance.js
block.js
blockly.js

## Keep up-to-date with upstream library

To make the development up-to-date, I should manually download the latest version of [google-closure-compiler](https://github.com/google/closure-compiler-js) and [google-blockly](https://github.com/google/blockly). The former is easier to handle since all I should do is downloading the compressed library and extract it.
For the latter (blockly), I only need parts of it. Therefore, I should manually download the following parts:

* `core/*`
* `blocks/*`
* `msg/js/en.js`

## Reference
 
* [https://os.mbed.com/platforms/ST-Nucleo-F103RB/](https://os.mbed.com/platforms/ST-Nucleo-F103RB/) hardware information

* [https://developer-sjc-indigo-border.mbed.org/cookbook/Homepage](https://developer-sjc-indigo-border.mbed.org/cookbook/Homepage) SDK API reference

* [https://developers.google.com/blockly/guides/overview](https://developers.google.com/blockly/guides/overview) Google Blockly reference
