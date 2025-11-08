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

```bash
# Dependencies installieren
npm install

# Development-Server starten
npm run dev

# Für Production builden
npm run build

# Production-Build testen
npm run preview
```

## Verwendung

1. Öffne http://localhost:3000 im Browser
2. Wähle ein Szenario aus
3. Lies das Briefing sorgfältig
4. Starte die Simulation
5. Analysiere eingehende Nachrichten und Berater-Empfehlungen
6. Treffe eine Entscheidung innerhalb von 10 Minuten
7. Erhalte ein detailliertes Debriefing

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

## Entwicklung

### Features hinzufügen

Die Simulation ist modular aufgebaut. Neue Features können einfach hinzugefügt werden:

- **Neue Szenarien**: In `src/data/scenarios.ts` hinzufügen
- **Neue Entscheidungen**: In `src/data/decisions.ts` definieren
- **Neue Event-Typen**: In `src/types/index.ts` erweitern

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

## Lizenz

Dieses Projekt ist für Bildungszwecke erstellt.

## Haftungsausschluss

Diese Simulation ist eine vereinfachte Darstellung extrem komplexer politischer, militärischer und ethischer Fragen. Die reale nukleare Kommandostruktur ist weitaus komplexer und unterliegt strengen Sicherheitsprotokollen.

---

**Entwickelt mit dem Ziel, Verständnis und kritisches Denken über eines der wichtigsten Themen unserer Zeit zu fördern.**
