#!/usr/bin/python
# -*- coding: utf-8 -*-
#
# credit: http://sheep.art.pl/Wiki%20Engine%20in%20Python%20from%20Scratch


import BaseHTTPServer
import itertools
import logging
import platform
import json
import os
import re
import subprocess
import tempfile
import urllib
from optparse import OptionParser


logging.basicConfig(level=logging.DEBUG)
board_global=''



class Handler(BaseHTTPServer.BaseHTTPRequestHandler):

    def do_HEAD(self):
        """Send response headers"""
        if self.path != "/":
            return self.send_error(404,"File not found!")
        self.send_response(200)
        self.send_header("content-type", "text/html;charset=utf-8")
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()

    def do_GET(self):
        """For Test Purpose only"""
        if self.path != "/":
            return self.send_error(404,"File not found!")
        else:
            self.send_response(200)
            self.send_header("content-type", "text/html;charset=utf-8")
            self.end_headers()
            self.wfile.write("It works!")

    def do_POST(self):
        """Save new page text and display it"""
        if self.path != "/":
            return self.send_error(404,"File not found!")

        print(board_global)

        length = int(self.headers.getheader('content-length'))
        if length:
            text = self.rfile.read(length)
            text = text.split('\r\n')[0]            
            print("sketch to upload: " + text)

            dirname = tempfile.mkdtemp()
            sketchname = os.path.join(dirname, os.path.basename(dirname)) + ".cpp"
            f = open(sketchname, "wb")
            f.write(text + "\n")
            f.close()

            print("created sketch at %s" % (sketchname))
        
            # invoke mbed to build/upload
            compile_args = ["cc","-I","./","-c",sketchname]

            print("compiling with %s" % (" ".join(compile_args)))
            
            p = subprocess.Popen(compile_args,stdin=None,stdout=subprocess.PIPE,stderr=subprocess.STDOUT)
            buf = []
            while True:
                # Use os.read to read only what's available on the pipe,
                # without waiting to fill a buffer
                data = os.read(p.stdout.fileno(), 4096)
                if not data:
                    break
                # See "A note about encoding" above
                data = data.decode('utf-8')
                buf.append(data)
            rc = p.wait()
            byte_code=''
            if rc == 0: # .o file is generated, read its content.                 
                byte_code=open(os.path.basename(dirname)+'.o','rb').read()                            
            else:
                print("mbed --upload returned %d"%rc)
            self.send_response(200)
            self.send_header("content-type","application/json;charset=utf-8")
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            json_response={'return_code':rc,'byte_code':byte_code,'compiler_output':''.join(buf)}#'utf8' codec can't decode byte
            self.wfile.write(json.dumps(json_response))
        else:
            self.send_response(400)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()

if __name__ == '__main__':
    parser = OptionParser(version="%prog 1.0")
    parser.add_option("--port", dest="port", help="Upload to serial port named PORT", metavar="PORT",default='8080')
    parser.add_option("--board", dest="board", help="Board definition to use", metavar="BOARD",default='ST-Nucleo-F103RB')
    parser.add_option("--command", dest="cmd", help="C compiler options", metavar="CMD")
    (options, args) = parser.parse_args()
    print("The service can now be accessed at http://127.0.0.1:%s/"%(options.port))
    board_global=options.board
    server = BaseHTTPServer.HTTPServer(("0.0.0.0", int(options.port)), Handler)
    server.pages = {}
    server.serve_forever()
