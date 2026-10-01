# SCUM Object Editor

Ein Prototyp für einen SCUM-Objekt-Editor, der:

- Unreal-Map-Dateien (`.umap`, `.txt`, `.json`) importieren kann
- Objekte erkennt und in einer Liste anzeigt
- X, Y, Z, Rotation und Skalierung bearbeitet
- Objekte verschiebt, löscht und dupliziert
- als JSON exportiert
- für spätere echte SCUM-Map-Integration erweitert werden kann

## Ziele

- Objekte statt nur Gebäude bearbeiten
- Import von SCUM-Map-Daten
- X/Y/Z-Transformationen
- Objekt-Erkennung aus Unreal-Map-Strukturen
- Export in ein Editor-Format

## Aktueller Stand

Dies ist ein funktionierender UI-Prototyp. Er analysiert `.umap`-Textdaten und erkennt Objekte mit Position, Rotation und Skalierung. Der direkte Export in das SCUM-Gameformat ist nicht automatisch möglich, da das genaue Spielformat je nach SCUM-Version und Modding-Workflow variiert.

## Schnellstart

```bash
npm install
npm run dev
```

## Projektstruktur

```text
src/
  App.tsx
  main.tsx
  styles.css
  types.ts
  utils/umapParser.ts
```

## Hinweise

- Die App liest Unreal-Engine-Textdaten und versucht, Objekte zu extrahieren.
- Für echte SCUM-Map-Integration müssen die exacten PAK-/UMAP-Daten der jeweiligen Spielversion analysiert werden.
- Original-Spieldateien werden never überschrieben; nur eigene Exporte werden erstellt.
