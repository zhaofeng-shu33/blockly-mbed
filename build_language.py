#!/usr/bin/python2.7
# Generator language files from msg/message.js and msg/message_c.js
# This script generates msg/js/en.js


import sys
if sys.version_info[0] != 2:
  raise Exception("Blockly build only compatible with Python 2.x.\n"
                  "You are using: " + sys.version)


import json, os, threading, glob, subprocess, errno, codecs, re
from i18n.common import write_files

_INPUT_DEF_PATTERN = re.compile("""Blockly.Msg.(\w*)\s*=\s*'(.*)';?\r?$""")

_INPUT_SYN_PATTERN = re.compile("""Blockly.Msg.(\w*)\s*=\s*Blockly.Msg.(\w*);""")

_CONSTANT_DESCRIPTION_PATTERN = re.compile(
    """{{Notranslate}}""", re.IGNORECASE)

def import_path(fullpath):
  """Import a file with full path specification.
  Allows one to import from any directory, something __import__ does not do.

  Args:
      fullpath:  Path and filename of import.

  Returns:
      An imported module.
  """
  path, filename = os.path.split(fullpath)
  filename, ext = os.path.splitext(filename)
  sys.path.append(path)
  module = __import__(filename)
  reload(module)  # Might be out of date.
  del sys.path[-1]
  return module

def js_to_json(author='zhaofeng-shu33 <616545598@qq.com>', lang='en',
    output_dir='msg/json/',input_files=['msg/messages.js'],quiet=False):
  """Extracts messages from .js files into .json files for translation.

    Specifically, lines with the following formats are extracted:

        /// Here is a description of the following message.
        Blockly.SOME_KEY = 'Some value';

    Adjacent "///" lines are concatenated.

    There are two output files, each of which is proper JSON.  For each key, the
    file en.json would get an entry of the form:

        "Blockly.SOME_KEY", "Some value",

    The file qqq.json would get:

        "Blockly.SOME_KEY", "Here is a description of the following message.",

    Commas would of course be omitted for the final entry of each value.

    @author Ellen Spertus (ellen.spertus@gmail.com)

  Args:
      author:  name and email address of contact for translators.
      lang:  ISO 639-1 source language code.
      output_dir:  relative directory for output files.
      input_files:  input file list.
      quite:  only display warnings, not routine info.

  Returns:
      null.
  """
  # Read and parse input file.
  results = []
  synonyms = {}
  constants = {}  # Values that are constant across all languages.
  description = ''
  for each_file in input_files:
    infile = codecs.open(each_file, 'r', 'utf-8')
    for line in infile:
      if line.startswith('///'):
        if description:
          description = description + ' ' + line[3:].strip()
        else:
          description = line[3:].strip()
      else:
        match = _INPUT_DEF_PATTERN.match(line)
        if match:
          key = match.group(1)
          value = match.group(2).replace("\\'", "'")
          if not description:
            print('Warning: No description for ' + result['meaning'])
          if (description and _CONSTANT_DESCRIPTION_PATTERN.search(description)):
            constants[key] = value
          else:
            result = {}
            result['meaning'] = key
            result['source'] = value
            result['description'] = description
            results.append(result)
          description = ''
        else:
          match = _INPUT_SYN_PATTERN.match(line)
          if match:
            if description:
              print('Warning: Description preceding definition of synonym {0}.'.
                  format(match.group(1)))
              description = ''
            synonyms[match.group(1)] = match.group(2)
    infile.close()

  # Create <lang_file>.json, keys.json, and qqq.json.
  write_files(author, lang, output_dir, results, False)

  # Create synonyms.json.
  synonym_file_name = os.path.join(os.curdir, output_dir, 'synonyms.json')
  with open(synonym_file_name, 'w') as outfile:
    json.dump(synonyms, outfile)
  if not quiet:
    print("Wrote {0} synonym pairs to {1}.".format(
        len(synonyms), synonym_file_name))

  # Create constants.json
  constants_file_name = os.path.join(os.curdir, output_dir, 'constants.json')
  with open(constants_file_name, 'w') as outfile:
    json.dump(constants, outfile)
  if not quiet:
    print("Wrote {0} constant pairs to {1}.".format(
        len(constants), synonym_file_name))      
  return

class Gen_langfiles(threading.Thread):
  """Generate JavaScript file for each natural language supported.
  Runs in a separate thread.
  """

  def __init__(self):
    threading.Thread.__init__(self)

  def _rebuild(self, srcs, dests):
    # Determine whether any of the files in srcs is newer than any in dests.
    try:
      return (max(os.path.getmtime(src) for src in srcs) >
              min(os.path.getmtime(dest) for dest in dests))
    except OSError as e:
      # Was a file not found?
      if e.errno == errno.ENOENT:
        # If it was a source file, we can't proceed.
        if e.filename in srcs:
          print("Source file missing: " + e.filename)
          sys.exit(1)
        else:
          # If a destination file was missing, rebuild.
          return True
      else:
        print("Error checking file creation times: " + e)

  def run(self):
    # The files msg/json/{en,qqq,synonyms}.json depend on msg/messages.js.
    if (self._rebuild([os.path.join("msg", "messages.js"),os.path.join("msg", "messages_c.js")],
                      [os.path.join("msg", "json", f) for f in
                      ["en.json", "qqq.json", "synonyms.json"]])):
      try:
        js_to_json(input_files=['msg/messages.js','msg/messages_c.js'])
      except Exception as e:
        # Documentation for subprocess.check_call says that CalledProcessError
        # will be raised on failure, but I found that OSError is also possible.
        print(e.message)
        sys.exit(1)

    # Checking whether it is necessary to rebuild the js files would be a lot of
    # work since we would have to compare each <lang>.json file with each
    # <lang>.js file.  Rebuilding is easy and cheap, so just go ahead and do it.
    try:
      # Use create_messages.py to create .js files from .json files.
      cmd = [
          "python",
          os.path.join("i18n", "create_messages.py"),
          "--source_lang_file", os.path.join("msg", "json", "en.json"),
          "--source_synonym_file", os.path.join("msg", "json", "synonyms.json"),
          "--source_constants_file", os.path.join("msg", "json", "constants.json"),
          "--key_file", os.path.join("msg", "json", "keys.json"),
          "--output_dir", os.path.join("msg", "js"),
          "--quiet"]
      json_files = glob.glob(os.path.join("msg", "json", "*.json"))
      json_files = [file for file in json_files if not
                    (file.endswith(("keys.json", "synonyms.json", "qqq.json", "constants.json")))]
      cmd.extend(json_files)
      subprocess.check_call(cmd)
    except (subprocess.CalledProcessError, OSError) as e:
      print("Error running i18n/create_messages.py: ", e)
      sys.exit(1)

    # Output list of .js files created.
    for f in json_files:
      # This assumes the path to the current directory does not contain "json".
      f = f.replace("json", "js")
      if os.path.isfile(f):
        print("SUCCESS: " + f)
      else:
        print("FAILED to create " + f)







if __name__ == "__main__":
  Gen_langfiles().start()


