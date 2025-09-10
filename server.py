#!/usr/bin/env python3
"""
Semplice server HTTP per testare l'applicazione localmente
Uso: python server.py [porta]
"""

import http.server
import socketserver
import sys
import os

# Porta predefinita
PORT = 8000
if len(sys.argv) > 1:
    try:
        PORT = int(sys.argv[1])
    except ValueError:
        print(f"Porta non valida: {sys.argv[1]}. Uso porta predefinita {PORT}")

# Cambia nella directory del script
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# Configurazione del server
Handler = http.server.SimpleHTTPRequestHandler

# Aggiunge header CORS per sviluppo locale
class CORSRequestHandler(Handler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        super().end_headers()

try:
    with socketserver.TCPServer(("", PORT), CORSRequestHandler) as httpd:
        print(f"🌐 Server avviato su http://localhost:{PORT}")
        print(f"📁 Serving files from: {os.getcwd()}")
        print(f"🔗 Apri: http://localhost:{PORT}/index.html")
        print("⚠️  Usa Ctrl+C per fermare il server")
        httpd.serve_forever()
except KeyboardInterrupt:
    print("\n👋 Server fermato")
except OSError as e:
    print(f"❌ Errore: {e}")
    print(f"💡 Prova una porta diversa: python server.py {PORT + 1}")