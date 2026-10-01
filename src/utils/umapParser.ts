import type { EditorObject } from '../types';

export const parseUmapText = (text: string): EditorObject[] => {
  const objects: EditorObject[] = [];
  const regex = /ObjectName\s*:\s*"([^"]+)"|ObjectPath\s*:\s*"([^"]+)"|RelativeLocation\s*:\s*\(([^)]*)\)|RelativeRotation\s*:\s*\(([^)]*)\)|RelativeScale3D\s*:\s*\(([^)]*)\)|Location\s*:\s*\(([^)]*)\)|Rotation\s*:\s*\(([^)]*)\)|Scale3D\s*:\s*\(([^)]*)\)/g;

  const matches = [...text.matchAll(regex)];

  for (let i = 0; i < matches.length; i += 1) {
    const match = matches[i];
    const name = match[1] ?? match[2] ?? `Object_${i}`;
    const location = match[3] ?? match[6];
    const rotation = match[4] ?? match[7];
    const scale = match[5] ?? match[8];

    if (!location && !rotation && !scale) continue;

    const toVec3 = (input?: string) => {
      if (!input) return { x: 0, y: 0, z: 0 };
      const values = input
        .split(',')
        .map((part) => Number(part.trim().replace(/[A-Za-z]/g, '').replace(/\s+/g, '')))
        .filter((part) => Number.isFinite(part));

      return {
        x: values[0] ?? 0,
        y: values[1] ?? 0,
        z: values[2] ?? 0
      };
    };

    const obj: EditorObject = {
      id: crypto.randomUUID(),
      name,
      type: 'UnrealObject',
      source: 'umap',
      position: toVec3(location),
      rotation: toVec3(rotation),
      scale: toVec3(scale)
    };

    objects.push(obj);
  }

  if (objects.length === 0) {
    const fallback = text
      .match(/([A-Za-z0-9_]+)\s*:\s*\{[^\n]*?RelativeLocation\s*:\s*\(([^)]*)\)/g);

    if (fallback) {
      return fallback.map((entry, index) => ({
        id: crypto.randomUUID(),
        name: `Imported_${index + 1}`,
        type: 'UnrealObject',
        source: 'umap',
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 }
      }));
    }
  }

  return objects;
};

export const exportObjectsToJson = (objects: EditorObject[]) => {
  return JSON.stringify(objects, null, 2);
};
