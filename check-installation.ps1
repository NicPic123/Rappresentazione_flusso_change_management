# Script PowerShell per verificare l'installazione
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Verifica Installazione Diagramma   " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$currentDir = Get-Location
Write-Host "📁 Directory corrente: $currentDir" -ForegroundColor Yellow
Write-Host ""

# File richiesti
$requiredFiles = @(
    "index.html",
    "styles.css", 
    "script.js",
    "data/dettagli.json",
    "Flusso_di_Change_Management_con_AIassistita.svg",
    "README.md"
)

$allPresent = $true

Write-Host "🔍 Controllo file richiesti..." -ForegroundColor Green

foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "   ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "   ❌ $file - MANCANTE!" -ForegroundColor Red
        $allPresent = $false
    }
}

Write-Host ""

# File opzionali
$optionalFiles = @(
    "server.py",
    "start-server.bat",
    "Dettagli_del_flusso.txt",
    "Tool_e_principi.txt"
)

Write-Host "📋 File opzionali:" -ForegroundColor Yellow

foreach ($file in $optionalFiles) {
    if (Test-Path $file) {
        Write-Host "   ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  $file - Opzionale" -ForegroundColor Yellow
    }
}

Write-Host ""

# Verifica contenuto JSON
if (Test-Path "data/dettagli.json") {
    try {
        $jsonContent = Get-Content "data/dettagli.json" -Raw | ConvertFrom-Json
        $nodeCount = ($jsonContent | Get-Member -MemberType NoteProperty).Count
        Write-Host "📊 Nodi configurati nel JSON: $nodeCount" -ForegroundColor Green
    }
    catch {
        Write-Host "⚠️  Errore nel parsing del JSON" -ForegroundColor Red
        $allPresent = $false
    }
}

# Verifica dimensione SVG
if (Test-Path "Flusso_di_Change_Management_con_AIassistita.svg") {
    $svgSize = (Get-Item "Flusso_di_Change_Management_con_AIassistita.svg").Length
    $svgSizeKB = [math]::Round($svgSize / 1KB, 2)
    Write-Host "📐 Dimensione SVG: $svgSizeKB KB" -ForegroundColor Green
    
    if ($svgSize -lt 1KB) {
        Write-Host "⚠️  File SVG molto piccolo - potrebbe essere vuoto" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan

if ($allPresent) {
    Write-Host "🎉 INSTALLAZIONE COMPLETA!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📌 Prossimi passi:" -ForegroundColor White
    Write-Host "   1. Apri index.html nel browser" -ForegroundColor White
    Write-Host "   2. Oppure avvia: python server.py" -ForegroundColor White
    Write-Host "   3. Oppure esegui: start-server.bat" -ForegroundColor White
    Write-Host ""
    Write-Host "🌐 URL locale: http://localhost:8000/index.html" -ForegroundColor Cyan
} else {
    Write-Host "❌ INSTALLAZIONE INCOMPLETA" -ForegroundColor Red
    Write-Host "Controllare i file mancanti sopra indicati" -ForegroundColor Red
}

Write-Host "========================================" -ForegroundColor Cyan