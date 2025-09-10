# Diagramma Interattivo - Flusso di Change Management con AI assistita

## Descrizione
Applicazione web interattiva che trasforma il diagramma SVG statico del flusso di Change Management in un'esperienza dinamica e informativa.

## Funzionalità

### 🎯 Interattività
- **Click sui nodi**: Clicca su qualsiasi casella del diagramma per visualizzare i dettagli completi
- **Tooltip informativi**: Passa il mouse sui nodi per vedere il titolo della fase
- **Accessibilità**: Supporto completo per navigazione da tastiera

### 📊 Layout Responsivo
- **Sezione principale**: Diagramma SVG interattivo
- **Pannello laterale**: Tool e principi sempre visibili
- **Modale dettagli**: Informazioni dettagliate per ogni fase del processo

### 🔧 Tecnologie Utilizzate
- HTML5 + CSS3 + JavaScript vanilla
- SVG dinamico con eventi personalizzati
- Layout responsive con Flexbox
- Animazioni CSS per migliorare l'UX

## Struttura File

```
Rappresentazione_del_flusso/
├── index.html                              # Pagina principale
├── styles.css                              # Stili CSS
├── script.js                               # Logica JavaScript
├── data/
│   └── dettagli.json                       # Dati strutturati del flusso
├── Flusso_di_Change_Management_con_AIassistita.svg  # Diagramma SVG
├── Dettagli_del_flusso.txt                 # Dati originali
├── Tool_e_principi.txt                     # Documentazione di supporto
└── README.md                               # Documentazione
```

## Come Usare

### Apertura Locale
1. Apri il file `index.html` in un browser moderno
2. L'applicazione caricherà automaticamente il diagramma SVG
3. Clicca su qualsiasi nodo per visualizzare i dettagli

### Hosting Web
L'applicazione è compatibile con hosting statico:
- GitHub Pages
- Netlify
- Vercel
- Amazon S3
- Qualsiasi server web statico

## Dettagli Tecnici

### Flusso del Processo (17 Fasi)
1. **Definizione del requisito** - Cliente
2. **Raccolta e validazione preliminare** - Analista con AI
3. **Generazione specifiche funzionali** - Analista con AI (Zencoder)
4. **Generazione specifiche tecniche** - Analista + Sviluppatore con AI
5. **Q&A con cliente** - Analista con AI
6. **Pianificazione attività** - PM con AI
7. **Quality Gate di specifiche** - Analista, Sviluppatore
8. **Sviluppo in DEV** - Sviluppatore con AI (Zencoder)
9. **Static code analysis** - Sviluppatore, AI
10. **Test in DEV** - Sviluppatore, Analista con AI
11. **User Acceptance Test** - Cliente + Analista con AI
12. **Revisione CAB** - PM, Analista, Sviluppatore con AI
13. **Piano di rilascio** - Sviluppatore con AI
14. **Rilascio in produzione** - Sviluppatore, PM con AI
15. **Post-implementation review** - Analista, PM con AI
16. **Documentazione finale** - Analista, Sviluppatore con AI
17. **Aggiornamento knowledge base** - Analista con AI

### Mapping ID SVG
Gli ID degli elementi SVG sono mappati ai dati JSON:
- `mpN8DdClBTytBIZhrkFq-2` → Definizione del requisito
- `mpN8DdClBTytBIZhrkFq-3` → Raccolta e validazione
- `mpN8DdClBTytBIZhrkFq-4` → Generazione specifiche funzionali
- ... (continua per tutte le 17 fasi)

## Personalizzazione

### Aggiornare i Contenuti
1. **Modifica dettagli**: Edita `data/dettagli.json`
2. **Aggiorna SVG**: Sostituisci il file SVG mantenendo gli ID degli elementi
3. **Tool e principi**: Modifica il contenuto statico in `index.html`

### Customizzazione Stile
- **Colori**: Modifica le variabili CSS in `styles.css`
- **Layout**: Aggiorna le sezioni Flexbox
- **Animazioni**: Personalizza le transizioni CSS

## Browser Supportati
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Troubleshooting

### Problemi Comuni
1. **SVG non carica**: Verifica che il file SVG sia nella directory root
2. **Dettagli non mostrati**: Controlla la console per errori nel JSON
3. **Elementi non cliccabili**: Verifica che gli ID SVG corrispondano al JSON

### Debug
In modalità development (localhost), sono disponibili helper di debug:
```javascript
// Console del browser
window.debugFlow.flowDetails()        // Visualizza tutti i dettagli
window.debugFlow.interactiveElements() // Lista elementi interattivi
window.debugFlow.testModal('mpN8DdClBTytBIZhrkFq-2') // Test modale
```

## Sviluppi Futuri
- [ ] Zoom e pan del diagramma
- [ ] Ricerca testuale nelle fasi
- [ ] Esportazione PDF dei dettagli
- [ ] Dark mode
- [ ] Animazioni del flusso sequenziale
- [ ] Integration con API esterne

## Licenza
Proprietario - EDENRED

## Contatti
Per supporto e sviluppi contattare il team di sviluppo interno.