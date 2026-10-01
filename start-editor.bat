@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

title SCUM Object Editor - Setup und Start

echo.
echo ======================================
echo SCUM Object Editor - Setup
echo ======================================
echo.

REM Prüfe ob wir bereits im Projektordner sind
if not exist "package.json" (
    echo Klone Repository...
    git clone https://github.com/Manfredo999/scum-object-editor.git
    cd scum-object-editor
)

echo.
echo ======================================
echo 1. Installiere Dependencies...
echo ======================================
echo.

call npm install

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo FEHLER: npm install fehlgeschlagen!
    echo Prüfe ob Node.js und npm korrekt installiert sind.
    pause
    exit /b 1
)

echo.
echo ======================================
echo 2. Starte Dev-Server...
echo ======================================
echo.
echo Der Editor wird in Kürze im Browser geöffnet.
echo Öffne wenn nötig manuell: http://localhost:5173
echo.
echo Drücke Ctrl+C um den Server zu stoppen.
echo.

timeout /t 2 /nobreak

call npm run dev

pause
