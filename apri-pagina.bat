@echo off
echo ========================================
echo   Diagramma Interattivo - Avvio Automatico
echo ========================================
echo.

:: Imposta la directory di lavoro
cd /d "%~dp0"

:: Verifica se Python è installato
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python non trovato. 
    echo 💡 Apertura diretta del file HTML nel browser...
    echo.
    
    :: Apri il file HTML direttamente nel browser predefinito
    start "" "index.html"
    
    echo ✅ Pagina aperta nel browser!
    echo.
    echo 📝 Nota: Alcune funzionalità potrebbero non funzionare senza server
    echo    Per funzionalità complete, installa Python e riavvia questo file
    echo.
    pause
    exit /b 0
)

:: Se Python è disponibile, avvia il server
echo 🚀 Avvio server di sviluppo...
echo.

:: Avvia il server in background
start /b python server.py 8000

:: Attendi qualche secondo per permettere al server di avviarsi
echo ⏳ Attesa avvio server...
timeout /t 3 /nobreak >nul

:: Apri la pagina nel browser
echo 🌐 Apertura pagina nel browser...
start "" "http://localhost:8000"

echo.
echo ✅ Server avviato e pagina aperta!
echo.
echo 📋 Informazioni:
echo    • Server: http://localhost:8000
echo    • Per fermare il server, chiudi questa finestra
echo.
echo ⚠️  IMPORTANTE: Non chiudere questa finestra per mantenere il server attivo
echo.

:: Mantieni la finestra aperta per il server
pause >nul