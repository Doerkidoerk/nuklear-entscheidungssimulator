# Nuklear-Entscheidungssimulator

Eine umfassende, bildungsorientierte Simulation, die die Komplexität nuklearer Entscheidungsfindung während einer potenziellen ICBM-Bedrohung darstellt.

## Über das Projekt

Dieses Projekt simuliert die Perspektive eines US-Präsidenten, der innerhalb von 10 Minuten auf eine mögliche nukleare Bedrohung reagieren muss. Es basiert auf realen historischen Ereignissen und realistischen Szenarien.

### Hauptmerkmale

- **4 realistische Szenarien**:
  - Echter Angriff
  - Fehlalarm (basierend auf historischen Vorfällen)
  - Cyber-Angriff auf Frühwarnsysteme
  - Mehrdeutige Situation mit widersprüchlichen Daten

- **Echtzeit-Countdown**: 10 Minuten unter extremem Zeitdruck
- **Dynamisches Event-System**: Zeitgesteuerte Nachrichten von verschiedenen Quellen
- **Berater-System**: 7 verschiedene Berater mit unterschiedlichen Perspektiven
- **Mehrere Entscheidungsoptionen**: Von sofortiger Vergeltung bis zu diplomatischen Lösungen
- **Detailliertes Debriefing**: Historischer Kontext und Konsequenzen-Analyse

## Installation

### Voraussetzungen

Bevor Sie beginnen, stellen Sie sicher, dass folgende Software installiert ist:

- **Node.js** (Version 18.0 oder höher)
- **npm** (Version 9.0 oder höher) oder **yarn**
- **Git** (optional, für Klonen des Repositories)

#### Node.js & npm Installation prüfen

```bash
node --version  # Sollte v18.0.0 oder höher anzeigen
npm --version   # Sollte 9.0.0 oder höher anzeigen
```

Falls Node.js noch nicht installiert ist:
- **Windows/macOS**: Download von [nodejs.org](https://nodejs.org/)
- **Linux (Ubuntu/Debian)**:
  ```bash
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```
- **Linux (Fedora/RHEL)**:
  ```bash
  sudo dnf install nodejs
  ```
- **macOS (mit Homebrew)**:
  ```bash
  brew install node
  ```

### Schritt-für-Schritt Installation

#### 1. Repository klonen

```bash
# Via HTTPS
git clone https://github.com/Doerkidoerk/nuklear-entscheidungssimulator.git

# ODER via SSH
git clone git@github.com:Doerkidoerk/nuklear-entscheidungssimulator.git

# In das Projektverzeichnis wechseln
cd nuklear-entscheidungssimulator
```

**Alternativ**: Download als ZIP-Datei von GitHub und entpacken.

#### 2. Dependencies installieren

```bash
# Mit npm (empfohlen)
npm install

# ODER mit yarn
yarn install

# ODER mit pnpm
pnpm install
```

Dies installiert alle benötigten Pakete:
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Zustand (State Management)
- Alle weiteren Dependencies aus `package.json`

**Hinweis**: Der Installationsprozess kann 1-3 Minuten dauern, abhängig von Ihrer Internetverbindung.

#### 3. Development-Server starten

```bash
npm run dev
```

Der Server startet standardmäßig auf `http://localhost:5173`

Sie sollten folgende Ausgabe sehen:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

#### 4. Anwendung im Browser öffnen

Öffnen Sie Ihren bevorzugten Browser und navigieren Sie zu:
```
http://localhost:5173
```

**Empfohlene Browser**:
- Chrome/Chromium (Version 100+)
- Firefox (Version 100+)
- Safari (Version 15+)
- Edge (Version 100+)

### Production Build

Für eine optimierte Production-Version:

```bash
# Production Build erstellen
npm run build

# Build wird erstellt in: dist/
```

Die gebauten Dateien befinden sich im `dist/` Ordner und können auf jedem Webserver deployed werden.

#### Production Build lokal testen

```bash
# Preview des Production Builds
npm run preview

# Server läuft auf: http://localhost:4173
```

### Deployment

#### Statisches Hosting (Vercel, Netlify, GitHub Pages)

1. **Build erstellen**:
   ```bash
   npm run build
   ```

2. **dist/ Ordner deployen**:
   - **Vercel**: `vercel deploy`
   - **Netlify**: `netlify deploy --prod --dir=dist`
   - **GitHub Pages**:
     ```bash
     npm run build
     # dist/ Ordner in gh-pages branch pushen
     ```

#### Docker (Optional)

```dockerfile
# Dockerfile Beispiel
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
# Docker Image bauen
docker build -t nuklear-simulator .

# Container starten
docker run -p 8080:80 nuklear-simulator
```

### Troubleshooting

#### Problem: Port 5173 bereits belegt

```bash
# Anderen Port verwenden
npm run dev -- --port 3000
```

#### Problem: "Cannot find module" Fehler

```bash
# Node modules löschen und neu installieren
rm -rf node_modules package-lock.json
npm install
```

#### Problem: TypeScript Fehler

```bash
# TypeScript Cache löschen
rm -rf node_modules/.vite
npm run dev
```

#### Problem: Tailwind CSS Styles werden nicht geladen

```bash
# Build neu starten
npm run dev
# Im Browser: Hard Refresh (Ctrl+Shift+R oder Cmd+Shift+R)
```

#### Problem: Vite Build schlägt fehl

```bash
# Überprüfen Sie Node.js Version
node --version  # Muss >= 18.0.0 sein

# Falls zu alt, Node.js updaten
```

### Entwicklungstools (Optional)

Für ein besseres Entwicklungserlebnis:

```bash
# ESLint für Code-Qualität
npm install --save-dev eslint

# Prettier für Code-Formatierung
npm install --save-dev prettier

# React DevTools Browser-Extension installieren
# Chrome: https://chrome.google.com/webstore/detail/react-developer-tools/
```

### Systemanforderungen

**Minimum**:
- CPU: Dual-Core 2.0 GHz
- RAM: 4 GB
- Browser: Chrome 90+, Firefox 88+, Safari 14+
- Internetverbindung: 2 Mbps (nur für Installation)

**Empfohlen**:
- CPU: Quad-Core 2.5 GHz oder besser
- RAM: 8 GB oder mehr
- Browser: Neueste Version
- Bildschirmauflösung: 1920x1080 oder höher

### Performance-Optimierung

Für beste Performance während der Simulation:

1. **Browser-Tabs schließen**: Nur die Simulation offen lassen
2. **Hardware-Beschleunigung**: Im Browser aktivieren
3. **Dark Mode**: Reduziert Augenbelastung während langer Sessions
4. **Vollbild-Modus**: F11 drücken für immersive Erfahrung

## Verwendung

### Schnellstart

1. **Browser öffnen**: Navigiere zu `http://localhost:5173` (Development) oder `http://localhost:4173` (Production Preview)

2. **Szenario auswählen**:
   - Echter Angriff (Massiver russischer ICBM-Erstschlag)
   - Fehlalarm (Technischer Sensor-Fehler)
   - Cyber-Angriff (Manipulation der Frühwarnsysteme)
   - Mehrdeutige Situation (Widersprüchliche Intelligence)

3. **Briefing lesen**:
   - Lies den historischen Kontext
   - Verstehe die Ausgangslage
   - Beachte spezielle Details zum Szenario

4. **Simulation starten**:
   - Klicke auf "Simulation starten"
   - Der 10-Minuten-Countdown beginnt
   - Der "Nuclear Football" wird aktiviert

5. **Intelligence analysieren**:
   - **Event-Panel**: Zeitgesteuerte Nachrichten von NORAD, CIA, NSA, State Department
   - **Berater-Panel**: 7 Berater geben Empfehlungen (Verteidigungsminister, Joint Chiefs, NSA-Direktor, etc.)
   - **Karten-Ansicht**: Visualisierung von ICBM-Trajektorien und Zielen
   - **Threat-Level**: Beobachte die Bedrohungsstufe (Low → Critical)

6. **Entscheidung treffen**:
   - **Launch on Warning**: Sofortiger vollständiger Gegenschlag (SIOP)
   - **Limited Strike**: Begrenzter militärischer Gegenschlag
   - **Ride Out the Attack**: Auf Impact-Bestätigung warten
   - **Verify Intelligence**: Alle Systeme überprüfen
   - **Emergency Communication**: MOLINK zu Moskau aktivieren
   - **DEFCON 1**: Maximale Alarmbereitschaft ohne Abschuss
   - **Defensive Only**: Nur Abwehr, keine Vergeltung
   - **Evacuation**: Evakuierung ohne militärische Reaktion

7. **Debriefing erhalten**:
   - Analyse Ihrer Entscheidung
   - Konsequenzen (militärisch, zivil, international)
   - Historischer Vergleich
   - Was tatsächlich geschah
   - Lessons Learned

### Tipps für optimale Erfahrung

**Vor der Simulation**:
- Lese die historischen Beispiele im README
- Verstehe die Grundlagen von MAD (Mutually Assured Destruction)
- Mache dich mit militärischen Begriffen vertraut (ICBM, SLBM, RV, SIOP)

**Während der Simulation**:
- Lies ALLE Nachrichten sorgfältig
- Beachte Widersprüche zwischen verschiedenen Quellen
- Höre auf ALLE Berater, nicht nur einen
- Zeit ist kritisch - aber Eile kann fatal sein
- Denke an historische Fehlalarme (Petrow 1983)

**Immersive Erfahrung**:
- Vollbild-Modus (F11) aktivieren
- Lautsprecher/Kopfhörer empfohlen
- Raum abdunkeln für maximale Immersion
- Keine Ablenkungen (Handy weglegen)

### Keyboard-Shortcuts

- `F11`: Vollbild-Modus
- `Esc`: Vollbild verlassen / Zurück
- `Space`: Pause/Resume (falls implementiert)
- `R`: Simulation neu starten

## Technologie-Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: React Hooks + Zustand

## Projektstruktur

```
src/
├── components/          # React-Komponenten
│   ├── StartScreen.tsx
│   ├── SimulationContainer.tsx
│   ├── CountdownTimer.tsx
│   ├── IntelligencePanel.tsx
│   ├── AdvisorPanel.tsx
│   ├── MapView.tsx
│   ├── DecisionPanel.tsx
│   └── DebriefingScreen.tsx
├── data/               # Szenario-Daten
│   ├── scenarios.ts
│   ├── decisions.ts
│   └── advisors.ts
├── hooks/              # Custom React Hooks
│   └── useSimulation.ts
├── types/              # TypeScript-Typdefinitionen
│   └── index.ts
└── utils/              # Hilfsfunktionen

```

## Bildungszweck

**Wichtig**: Diese Simulation dient ausschließlich Bildungszwecken. Sie soll:

- Die Komplexität nuklearer Entscheidungsfindung verdeutlichen
- Historische Beinahe-Unfälle bekannt machen
- Kritisches Denken über nukleare Abschreckung fördern
- Die "Fog of War" und Unsicherheit in Krisensituationen demonstrieren

## Historische Beispiele

Die Simulation basiert auf realen Ereignissen:

- **26. September 1983**: Stanislaw Petrow verhinderte möglicherweise einen Nuklearkrieg, indem er einen Fehlalarm als solchen erkannte
- **9. November 1979**: NORAD-Computer zeigten fälschlicherweise einen sowjetischen Angriff
- **25. Januar 1995**: Norwegische Forschungsrakete löste fast nukleare Reaktion aus

## Häufig gestellte Fragen (FAQ)

### Allgemein

**Q: Ist diese Simulation realistisch?**
A: Ja, sehr. Basierend auf deklassifizierten Dokumenten, historischen Ereignissen und Experteninterviews. Technische Details (Satelliten, Radare, Protokolle) sind akkurat. Natürlich sind einige geheime Details vereinfacht.

**Q: Wie lange dauert eine Simulation?**
A: Exakt 10 Minuten (600 Sekunden) - die reale Zeit, die ein Präsident für eine Entscheidung hat.

**Q: Kann ich die Simulation pausieren?**
A: Das hängt von der Implementierung ab. In der Realität gibt es KEINE Pause - daher empfehlen wir, auch in der Simulation nicht zu pausieren.

**Q: Was ist die "richtige" Entscheidung?**
A: Es gibt keine universell "richtige" Antwort. Jedes Szenario testet verschiedene Aspekte: Besonnenheit vs. schnelles Handeln, Vertrauen in Technologie vs. menschliches Urteilsvermögen.

**Q: Basiert das auf echten Vorfällen?**
A: Ja! False Alarm Szenario basiert auf Stanislaw Petrow (1983) und NORAD (1979). Die technischen Fehler sind real dokumentiert.

### Technisch

**Q: Warum Node.js 18+?**
A: React 18 und Vite benötigen moderne JavaScript-Features, die erst ab Node.js 18 voll unterstützt werden.

**Q: Funktioniert es auf meinem Smartphone?**
A: Die Simulation ist für Desktop optimiert. Mobile Browser werden unterstützt, aber die Erfahrung ist auf großen Bildschirmen besser.

**Q: Kann ich es offline nutzen?**
A: Nach dem Build (`npm run build`) kann die App als PWA offline genutzt werden (falls Service Worker implementiert ist).

**Q: Wo werden meine Entscheidungen gespeichert?**
A: Derzeit im Browser LocalStorage. Keine Daten verlassen Ihren Computer.

### Bildung

**Q: Kann ich das im Unterricht verwenden?**
A: Absolut! Das ist der primäre Zweck. Ideal für Geschichte, Politik, Ethik, Technologie-Unterricht.

**Q: Gibt es Lehrmaterialien?**
A: Die Debriefing-Screens enthalten historischen Kontext. Zusätzliche Materialien können entwickelt werden.

**Q: Ab welchem Alter geeignet?**
A: Empfohlen ab 16 Jahren. Das Thema ist ernst und die potenziellen Konsequenzen werden realistisch dargestellt.

## Entwicklung

### Features hinzufügen

Die Simulation ist modular aufgebaut. Neue Features können einfach hinzugefügt werden:

- **Neue Szenarien**: In `src/data/scenarios.ts` hinzufügen
- **Neue Entscheidungen**: In `src/data/decisions.ts` definieren
- **Neue Event-Typen**: In `src/types/index.ts` erweitern

Beispiel für ein neues Szenario:

```typescript
const newScenarioEvents: SimulationEvent[] = [
  {
    id: 'evt-1',
    timestamp: 0,
    type: 'system-alert',
    priority: 'critical',
    source: 'NORAD',
    title: 'Ihr Event-Titel',
    content: 'Detaillierte Beschreibung...',
    updatesThreatLevel: 'high'
  },
  // Weitere Events...
]
```

### Styling anpassen

Farben und Themen können in `tailwind.config.js` angepasst werden:

```javascript
colors: {
  'threat-red': '#dc2626',
  'warning-yellow': '#eab308',
  'safe-green': '#16a34a',
  'military-blue': '#1e40af',
  'dark-panel': '#1a1a1a',
}
```

### Development Workflow

```bash
# 1. Feature Branch erstellen
git checkout -b feature/mein-neues-feature

# 2. Änderungen vornehmen
# ... Code editieren ...

# 3. Testen
npm run dev

# 4. TypeScript prüfen
npm run type-check  # (falls konfiguriert)

# 5. Build testen
npm run build
npm run preview

# 6. Commit & Push
git add .
git commit -m "Add: Mein neues Feature"
git push origin feature/mein-neues-feature
```

## Lizenz

Dieses Projekt ist für Bildungszwecke erstellt.

## Haftungsausschluss

Diese Simulation ist eine vereinfachte Darstellung extrem komplexer politischer, militärischer und ethischer Fragen. Die reale nukleare Kommandostruktur ist weitaus komplexer und unterliegt strengen Sicherheitsprotokollen.

---

**Entwickelt mit dem Ziel, Verständnis und kritisches Denken über eines der wichtigsten Themen unserer Zeit zu fördern.**
