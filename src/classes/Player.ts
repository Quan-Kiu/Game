import { Size } from "./../types/size";
import { Position } from "../types/position";
import { Global } from "./Global";
import { CollisionBlock } from "./GameLevel";
import {
  Body,
  BodyPart,
  Face,
  Head,
  LeftFoot,
  RightFoot,
  Shield,
  Slice,
  Weapons,
} from "./BodyPart";
import {
  getBgPath,
  getBodyPath,
  getFacePath,
  getHeadPath,
  getLeftFootPath,
  getRightFootPath,
  getShieldPath,
  getSlicePath,
  getWeaponsPath,
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
  topLeft = "Q",
  topRight = "E",
  right = "D",
  attack = "Enter",
}

export type PressStatus = {
  -readonly [K in keyof typeof MOVE_STATUS]: boolean;
};

export class Player {
  id: string;
  size: Size;
  position: Position;
  autoDirection: "left" | "right" = "right";
  gravity: number = 1;
  bodyParts: BodyPart[];
  auto: boolean = false;
  bodyPartName = "reaper-man-1";
  velocity: Position = { x: 0, y: 2 };
  press: PressStatus = {
    right: false,
    left: false,
    down: false,
    up: false,
    attack: false,
    topLeft: false,
    topRight: false,
  };
  lastPressed: keyof typeof MOVE_STATUS;

  constructor(
    data: Nullish<ExcludeMatchingProperties<Player, Function | Side>>
  ) {
    Object.assign(this, data);

    this.changeBodyPart(this.bodyPartName);
  }

  attack(centerX: number) {
    Global.ctx.translate(centerX, this.side.b);
    Global.ctx.rotate((-15 * Math.PI) / 180);
    Global.ctx.translate(-centerX, -this.side.b);
  }

  changeBodyPart(bodyPartName: string) {
    this.bodyPartName = bodyPartName;
    const weapon = new Weapons({
      player: this,
      path: getWeaponsPath(this.bodyPartName),
      events: [
        (bodyPart) => {
          if (this.press.attack) {
            bodyPart.visible = false;
          } else {
            bodyPart.visible = true;
          }
        },
      ],
    });
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
    const leftFoot = new LeftFoot({
      player: this,
      path: getLeftFootPath(this.bodyPartName),
    });
    const rightFoot = new RightFoot({
      player: this,
      path: getRightFootPath(this.bodyPartName),
    });
    const shield = new Shield({
      player: this,
      path: getShieldPath(this.bodyPartName),
    });

    let isShowSlice = false;
    const slice = new Slice({
      player: this,
      path: getSlicePath(this.bodyPartName),
      visible: false,
      events: [
        (bodyPart) => {
          if (this.press.attack) {
            face.loadImage(getFacePath(this.bodyPartName, 2));
            isShowSlice = true;
          } else {
            face.loadImage(getFacePath(this.bodyPartName, 1));
            if (isShowSlice) {
              bodyPart.visible = isShowSlice;
              setTimeout(() => {
                isShowSlice = false;
              }, 100);
            }
            bodyPart.visible = isShowSlice;
          }
        },
      ],
    });

    this.bodyParts = [
      slice,
      leftFoot,
      rightFoot,
      body,
      weapon,
      head,
      face,
      shield,
    ];
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
          if (this.auto) {
            this.autoDirection = "left";
          }
          break;
        }
        if (this.velocity.x < 0) {
          this.position.x = collision.side.r + 0.01;
          if (this.auto) {
            this.autoDirection = "right";
          }
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

  isPassLevel() {
    return this.side.b >= Global.canvas.height;
  }

  get horizontalSpeed() {
    return this.auto ? 2 : 5;
  }

  changeMove(key: keyof Player["press"]) {
    this.press[key] = true;
    this.lastPressed = key;
  }

  update(collisions: CollisionBlock[]) {
    if (this.auto) {
      if (this.autoDirection == "right") {
        this.changeMove("right");
        this.press.left = false;
      } else if (this.autoDirection == "left") {
        this.changeMove("left");
        this.press.right = false;
      }
    }
    //handle move to horizontal
    this.velocity.x = 0;
    if (this.press.right) {
      this.velocity.x = this.horizontalSpeed;
    }
    if (this.press.left) {
      this.velocity.x = -this.horizontalSpeed;
    }

    //kiểm tra người chơi chạm chướng ngại vật ngang
    this.position.x += this.velocity.x;
    this.checkHorizontalCollision(collisions);

    //kiểm tra người chơi chạm chướng ngại vật dọc
    this.velocity.y += this.gravity;
    this.position.y += this.velocity.y;
    this.checkVerticalCollision(collisions);
  }

  drawBody() {
    this.bodyParts.forEach((bodyPart) => {
      if (bodyPart.loaded) {
        Global.ctx.save();
        const isLeftPress = this.lastPressed == "left";
        const centerX = isLeftPress ? -this.side.centerX : this.side.centerX;
        //Flip body part when move player to left ( default is  right )

        if (isLeftPress) {
          Global.ctx.scale(-1, 1);
        }

        if (this.press.attack) {
          this.attack(centerX);
        }
        bodyPart.runEvents();
        if (bodyPart.visible) {
          bodyPart.draw(centerX);
        }
        Global.ctx.restore();
      }
    });
  }

  draw() {
    this.drawBody();
  }
}
