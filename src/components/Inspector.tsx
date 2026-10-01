import type { MapActor } from '../models/MapActor';

export type InspectorProps = {
  selected: MapActor | null;
  onUpdate: (patch: Partial<MapActor>) => void;
};

export function Inspector({ selected, onUpdate }: InspectorProps) {
  if (!selected) {
    return <section className="editor-panel"><p>Kein Objekt ausgewählt.</p></section>;
  }

  const updateVec3 = (key: 'position' | 'rotation' | 'scale', axis: 'x' | 'y' | 'z', value: number) => {
    const current = selected[key];
    onUpdate({
      [key]: {
        ...current,
        [axis]: value
      }
    } as Partial<MapActor>);
  };

  return (
    <section className="editor-panel">
      <div className="field-row">
        <label>
          Name
          <input value={selected.name} onChange={(e) => onUpdate({ name: e.target.value })} />
        </label>
        <label>
          Typ
          <input value={selected.type} onChange={(e) => onUpdate({ type: e.target.value })} />
        </label>
      </div>

      <div className="field-grid">
        <div className="group">
          <h3>Position</h3>
          <label>X<input type="number" value={selected.position.x} onChange={(e) => updateVec3('position', 'x', Number(e.target.value))} /></label>
          <label>Y<input type="number" value={selected.position.y} onChange={(e) => updateVec3('position', 'y', Number(e.target.value))} /></label>
          <label>Z<input type="number" value={selected.position.z} onChange={(e) => updateVec3('position', 'z', Number(e.target.value))} /></label>
        </div>

        <div className="group">
          <h3>Rotation</h3>
          <label>X<input type="number" value={selected.rotation.x} onChange={(e) => updateVec3('rotation', 'x', Number(e.target.value))} /></label>
          <label>Y<input type="number" value={selected.rotation.y} onChange={(e) => updateVec3('rotation', 'y', Number(e.target.value))} /></label>
          <label>Z<input type="number" value={selected.rotation.z} onChange={(e) => updateVec3('rotation', 'z', Number(e.target.value))} /></label>
        </div>

        <div className="group">
          <h3>Skala</h3>
          <label>X<input type="number" step="0.1" value={selected.scale.x} onChange={(e) => updateVec3('scale', 'x', Number(e.target.value))} /></label>
          <label>Y<input type="number" step="0.1" value={selected.scale.y} onChange={(e) => updateVec3('scale', 'y', Number(e.target.value))} /></label>
          <label>Z<input type="number" step="0.1" value={selected.scale.z} onChange={(e) => updateVec3('scale', 'z', Number(e.target.value))} /></label>
        </div>
      </div>
    </section>
  );
}
