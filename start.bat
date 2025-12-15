@echo off
cd /d "C:\chemin\vers\ton\projet"
start cmd /k "npm run dev"
start "" "http://localhost:5173"
pause
