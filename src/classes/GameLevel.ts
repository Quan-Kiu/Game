import { Position } from "../types/position";
import { Global } from "./Global";
import { Player } from "./Player";
import { Sprite } from "./Sprite";

export interface GameLevelData {
  path: string;
  name: string;
  id: string;
  no: number;
  door: {
    next: Position;
    prev: Position;
  };
  collisions: number[];
  collisionOffset: number;
  collisionSize: number;
  bots: Player[];
}
export class CollisionBlock {
  position: Position;
  size: number;
  constructor(data: Omit<CollisionBlock, "draw" | "side">) {
    Object.assign(this, data);
  }
  get side() {
    return {
      t: this.position.y,
      b: this.position.y + this.size,
      l: this.position.x,
      r: this.position.x + this.size,
      centerX: this.position.x + this.size / 2,
      centerY: this.position.y + this.size / 2,
    };
  }
  draw(hidden = true) {
    if (!hidden) {
      Global.ctx.fillStyle = "rgba(255, 0, 0,0)";
    }
    Global.ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
  }
}

export class GameLevel
  extends Sprite
  implements Omit<GameLevelData, "collisions">
{
  name: string;
  path: string;
  no: number;
  id: string;
  bots: Player[];
  collisionSize: number;
  collisionOffset: number;
  collisions: CollisionBlock[];
  constructor(data: GameLevelData) {
    super({ image: data.path, position: { x: 0, y: 0 } });
    Object.assign(this, data);
    const collisions2D = this.collisions.parse2D(data.collisionOffset);
    const collisions = this.collisions.parseCollisions(
      collisions2D,
      data.collisionSize
    );
    this.collisions = collisions;
  }
  door: { next: Position; prev: Position };

  drawCollisionBlocks() {
    this.collisions.forEach((collision) => {
      collision.draw(false);
    });
  }
}
