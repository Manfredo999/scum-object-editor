import type { MapActor } from '../models/MapActor';

export type ObjectListProps = {
  objects: MapActor[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export function ObjectList({ objects, selectedId, onSelect }: ObjectListProps) {
  return (
    <ul className="object-list">
      {objects.map((obj) => (
        <li
          key={obj.id}
          className={obj.id === selectedId ? 'selected' : ''}
          onClick={() => onSelect(obj.id)}
        >
          <strong>{obj.name}</strong>
          <span>{obj.type}</span>
          <small>
            X {obj.position.x.toFixed(1)} / Y {obj.position.y.toFixed(1)} / Z {obj.position.z.toFixed(1)}
          </small>
        </li>
      ))}
    </ul>
  );
}
