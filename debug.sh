#!/bin/bash
node-inspector --web-port 3010 & node-supervisor --debug server.js 
