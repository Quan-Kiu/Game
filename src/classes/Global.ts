export class Global {
  static canvasId = "#canvas";
  static $: typeof document.querySelector =
    document.querySelector.bind(document);
  static $$: typeof document.querySelectorAll =
    document.querySelectorAll.bind(document);
  static canvas: HTMLCanvasElement = this.$(this.canvasId) as HTMLCanvasElement;
  static body: HTMLBodyElement = this.$("body") as HTMLBodyElement;
  static ctx: CanvasRenderingContext2D = this.canvas.getContext(
    "2d"
  ) as CanvasRenderingContext2D;
}
