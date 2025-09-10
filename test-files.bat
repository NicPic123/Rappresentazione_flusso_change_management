@echo off
echo ========================================
echo    Verifica File Diagramma Interattivo
echo ========================================
echo.

set "missing_files="

echo Controllo file principali:
if exist "index.html" (echo   ✅ index.html) else (echo   ❌ index.html MANCANTE && set "missing_files=1")
if exist "styles.css" (echo   ✅ styles.css) else (echo   ❌ styles.css MANCANTE && set "missing_files=1")
if exist "script.js" (echo   ✅ script.js) else (echo   ❌ script.js MANCANTE && set "missing_files=1")
if exist "data\dettagli.json" (echo   ✅ data\dettagli.json) else (echo   ❌ data\dettagli.json MANCANTE && set "missing_files=1")
if exist "Flusso_di_Change_Management_con_AIassistita.svg" (echo   ✅ File SVG) else (echo   ❌ File SVG MANCANTE && set "missing_files=1")

echo.
echo File di supporto:
if exist "README.md" (echo   ✅ README.md) else (echo   ⚠️  README.md)
if exist "server.py" (echo   ✅ server.py) else (echo   ⚠️  server.py)
if exist "Dettagli_del_flusso.txt" (echo   ✅ Dati originali) else (echo   ⚠️  Dati originali)

echo.
echo ========================================

if defined missing_files (
    echo ❌ INSTALLAZIONE INCOMPLETA
    echo Alcuni file essenziali sono mancanti.
) else (
    echo 🎉 INSTALLAZIONE COMPLETA!
    echo.
    echo 📌 Per testare l'applicazione:
    echo    1. Apri index.html nel browser
    echo    2. Oppure esegui: python server.py
    echo    3. Oppure usa: start-server.bat
    echo.
    echo 🌐 URL: http://localhost:8000/index.html
)

echo ========================================
pause