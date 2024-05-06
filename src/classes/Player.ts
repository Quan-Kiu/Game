import { Size } from "./../types/size";
import { Position } from "../types/position";
import { Global } from "./Global";
import { CollisionBlock } from "./GameLevel";
import { Body, BodyPart, Face, Head } from "./BodyPart";
import {
  getBgPath,
  getBodyPath,
  getFacePath,
  getHeadPath,
} from "../constant/path";

type ExcludeMatchingProperties<T, V> = Pick<
  T,
  { [K in keyof T]: T[K] extends V ? never : K }[keyof T]
>;

type Nullish<T> = {
  [K in keyof T]?: T[K];
};

export enum MOVE_STATUS {
  up = "W",
  down = "S",
  left = "A",
  right = "D",
}

export type PressStatus = {
  -readonly [K in keyof typeof MOVE_STATUS]: boolean;
};

export class Player {
  id: string;
  size: Size;
  position: Position;
  gravity: number = 1;
  bodyParts: BodyPart[];
  bodyPartName = "zombie";
  velocity: Position = { x: 0, y: 2 };
  press: PressStatus = { right: false, left: false, down: false, up: false };
  lastPressed: keyof typeof MOVE_STATUS;

  constructor(
    data: Nullish<ExcludeMatchingProperties<Player, Function | Side>>
  ) {
    Object.assign(this, data);
    const body = new Body({
      player: this,
      path: getBodyPath(this.bodyPartName),
    });
    const head = new Head({
      player: this,
      path: getHeadPath(this.bodyPartName),
    });
    const face = new Face({
      player: this,
      path: getFacePath(this.bodyPartName),
    });

    this.bodyParts = [body, head, face];
  }

  get side(): Side {
    return {
      t: this.position.y,
      b: this.position.y + this.size.h,
      l: this.position.x,
      r: this.position.x + this.size.w,
      centerX: this.position.x + this.size.w / 2,
      centerY: this.position.y + this.size.h / 2,
    };
  }

  checkHorizontalCollision(collisions: CollisionBlock[]) {
    for (let index = 0; index < collisions.length; index++) {
      const collision = collisions[index];
      if (
        this.side.l <= collision.position.x + collision.size &&
        this.side.r >= collision.position.x &&
        this.side.t <= collision.position.y + collision.size &&
        this.side.b >= collision.position.y
      ) {
        if (this.velocity.x > 0) {
          this.position.x = collision.side.l - this.size.w - 0.01;
          break;
        }
        if (this.velocity.x < 0) {
          this.position.x = collision.side.r + 0.01;
          break;
        }
      }
    }
  }

  checkVerticalCollision(collisions: CollisionBlock[]) {
    for (let index = 0; index < collisions.length; index++) {
      const collision = collisions[index];

      if (
        this.side.l <= collision.side.r &&
        this.side.r >= collision.position.x &&
        this.side.t <= collision.side.b &&
        this.side.b >= collision.side.t
      ) {
        if (this.velocity.y > 0) {
          this.position.y = collision.side.t - this.size.h - 0.01;
          this.velocity.y = 0;
          break;
        }
        if (this.velocity.y < 0) {
          this.position.y = collision.side.b + 0.01;
          this.velocity.y = 1;
          break;
        }
      }
    }
  }

  update(collisions: CollisionBlock[]) {
    //handle move to horizontal
    this.velocity.x = 0;
    if (this.press.right) {
      this.velocity.x = 5;
    }
    if (this.press.left) {
      this.velocity.x = -5;
    }

    //kiểm tra người chơi chạm chướng ngại vật ngang
    this.position.x += this.velocity.x;
    this.checkHorizontalCollision(collisions);

    //kiểm tra người chơi chạm chướng ngại vật dọc
    this.velocity.y += this.gravity;
    this.position.y += this.velocity.y;
    this.checkVerticalCollision(collisions);
  }

  draw() {
    this.bodyParts.forEach((bodyPart) => {
      if (bodyPart.loaded) {
        //Flip body part when move player to left ( default is to right )
        const isLeftPress = this.lastPressed == "left";
        if (isLeftPress) {
          Global.ctx.save();
          Global.ctx.scale(-1, 1);
        }

        bodyPart.draw(isLeftPress ? -this.side.centerX : this.side.centerX);

        if (isLeftPress) {
          Global.ctx.restore();
        }
      }
    });
    // Global.ctx.fillStyle = "rgba(255,0,0,0,2)";
    // Global.ctx.fillRect(
    //   this.position.x,
    //   this.position.y,
    //   this.size.w,
    //   this.size.h
    // );
  }
}
