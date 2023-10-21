@ECHO off
WHERE /Q node || (ECHO Node.js must be installed before using this script! & PAUSE & EXIT)
npm install
node index.js
