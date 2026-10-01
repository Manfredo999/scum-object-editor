import type { MapActor } from '../models/MapActor';
import { createMapActor } from '../models/MapActor';

export type EditorState = {
  objects: MapActor[];
  selectedId: string | null;
};

export const createDefaultEditorState = (): EditorState => ({
  objects: [
    { ...createMapActor('Bunker_01', 'Building'), source: 'demo', assetPath: '/Game/Buildings/Bunker_01' },
    { ...createMapActor('Rock_01', 'Prop'), source: 'demo', assetPath: '/Game/Props/Rock_01' },
    { ...createMapActor('Tree_01', 'Nature'), source: 'demo', assetPath: '/Game/Nature/Tree_01' }
  ],
  selectedId: null
});

export const getSelectedObject = (state: EditorState) =>
  state.objects.find((obj) => obj.id === state.selectedId) ?? state.objects[0] ?? null;

export const addObject = (state: EditorState, object: MapActor): EditorState => ({
  ...state,
  objects: [...state.objects, object],
  selectedId: object.id
});

export const updateObject = (state: EditorState, id: string, patch: Partial<MapActor>): EditorState => ({
  ...state,
  objects: state.objects.map((obj) => (obj.id === id ? { ...obj, ...patch } : obj))
});

export const deleteObject = (state: EditorState, id: string): EditorState => {
  const nextObjects = state.objects.filter((obj) => obj.id !== id);
  const nextSelected = nextObjects[0]?.id ?? null;

  return {
    ...state,
    objects: nextObjects,
    selectedId: nextSelected
  };
};

export const duplicateObject = (state: EditorState, id: string): EditorState => {
  const original = state.objects.find((obj) => obj.id === id);
  if (!original) return state;

  const copy: MapActor = {
    ...original,
    id: crypto.randomUUID(),
    name: `${original.name}_copy`,
    position: {
      x: original.position.x + 50,
      y: original.position.y + 50,
      z: original.position.z
    }
  };

  return {
    ...state,
    objects: [...state.objects, copy],
    selectedId: copy.id
  };
};
