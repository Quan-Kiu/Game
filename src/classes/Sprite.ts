import { Position } from "./../types/position";
import { Global } from "./Global";

export interface ISprite {
  width: number;
  height: number;
  position: Position;
  image: HTMLImageElement | string;
  draw: () => void;
}

export type ISpriteConstructorData = Pick<ISprite, "image" | "position">;

export class Sprite implements ISprite {
  width: number;
  height: number;
  position: Position;
  image: HTMLImageElement;

  constructor({ image, position }: ISpriteConstructorData) {
    if (typeof image == "string") {
      this.image = new Image();
      this.image.src = image;
    } else {
      this.image = image;
    }
    this.position = position;
    this.width = this.image.width;
    this.height = this.image.height;
  }
  draw() {
    if (this.image) {
      Global.ctx.drawImage(
        this.image as HTMLImageElement,
        this.position.x,
        this.position.y
      );
    } else {
      throw new Error("Image not loaded");
    }
  }
}
