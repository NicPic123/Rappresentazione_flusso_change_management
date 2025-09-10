@echo off
echo ========================================
echo   Diagramma Interattivo - Server Test
echo ========================================
echo.

:: Verifica se Python è installato
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python non trovato. 
    echo 💡 Installare Python o aprire index.html direttamente nel browser
    echo.
    pause
    exit /b 1
)

:: Avvia il server
echo 🚀 Avvio server di sviluppo...
echo.

python server.py 8000

pause