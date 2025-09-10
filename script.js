// Stato dell'applicazione
let flowDetails = {};
let svgElement = null;

// Elementi DOM
const svgContainer = document.getElementById('svg-container');
const modal = document.getElementById('detail-modal');
const modalTitle = document.getElementById('modal-title');
const modalAttore = document.getElementById('modal-attore');
const modalOutput = document.getElementById('modal-output');
const modalSupportoAI = document.getElementById('modal-supporto-ai');
const supportoAISection = document.getElementById('supporto-ai-section');
const closeModal = document.getElementById('close-modal');
const loading = document.getElementById('loading');
const toolsContent = document.getElementById('tools-content');

// Inizializzazione
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await initializeApp();
    } catch (error) {
        console.error('Errore durante l\'inizializzazione:', error);
        showError('Errore nel caricamento dell\'applicazione');
    }
});

// Inizializza l'applicazione
async function initializeApp() {
    showLoading(true);
    
    try {
        // Carica i dati in parallelo
        const [detailsData, svgData] = await Promise.all([
            loadFlowDetails(),
            loadSVG(),
            loadToolsAndPrinciples()
        ]);
        
        flowDetails = detailsData;
        await setupSVGInteractivity(svgData);
        setupEventListeners();
        
        console.log('Applicazione inizializzata con successo');
    } finally {
        showLoading(false);
    }
}

// Carica i dettagli del flusso
async function loadFlowDetails() {
    try {
        const response = await fetch('./data/dettagli.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Errore nel caricamento dei dettagli:', error);
        throw new Error('Impossibile caricare i dettagli del flusso');
    }
}

// Carica l'SVG
async function loadSVG() {
    try {
        const response = await fetch('./Flusso_di_Change_Management_con_AIassistita.svg');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.text();
    } catch (error) {
        console.error('Errore nel caricamento dell\'SVG:', error);
        throw new Error('Impossibile caricare il diagramma');
    }
}

// Carica il contenuto del file Tool e principi
async function loadToolsAndPrinciples() {
    try {
        // Aggiunge timestamp per evitare cache
        const timestamp = new Date().getTime();
        const response = await fetch(`Tool_e_principi.txt?v=${timestamp}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const content = await response.text();
        
        // Elabora il contenuto per renderlo più leggibile
        const formattedContent = formatToolsContent(content);
        toolsContent.innerHTML = formattedContent;
        
        console.log('✅ Tool e principi caricati correttamente (ricaricamento forzato)');
    } catch (error) {
        console.error('❌ Errore nel caricamento di Tool_e_principi.txt:', error);
        toolsContent.innerHTML = `
            <div class="error-message">
                <p><strong>⚠️ Errore nel caricamento</strong></p>
                <p>Non è stato possibile caricare il file Tool_e_principi.txt</p>
                <p>Errore: ${error.message}</p>
            </div>
        `;
    }
}

// Formatta il contenuto dei Tool e Principi
function formatToolsContent(content) {
    const lines = content.split('\n');
    let html = '';
    let currentSection = '';
    let firstToolsHeadingDone = false; // Per sostituire il primo "Tool:" con il link richiesto

    for (let line of lines) {
        line = line.trim();
        if (!line) continue;
        
        if (line.includes('Tool:') || line.includes('Tool ')) {
            // Primo "Tool:" → sostituisci l'header con il link a Struttura_repo.txt
            if (!firstToolsHeadingDone) {
                html += '<div class="tools-group"><h3><a href="Struttura_repo.txt" target="_blank" rel="noopener">Struttura del repo</a></h3><ul>';
                firstToolsHeadingDone = true;
            } else {
                html += '<div class="tools-group"><h3>🛠️ Tool:</h3><ul>';
            }
            currentSection = 'tools';
        } else if (line.includes('Principi')) {
            if (currentSection === 'tools') html += '</ul></div>';
            html += '<div class="principles-group"><h3>📋 Principi guida:</h3><ul>';
            currentSection = 'principles';
        } else if (line.includes('Tool e Principi')) {
            // Titolo principale, skip
        } else if (line.length > 0) {
            // Contenuto normale
            if (currentSection === 'tools' || currentSection === 'principles') {
                html += `<li>${line}</li>`;
            } else {
                html += `<p>${line}</p>`;
            }
        }
    }
    
    if (currentSection === 'tools' || currentSection === 'principles') {
        html += '</ul></div>';
    }
    
    return html || `<pre class="tools-text">${content}</pre>`;
}

// Configura l'interattività dell'SVG
async function setupSVGInteractivity(svgData) {
    console.log('📄 Caricamento SVG...');
    
    // Inserisce l'SVG nel container
    svgContainer.innerHTML = svgData;
    svgElement = svgContainer.querySelector('svg');
    
    if (!svgElement) {
        throw new Error('SVG non trovato nel container');
    }
    
    console.log('✅ SVG caricato correttamente');
    console.log(`🔍 Elementi totali nell'SVG: ${svgElement.querySelectorAll('*').length}`);
    
    // Verifica che abbiamo tutti i dati
    console.log(`📊 Nodi configurati nel JSON: ${Object.keys(flowDetails).length}`);
    
    // Trova tutti gli elementi interattivi
    const interactiveElements = findInteractiveElements();
    
    console.log(`🎯 Trovati ${interactiveElements.length} elementi interattivi`);
    
    if (interactiveElements.length === 0) {
        console.error('❌ NESSUN ELEMENTO INTERATTIVO TROVATO!');
        console.log('🔍 DEBUGGING DETTAGLIATO:');
        
        // Proviamo a vedere tutti gli elementi con ID nell'SVG
        const allElementsWithId = svgElement.querySelectorAll('[id]');
        console.log(`📊 Elementi con ID nell'SVG: ${allElementsWithId.length}`);
        
        const svgIds = [];
        allElementsWithId.forEach((el, index) => {
            svgIds.push(el.id);
            if (index < 15) { // Mostra i primi 15
                console.log(`  - ID: "${el.id}", Tag: ${el.tagName}, Text: "${el.textContent?.substr(0, 30)}..."`);
            }
        });
        
        console.log('📋 ID nel JSON:', Object.keys(flowDetails));
        console.log('📋 ID nell\'SVG:', svgIds.slice(0, 15));
        
        // Controllo se ci sono match parziali
        const jsonIds = Object.keys(flowDetails);
        const matches = jsonIds.filter(jsonId => svgIds.includes(jsonId));
        const partialMatches = jsonIds.filter(jsonId => 
            svgIds.some(svgId => svgId.includes(jsonId) || jsonId.includes(svgId))
        );
        
        console.log(`🎯 Match esatti: ${matches.length}`, matches);
        console.log(`🔍 Match parziali: ${partialMatches.length}`, partialMatches);
    }
    
    // Aggiunge l'interattività
    interactiveElements.forEach(element => {
        makeElementInteractive(element);
    });
    
    console.log(`✅ Interattività configurata per ${interactiveElements.length} elementi`);
}

// Trova gli elementi interattivi nell'SVG
function findInteractiveElements() {
    const interactiveElements = [];
    const notFoundElements = [];
    
    // METODO 1: Cerca tutti gli elementi con ID che corrispondono ai nostri dati
    Object.keys(flowDetails).forEach(nodeId => {
        // Prova diversi selettori per trovare l'elemento
        let element = svgElement.querySelector(`[id="${nodeId}"]`);
        
        if (!element) {
            element = svgElement.querySelector(`#${nodeId}`);
        }
        
        if (!element) {
            element = document.getElementById(nodeId);
        }
        
        if (element) {
            interactiveElements.push({
                element: element,
                nodeId: nodeId,
                data: flowDetails[nodeId]
            });
            console.log(`✅ Trovato elemento: ${nodeId} - ${flowDetails[nodeId].title}`);
        } else {
            notFoundElements.push(nodeId);
            console.warn(`❌ Elemento non trovato: ${nodeId} - ${flowDetails[nodeId].title}`);
        }
    });
    
    // METODO 2: Per i nodi non trovati, proviamo a cercare per contenuto di testo
    if (notFoundElements.length > 0) {
        console.log(`🔄 Tentativo di matching per testo per ${notFoundElements.length} elementi non trovati...`);
        
        // Cerca elementi che contengono testi specifici del nostro flusso
        const textMappings = [
            { text: "Definizione del requisito", nodeId: "mpN8DdClBTytBIZhrkFq-2" },
            { text: "Raccolta e validazione", nodeId: "mpN8DdClBTytBIZhrkFq-3" },
            { text: "specifiche funzionali", nodeId: "mpN8DdClBTytBIZhrkFq-4" },
            { text: "specifiche tecniche", nodeId: "mpN8DdClBTytBIZhrkFq-5" },
            { text: "Q&A con cliente", nodeId: "mpN8DdClBTytBIZhrkFq-6" },
            { text: "Pianificazione", nodeId: "mpN8DdClBTytBIZhrkFq-7" },
            { text: "Quality Gate di specifiche?", nodeId: "mpN8DdClBTytBIZhrkFq-8" },
            { text: "Sviluppo in ambiente DEV", nodeId: "mpN8DdClBTytBIZhrkFq-10" },
            { text: "Static code analysis", nodeId: "mpN8DdClBTytBIZhrkFq-11" },
            { text: "Test in ambiente DEV", nodeId: "mpN8DdClBTytBIZhrkFq-12" },
            { text: "Test superati?", nodeId: "mpN8DdClBTytBIZhrkFq-13" },
            { text: "User Acceptance Test", nodeId: "mpN8DdClBTytBIZhrkFq-15" },
            { text: "UAT approvato?", nodeId: "mpN8DdClBTytBIZhrkFq-16" },
            { text: "Revisione CAB", nodeId: "mpN8DdClBTytBIZhrkFq-18" },
            { text: "Piano di rilascio", nodeId: "mpN8DdClBTytBIZhrkFq-19" },
            { text: "Rilascio in produzione", nodeId: "mpN8DdClBTytBIZhrkFq-20" },
            { text: "Post-implementation", nodeId: "mpN8DdClBTytBIZhrkFq-46" },
            { text: "Documentazione finale", nodeId: "mpN8DdClBTytBIZhrkFq-47" },
            { text: "knoledge base", nodeId: "mpN8DdClBTytBIZhrkFq-49" }
        ];
        
        textMappings.forEach(mapping => {
            // Cerca solo i nodi che non sono stati trovati dal METODO 1
            if (flowDetails[mapping.nodeId] && notFoundElements.includes(mapping.nodeId)) {
                // Cerca elementi che contengono questo testo
                const allTextElements = svgElement.querySelectorAll('text, tspan');
                for (let textEl of allTextElements) {
                    if (textEl.textContent && textEl.textContent.toLowerCase().includes(mapping.text.toLowerCase())) {
                        console.log(`🔍 Trovato per testo: "${mapping.text}" → ${mapping.nodeId}`);
                        interactiveElements.push({
                            element: textEl,
                            nodeId: mapping.nodeId,
                            data: flowDetails[mapping.nodeId]
                        });
                        // Rimuovi dalla lista dei non trovati
                        const index = notFoundElements.indexOf(mapping.nodeId);
                        if (index > -1) {
                            notFoundElements.splice(index, 1);
                        }
                        break; // Solo il primo match per evitare duplicati
                    }
                }
            }
        });
    }
    
    if (notFoundElements.length > 0) {
        console.warn(`⚠️ ${notFoundElements.length} elementi non trovati nell'SVG:`, notFoundElements);
    }
    
    return interactiveElements;
}

// Rende un elemento interattivo
function makeElementInteractive(item) {
    const { element, nodeId, data } = item;
    
    // Aggiunge attributi per il CSS
    element.setAttribute('data-clickable', 'true');
    element.setAttribute('data-node-id', nodeId);
    
    // Aggiunge il titolo per l'accessibilità
    element.setAttribute('title', data.title);
    
    // Event listeners
    element.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(`🖱️ Click su elemento: ${nodeId} - ${data.title}`);
        showNodeDetails(nodeId, data);
    });
    
    element.addEventListener('mouseenter', (e) => {
        showTooltip(e, data.title);
    });
    
    element.addEventListener('mouseleave', hideTooltip);
    
    // Accessibilità - supporto tastiera
    element.setAttribute('tabindex', '0');
    element.setAttribute('role', 'button');
    element.setAttribute('aria-label', `Visualizza dettagli: ${data.title}`);
    
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            console.log(`⌨️ Tasto premuto su elemento: ${nodeId} - ${data.title}`);
            showNodeDetails(nodeId, data);
        }
    });
    
    console.log(`🔗 Eventi aggiunti a elemento: ${nodeId}`);
}

// Mostra i dettagli di un nodo nella modale
function showNodeDetails(nodeId, data) {
    console.log(`📋 Apertura modale per: ${nodeId} - ${data.title}`);
    
    modalTitle.textContent = data.title;
    modalAttore.textContent = data.attore;
    
    // Converte i caratteri \n in <br> per l'output
    modalOutput.innerHTML = data.output.replace(/\n/g, '<br>');
    
    // Gestisce il supporto AI
    if (data.supporto_ai && data.supporto_ai.trim()) {
        // Converte i caratteri \n in <br> anche per il supporto AI
        modalSupportoAI.innerHTML = data.supporto_ai.replace(/\n/g, '<br>');
        supportoAISection.classList.remove('hidden');
        console.log(`🤖 Supporto AI presente`);
    } else {
        supportoAISection.classList.add('hidden');
        console.log(`🚫 Nessun supporto AI`);
    }
    
    // Mostra la modale
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    
    // Focus per accessibilità
    const closeButton = modal.querySelector('.close-btn');
    if (closeButton) {
        closeButton.focus();
    }
    
    // Previene lo scroll del body
    document.body.style.overflow = 'hidden';
    
    console.log(`✅ Modale aperta per: ${data.title}`);
}

// Nasconde la modale
function hideModal() {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
}

// Configura gli event listeners
function setupEventListeners() {
    // Chiusura modale
    closeModal.addEventListener('click', hideModal);
    
    // Chiusura modale cliccando fuori
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });
    
    // Chiusura modale con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            hideModal();
        }
    });
    
    // Gestione resize finestra
    window.addEventListener('resize', debounce(handleResize, 250));
}

// Gestisce il resize della finestra
function handleResize() {
    // Aggiorna il viewBox dell'SVG se necessario
    if (svgElement) {
        // Puoi aggiungere logica per ottimizzare la visualizzazione
        console.log('Window resized, SVG adjusted');
    }
}

// Mostra/nasconde il loading
function showLoading(show) {
    if (show) {
        loading.classList.remove('hidden');
    } else {
        loading.classList.add('hidden');
    }
}

// Mostra un errore
function showError(message) {
    showLoading(false);
    
    // Crea un elemento di errore
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <div style="
            background: #fee; 
            border: 1px solid #fcc; 
            border-radius: 8px; 
            padding: 1rem; 
            margin: 1rem; 
            color: #d00;
            text-align: center;
            font-weight: 500;
        ">
            <h3>⚠️ Errore</h3>
            <p>${message}</p>
            <button onclick="location.reload()" style="
                background: #d00; 
                color: white; 
                border: none; 
                padding: 0.5rem 1rem; 
                border-radius: 4px; 
                cursor: pointer;
                margin-top: 1rem;
            ">
                Ricarica Pagina
            </button>
        </div>
    `;
    
    svgContainer.appendChild(errorDiv);
}

// Tooltip semplice
let tooltipElement = null;

function showTooltip(e, text) {
    hideTooltip(); // Rimuove tooltip esistenti
    
    tooltipElement = document.createElement('div');
    tooltipElement.className = 'tooltip';
    tooltipElement.textContent = text;
    tooltipElement.style.cssText = `
        position: absolute;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        z-index: 1000;
        pointer-events: none;
        white-space: nowrap;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(tooltipElement);
    
    // Posiziona il tooltip
    updateTooltipPosition(e);
}

function updateTooltipPosition(e) {
    if (!tooltipElement) return;
    
    const rect = tooltipElement.getBoundingClientRect();
    let x = e.clientX + 10;
    let y = e.clientY - rect.height - 10;
    
    // Verifica i limiti dello schermo
    if (x + rect.width > window.innerWidth) {
        x = e.clientX - rect.width - 10;
    }
    if (y < 0) {
        y = e.clientY + 10;
    }
    
    tooltipElement.style.left = x + 'px';
    tooltipElement.style.top = y + 'px';
}

function hideTooltip() {
    if (tooltipElement) {
        tooltipElement.remove();
        tooltipElement = null;
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debug helpers (solo in development)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.debugFlow = {
        flowDetails: () => flowDetails,
        svgElement: () => svgElement,
        interactiveElements: () => findInteractiveElements(),
        testModal: (nodeId) => {
            if (flowDetails[nodeId]) {
                console.log(`🧪 Test modale per: ${nodeId}`);
                showNodeDetails(nodeId, flowDetails[nodeId]);
            } else {
                console.log('❌ Node ID non trovato:', nodeId);
                console.log('📋 ID disponibili:', Object.keys(flowDetails));
            }
        },
        testFirstNode: () => {
            const firstNodeId = Object.keys(flowDetails)[0];
            console.log(`🧪 Test primo nodo: ${firstNodeId}`);
            window.debugFlow.testModal(firstNodeId);
        },
        listAllSVGIds: () => {
            if (svgElement) {
                const allIds = Array.from(svgElement.querySelectorAll('[id]')).map(el => el.id);
                console.log('🔍 Tutti gli ID nell\'SVG:', allIds);
                return allIds;
            } else {
                console.log('❌ SVG non caricato');
                return [];
            }
        },
        simulateClick: (nodeId) => {
            const element = document.getElementById(nodeId);
            if (element) {
                console.log(`🖱️ Simulazione click su: ${nodeId}`);
                element.click();
            } else {
                console.log(`❌ Elemento ${nodeId} non trovato per simulazione click`);
            }
        }
    };
    
    console.log('🛠️ Debug helpers disponibili:');
    console.log('  - window.debugFlow.testFirstNode() // Testa il primo nodo');
    console.log('  - window.debugFlow.testModal("mpN8DdClBTytBIZhrkFq-2") // Testa nodo specifico');
    console.log('  - window.debugFlow.listAllSVGIds() // Lista tutti gli ID SVG');
    console.log('  - window.debugFlow.simulateClick("mpN8DdClBTytBIZhrkFq-2") // Simula click');
}