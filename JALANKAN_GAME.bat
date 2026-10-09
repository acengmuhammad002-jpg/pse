@echo off
title UNO CERITA: School Well-being 3D
cd /d "%~dp0"
set PATH=C:\Users\FUJITSU\node_standalone\node-v20.18.0-win-x64;%PATH%
echo ===================================================
echo   MEMULAI GAME "UNO CERITA: School Well-being 3D"
echo ===================================================
echo.
echo Membuka browser di http://localhost:5173 ...
start "" "http://localhost:5173"
echo.
call npm run preview
pause
