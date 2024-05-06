import { Global } from "./Global";
import { Player } from "./Player";

export abstract class BodyPart {
  player: Player;
  path: string;
  loaded: boolean = false;
  image: HTMLImageElement;
  constructor(data: Partial<BodyPart>) {
    Object.assign(this, data);
    const image = new Image();
    image.src = this.path;
    console.log(this.image);

    this.image = image;
    this.image.onload = () => {
      this.loaded = true;
    };
  }
  abstract draw(centerX: number): void;
}

export class RightFoot extends BodyPart {
  constructor(data: Partial<RightFoot>) {
    super(data);
  }
  draw(): void {
    Global.ctx.drawImage(
      this.image,
      this.player.side.centerX + 2,
      this.player.side.centerY
    );
  }
}
export class LeftFoot extends BodyPart {
  constructor(data: Partial<RightFoot>) {
    super(data);
  }
  draw(): void {
    Global.ctx.drawImage(
      this.image,
      this.player.side.centerX - 2,
      this.player.side.centerY
    );
  }
}

export class Body extends BodyPart {
  constructor(data: Partial<Body>) {
    super(data);
  }
  draw(centerX: number): void {
    const isPressLeft = this.player.lastPressed == "left";
    let pX = centerX - this.player.size.w / 3;

    Global.ctx.drawImage(
      this.image,
      pX,
      this.player.side.centerY - this.player.size.h / 10,
      this.player.size.w / 2,
      this.player.size.h / 2
    );
    if (isPressLeft) {
      Global.ctx.restore();
    }
  }
}
export class Head extends BodyPart {
  constructor(data: Partial<Head>) {
    super(data);
  }
  draw(centerX): void {
    Global.ctx.drawImage(
      this.image,
      centerX - this.player.size.w / 2,
      this.player.side.t,
      this.player.size.w,
      this.player.size.h / 1.5
    );
  }
}

export class Face extends BodyPart {
  constructor(data: Partial<Face>) {
    super(data);
  }
  draw(centerX): void {
    Global.ctx.drawImage(
      this.image,
      centerX - this.player.size.w / 4,
      this.player.side.t,
      this.player.size.w - this.player.size.w / 3,
      this.player.size.h / 1.5
    );
  }
}
