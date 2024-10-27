# CrypTracker

CrypTracker è un'applicazione full-stack sviluppata come progetto Capstone nell'ultimo mese del corso Full Stack Developer con Epicode. Questo progetto consente agli utenti di monitorare i propri investimenti in criptovalute e offre funzionalità avanzate per utenti premium e amministratori, sfruttando tecnologie come Laravel per il backend e React per il frontend.

### Caratteristiche Principali

#### Gestione Utenti a Tre Livelli
- **Base:** Accesso alle funzionalità di tracciamento degli investimenti, come il monitoraggio delle transazioni e delle performance in criptovalute.
- **Premium:** Include tutte le funzionalità dell’utente base e aggiunge strumenti di analisi storica, inclusi grafici dettagliati dell'andamento del wallet personale. Il passaggio al livello premium richiede un pagamento in criptovaluta e attiva il livello premium per un anno.
- **Admin:** Ha accesso a statistiche globali come il numero e la tipologia di utenti, con funzionalità avanzate per la gestione dell’applicazione.

#### Integrazione Blockchain e Smart Contract
Il backend di CrypTracker è integrato con uno smart contract distribuito sulla rete Ethereum Layer 2 (Arbitrum). Questo contratto gestisce le transazioni di upgrade per gli utenti premium. Una volta effettuato il pagamento, un servizio di polling lato backend verifica lo stato della transazione e attiva l’abbonamento premium per l’utente per una durata di un anno.  
**Link allo Smart Contract:** [Visualizza il codice su Arbiscan](https://arbiscan.io/address/0x0d458981a1d373ae24376d69a75d39b87ad6ce54#code)

### Tecnologie e Architettura

#### Backend
- **Framework:** Laravel
- **Funzionalità chiave:** Autenticazione e autorizzazione sicura, gestione utenti e ruoli, polling per il monitoraggio delle transazioni blockchain e API RESTful per il frontend.
- **Database:** MySQL
- **Smart Contract:** Integrazione con Ethereum L2 (Arbitrum)

#### Frontend
- **Framework:** React
- **Interfaccia:** Pulita e responsive, ottimizzata sia per desktop che per dispositivi mobili.
- **Grafici e Visualizzazione Dati:** Implementazione di grafici interattivi per l'analisi storica e delle performance di investimento, utilizzando una libreria specializzata.
- **Interazione API:** Gestione avanzata dello stato dell'applicazione e connessione con il backend per fornire dati aggiornati in tempo reale.

### Come Iniziare
Dopo aver clonato il repository:
1. **Backend:** Configura il database e installa le dipendenze per Laravel. Assicurati di impostare le chiavi per la comunicazione con l'API blockchain.
2. **Frontend:** Installa le dipendenze React e avvia l'applicazione locale.
