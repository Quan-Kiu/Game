import { Global } from "./Global";
import { MOVE_STATUS, Player } from "./Player";

const suffixKey = "Key";

class GameKeyEvent {
  static move(player: Player) {
    const control = Global.$(".controls");

    control?.addEventListener("touchstart", (e) => {
      //@ts-ignore
      const key = e.target?.id;
      const event = new Event("keydown") as KeyboardEvent;

      Object.assign(event, {
        code: key == "attack" ? "Enter" : suffixKey + key,
      });
      document.dispatchEvent(event);
    });
    control?.addEventListener("touchend", (e) => {
      //@ts-ignore
      const key = e.target?.id;
      const event = new Event("keyup") as KeyboardEvent;

      Object.assign(event, {
        code: key == "attack" ? "Enter" : suffixKey + key,
      });
      document.dispatchEvent(event);
    });

    document.addEventListener("keydown", (e) => {
      switch (e.code) {
        case suffixKey + MOVE_STATUS.up:
          if (!player.press.up && player.velocity.y == 0) {
            player.press.up = true;
            player.velocity.y = -18;
          }
          break;
        case suffixKey + MOVE_STATUS.left:
          player.press.left = true;
          player.changeMove("left");
          console.log(player.position);

          break;
        case suffixKey + MOVE_STATUS.topLeft:
          if (!player.press.up && player.velocity.y == 0) {
            player.press.up = true;
            player.velocity.y = -18;
          }
          player.press.left = true;
          player.changeMove("left");

          break;
        case suffixKey + MOVE_STATUS.topRight:
          if (!player.press.up && player.velocity.y == 0) {
            player.press.up = true;
            player.velocity.y = -18;
          }
          player.press.right = true;
          player.changeMove("right");

          break;
        case suffixKey + MOVE_STATUS.right:
          player.press.right = true;
          player.changeMove("right");

          break;
        case "Enter":
          player.press.attack = true;
          break;
        default:
          break;
      }
    });

    document.addEventListener("keyup", (e) => {
      switch (e.code) {
        case suffixKey + MOVE_STATUS.up:
          player.press.up = false;
          break;
        case suffixKey + MOVE_STATUS.topLeft:
          player.press.up = false;
          player.press.left = false;
          break;
        case suffixKey + MOVE_STATUS.topRight:
          player.press.up = false;
          player.press.right = false;
          break;
        case suffixKey + MOVE_STATUS.left:
          player.press.left = false;
          break;
        case suffixKey + MOVE_STATUS.right:
          player.press.right = false;
          break;
        case "Enter":
          player.press.attack = false;
          break;
        default:
          break;
      }
    });
  }
}

export default GameKeyEvent;
