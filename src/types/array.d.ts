interface Array<T> {
  parse2D(offset: number): T[][];
  remove<V = keyof T>(value: any, field: V): T | undefined;
  parseCollisions(
    data: ReturnType<typeof Array.prototype.parse2D>,
    size: number
  ): CollisionBlock[];
}

interface Side {
  t: number;
  b: number;
  l: number;
  r: number;
  centerX: number;
  centerY: number;
}

interface CollisionBlock {
  position: { x: number; y: number };
  size: number;
  draw: (hidden: boolean) => void;
  get side(): Side;
}
