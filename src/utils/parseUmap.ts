import type { MapActor } from '../models/MapActor';
import { createMapActor } from '../models/MapActor';

export const normalizeVec3 = (value?: string): { x: number; y: number; z: number } => {
  if (!value) return { x: 0, y: 0, z: 0 };

  const numbers = value
    .match(/-?\d*\.?\d+(?:e[+-]?\d+)?/g)
    ?.map(Number)
    .filter((num) => Number.isFinite(num)) ?? [];

  return {
    x: numbers[0] ?? 0,
    y: numbers[1] ?? 0,
    z: numbers[2] ?? 0
  };
};

export const parseUmapText = (text: string): MapActor[] => {
  const actors: MapActor[] = [];

  const objectBlocks = [...text.matchAll(/(?:Name|ObjectName)\s*:\s*"([^"]+)"[\s\S]*?(?:(?:RelativeLocation|Location)\s*:\s*\(([^)]*)\)|(?:RelativeRotation|Rotation)\s*:\s*\(([^)]*)\)|(?:RelativeScale3D|Scale3D)\s*:\s*\(([^)]*)\))/g)];

  if (objectBlocks.length === 0) {
    const fallbackNames = [...text.matchAll(/(?:Name|ObjectName)\s*:\s*"([^"]+)"/g)];
    for (const match of fallbackNames) {
      const name = match[1];
      actors.push({
        ...createMapActor(name, 'UnrealObject'),
        source: 'fallback-import'
      });
    }
    return actors;
  }

  for (const match of objectBlocks) {
    const name = match[1] ?? `Imported_${actors.length + 1}`;
    const locationText = match[2];
    const rotationText = match[3] ?? '0, 0, 0';
    const scaleText = match[4] ?? '1, 1, 1';

    const actor: MapActor = {
      ...createMapActor(name, 'UnrealObject'),
      name,
      type: 'UnrealObject',
      source: 'umap-import',
      assetPath: name,
      position: normalizeVec3(locationText),
      rotation: normalizeVec3(rotationText),
      scale: normalizeVec3(scaleText)
    };

    actors.push(actor);
  }

  return actors;
};

export const exportObjectsToJson = (actors: MapActor[]) => JSON.stringify(actors, null, 2);
