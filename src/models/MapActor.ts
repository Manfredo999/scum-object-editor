export type Vec3 = {
  x: number;
  y: number;
  z: number;
};

export type MapActor = {
  id: string;
  name: string;
  type: string;
  source: string;
  assetPath: string;
  layer: string;
  isVisible: boolean;
  isLocked: boolean;
  position: Vec3;
  rotation: Vec3;
  scale: Vec3;
};

export const createMapActor = (name = 'NewObject', type = 'Custom'): MapActor => ({
  id: crypto.randomUUID(),
  name,
  type,
  source: 'manual',
  assetPath: '',
  layer: 'default',
  isVisible: true,
  isLocked: false,
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  scale: { x: 1, y: 1, z: 1 }
});
