import { Global } from "./Global";
import { Player } from "./Player";

export abstract class BodyPart {
  player: Player;
  path: string;
  loaded: boolean = false;
  image: HTMLImageElement;
  visible: boolean = true;
  events: ((part: BodyPart) => void)[] = [];
  constructor(data: Partial<BodyPart>) {
    Object.assign(this, data);
    this.loadImage(this.path);
    this.image.onload = () => {
      this.loaded = true;
      this.visible = true;
    };
  }

  loadImage(path: string): HTMLImageElement {
    const image = new Image();
    image.src = path;
    this.image = image;
    return image;
  }
  abstract draw(centerX: number): void;
  addEvent(func: (typeof this.events)[0]) {
    this.events.push(func);
  }
  runEvents() {
    this.events.forEach((func) => func(this));
  }
}

export abstract class Foot extends BodyPart {
  rotation: number = 0;
  abstract isIncrease: boolean;
  constructor(data: Partial<Foot>) {
    super(data);
  }

  run(x: number, y: number, width: number, height: number) {
    if (this.player.press.right || this.player.press.left) {
      Global.ctx.translate(x + width / 2, y + height / 2);
      Global.ctx.rotate((this.rotation * Math.PI) / 180);
      Global.ctx.translate(-x - width / 2, -y - height / 2);

      if (this.rotation >= 25) {
        this.isIncrease = false;
      }
      if (this.rotation <= -25) {
        this.isIncrease = true;
      }

      if (this.isIncrease) {
        this.rotation += 2;
      } else {
        this.rotation -= 2;
      }
    } else {
      this.rotation = 0;
    }
  }
}

export class RightFoot extends Foot {
  isIncrease: boolean = true;
  constructor(data: Partial<RightFoot>) {
    super(data);
  }
  draw(centerX): void {
    const isMove =
      this.player.lastPressed == "left" || this.player.lastPressed == "right";
    const width = this.player.size.w / 2;
    const height = this.player.size.h / 3;
    const x = centerX - 14;
    const y = this.player.side.centerY + 12;

    this.run(x, y, width, height);

    Global.ctx.drawImage(this.image, x, y, width, height);
  }
}

export class LeftFoot extends Foot {
  isIncrease: boolean = false;
  constructor(data: Partial<LeftFoot>) {
    super(data);
  }
  draw(centerX): void {
    const isMove =
      this.player.lastPressed == "left" || this.player.lastPressed == "right";
    const width = this.player.size.w / 2;
    const height = this.player.size.h / 3;
    const x = centerX - 7;
    const y = this.player.side.centerY + 12;

    this.run(x, y, width, height);
    Global.ctx.drawImage(this.image, x, y, width, height);
  }
}

export class Body extends BodyPart {
  constructor(data: Partial<Body>) {
    super(data);
  }
  draw(centerX: number): void {
    let pX = centerX - this.player.size.w / 2.5;

    Global.ctx.drawImage(
      this.image,
      pX,
      this.player.side.centerY - this.player.size.h / 10,
      this.player.size.w / 1.2,
      this.player.size.h / 1.7
    );
  }
}
export class Shield extends BodyPart {
  constructor(data: Partial<Shield>) {
    super(data);
  }
  draw(centerX: number): void {
    let pX = centerX - this.player.size.w / 2.5;
    Global.ctx.drawImage(
      this.image,
      pX,
      this.player.side.centerY - this.player.size.h / 10,
      this.player.size.w / 2,
      this.player.size.h / 1.7
    );
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
      this.player.size.h / 1.4
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
      centerX - this.player.size.w / 4.5,
      this.player.side.t + 12,
      this.player.size.w - this.player.size.w / 3,
      this.player.size.h / 2
    );
  }
}
export class Weapons extends BodyPart {
  constructor(data: Partial<Weapons>) {
    super(data);
  }
  draw(centerX): void {
    Global.ctx.drawImage(
      this.image,
      centerX + this.player.size.w / 8,
      this.player.side.centerY + this.player.size.h / 10,
      this.player.size.w - this.player.size.w / 4,
      this.player.size.h / 3
    );
  }
}
export class Slice extends BodyPart {
  constructor(data: Partial<Slice>) {
    super(data);
  }
  draw(centerX): void {
    Global.ctx.drawImage(
      this.image,
      centerX - this.player.size.w / 16,
      this.player.side.t - this.player.size.h / 8,
      this.player.size.w,
      this.player.size.h
    );
  }
}
