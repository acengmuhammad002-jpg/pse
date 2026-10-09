@echo off
title UNO CERITA: School Well-being 3D
cd /d "%~dp0"
set PATH=C:\Users\FUJITSU\node_standalone\node-v20.18.0-win-x64;%PATH%
echo ===================================================
echo   MEMULAI GAME "UNO CERITA: School Well-being 3D"
echo ===================================================
echo.
echo Membuka browser di http://localhost:3000 ...
start "" "http://localhost:3000"
echo.
call npm run dev
pause
