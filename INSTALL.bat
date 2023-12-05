@ECHO off
WHERE /Q node || (ECHO Node.js must be installed before using this script! & PAUSE & EXIT)
CALL npm install
node index.js
