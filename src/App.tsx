import { useMemo, useState } from 'react';
import type { EditorObject } from './types';
import { createEmptyObject } from './types';
import { exportObjectsToJson, parseUmapText } from './utils/umapParser';

const createObjectFromImported = (name: string, type: string): EditorObject => ({
  ...createEmptyObject(name),
  type
});

export default function App() {
  const [objects, setObjects] = useState<EditorObject[]>([
    createObjectFromImported('Bunker_01', 'Building'),
    createObjectFromImported('Rock_01', 'Prop'),
    createObjectFromImported('Tree_01', 'Nature')
  ]);

  const [selectedId, setSelectedId] = useState<string>(objects[0]?.id ?? '');

  const selected = useMemo(
    () => objects.find((obj) => obj.id === selectedId) ?? objects[0],
    [objects, selectedId]
  );

  const updateSelected = (patch: Partial<EditorObject>) => {
    if (!selected) return;

    setObjects((prev) =>
      prev.map((obj) => (obj.id === selected.id ? { ...obj, ...patch } : obj))
    );
  };

  const updatePosition = (axis: 'x' | 'y' | 'z', value: number) => {
    if (!selected) return;
    const updated = {
      ...selected,
      position: {
        ...selected.position,
        [axis]: value
      }
    };
    updateSelected(updated);
  };

  const updateRotation = (axis: 'x' | 'y' | 'z', value: number) => {
    if (!selected) return;
    const updated = {
      ...selected,
      rotation: {
        ...selected.rotation,
        [axis]: value
      }
    };
    updateSelected(updated);
  };

  const updateScale = (axis: 'x' | 'y' | 'z', value: number) => {
    if (!selected) return;
    const updated = {
      ...selected,
      scale: {
        ...selected.scale,
        [axis]: value
      }
    };
    updateSelected(updated);
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);

    const imported: EditorObject[] = [];

    for (const file of files) {
      const text = await file.text();
      const parsed = parseUmapText(text);
      imported.push(...parsed);
    }

    if (imported.length > 0) {
      setObjects((prev) => [...prev, ...imported]);
      setSelectedId(imported[0].id);
    }
  };

  const handleAddNewObject = () => {
    const next = createObjectFromImported(`NewObject_${objects.length + 1}`, 'Custom');
    setObjects((prev) => [...prev, next]);
    setSelectedId(next.id);
  };

  const handleDeleteSelected = () => {
    if (!selected) return;
    setObjects((prev) => prev.filter((obj) => obj.id !== selected.id));
    setSelectedId(objects.find((obj) => obj.id !== selected.id)?.id ?? '');
  };

  const handleDuplicateSelected = () => {
    if (!selected) return;
    const duplicate: EditorObject = {
      ...selected,
      id: crypto.randomUUID(),
      name: `${selected.name}_copy`,
      position: {
        x: selected.position.x + 50,
        y: selected.position.y + 50,
        z: selected.position.z
      }
    };

    setObjects((prev) => [...prev, duplicate]);
    setSelectedId(duplicate.id);
  };

  const handleExport = () => {
    const json = exportObjectsToJson(objects);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');

    anchor.href = url;
    anchor.download = 'scum-objects-export.json';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="toolbar">
          <button onClick={handleAddNewObject}>+ Objekt</button>
          <button onClick={handleDuplicateSelected}>Duplizieren</button>
          <button onClick={handleDeleteSelected}>Löschen</button>
          <button onClick={handleExport}>Export</button>
        </div>

        <label className="import-box">
          <span>Import (.umap / .txt / .json)</span>
          <input type="file" multiple onChange={handleImport} />
        </label>

        <ul className="object-list">
          {objects.map((obj) => (
            <li
              key={obj.id}
              className={obj.id === selected?.id ? 'selected' : ''}
              onClick={() => setSelectedId(obj.id)}
            >
              <strong>{obj.name}</strong>
              <span>{obj.type}</span>
              <small>
                X {obj.position.x.toFixed(1)} / Y {obj.position.y.toFixed(1)} / Z {obj.position.z.toFixed(1)}
              </small>
            </li>
          ))}
        </ul>
      </aside>

      <main className="canvas-panel">
        <div className="topbar">
          <h1>SCUM Object Editor</h1>
          <span>{objects.length} Objekte</span>
        </div>

        {selected && (
          <section className="editor-panel">
            <div className="field-row">
              <label>
                Name
                <input
                  value={selected.name}
                  onChange={(e) => updateSelected({ name: e.target.value })}
                />
              </label>
              <label>
                Typ
                <input
                  value={selected.type}
                  onChange={(e) => updateSelected({ type: e.target.value })}
                />
              </label>
            </div>

            <div className="field-grid">
              <div className="group">
                <h3>Position</h3>
                <label>X<input type="number" value={selected.position.x} onChange={(e) => updatePosition('x', Number(e.target.value))} /></label>
                <label>Y<input type="number" value={selected.position.y} onChange={(e) => updatePosition('y', Number(e.target.value))} /></label>
                <label>Z<input type="number" value={selected.position.z} onChange={(e) => updatePosition('z', Number(e.target.value))} /></label>
              </div>

              <div className="group">
                <h3>Rotation</h3>
                <label>X<input type="number" value={selected.rotation.x} onChange={(e) => updateRotation('x', Number(e.target.value))} /></label>
                <label>Y<input type="number" value={selected.rotation.y} onChange={(e) => updateRotation('y', Number(e.target.value))} /></label>
                <label>Z<input type="number" value={selected.rotation.z} onChange={(e) => updateRotation('z', Number(e.target.value))} /></label>
              </div>

              <div className="group">
                <h3>Skala</h3>
                <label>X<input type="number" step="0.1" value={selected.scale.x} onChange={(e) => updateScale('x', Number(e.target.value))} /></label>
                <label>Y<input type="number" step="0.1" value={selected.scale.y} onChange={(e) => updateScale('y', Number(e.target.value))} /></label>
                <label>Z<input type="number" step="0.1" value={selected.scale.z} onChange={(e) => updateScale('z', Number(e.target.value))} /></label>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
