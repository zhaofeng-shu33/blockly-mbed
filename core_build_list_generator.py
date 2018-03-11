#!/usr/bin/python2.7
# Generator core build list for further processing by nodejs
# This script generates core_build_list.json


import sys
if sys.version_info[0] != 2:
  raise Exception("Blockly build only compatible with Python 2.x.\n"
                  "You are using: " + sys.version)


import json, os, threading


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







class Gen_compressed(threading.Thread):
  """Generate a json list file that contains all of Blockly's core, 
  its extension c_core, and all
  required parts of Closure files
  """
  def __init__(self, search_paths):
    threading.Thread.__init__(self)
    self.search_paths = search_paths

  def run(self):
    self.gen_core_build_list()


    
  def gen_core_build_list(self):
    target_filename = "core_build_list.json"

    # Read in all the source files.
    filenames = calcdeps.CalculateDependencies(self.search_paths,
        [os.path.join("core", "blockly.js"),os.path.join("c_core","c_blockly.js")])
    core_build_list_json_string=json.dumps(filenames)
    with open(target_filename,'w') as f:
        f.write(core_build_list_json_string)
        f.close()



if __name__ == "__main__":
  try:
    calcdeps = import_path(os.path.join(
        os.path.pardir, "closure-library", "closure", "bin", "calcdeps.py"))
  except ImportError:
    if os.path.isdir(os.path.join(os.path.pardir, "closure-library-read-only")):
      # Dir got renamed when Closure moved from Google Code to GitHub in 2014.
      print("Error: Closure directory needs to be renamed from"
            "'closure-library-read-only' to 'closure-library'.\n"
            "Please rename this directory.")
    elif os.path.isdir(os.path.join(os.path.pardir, "google-closure-library")):
      # When Closure is installed by npm, it is named "google-closure-library".
      #calcdeps = import_path(os.path.join(
      # os.path.pardir, "google-closure-library", "closure", "bin", "calcdeps.py"))
      print("Error: Closure directory needs to be renamed from"
           "'google-closure-library' to 'closure-library'.\n"
           "Please rename this directory.")
    else:
      print("""Error: Closure not found.  Read this:
developers.google.com/blockly/guides/modify/web/closure""")
    sys.exit(1)

  core_search_paths = calcdeps.ExpandDirectories(
      ["core","c_core",os.path.join(os.path.pardir, "closure-library")])
  core_search_paths.sort()  # Deterministic build.

  Gen_compressed(core_search_paths).start()


