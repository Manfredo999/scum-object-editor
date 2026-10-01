export type EditorObject = {
  id: string;
  name: string;
  type: string;
  source: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  rotation: {
    x: number;
    y: number;
    z: number;
  };
  scale: {
    x: number;
    y: number;
    z: number;
  };
};

export const createEmptyObject = (name = 'NewObject'): EditorObject => ({
  id: crypto.randomUUID(),
  name,
  type: 'StaticMesh',
  source: 'imported',
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  scale: { x: 1, y: 1, z: 1 }
});
