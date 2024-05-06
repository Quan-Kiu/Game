import { MOVE_STATUS, Player } from "./Player";

const suffixKey = "Key";

class GameKeyEvent {
  static move(player: Player) {
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
          player.lastPressed = "left";
          break;
        case suffixKey + MOVE_STATUS.right:
          player.press.right = true;
          player.lastPressed = "right";
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
        case suffixKey + MOVE_STATUS.left:
          player.press.left = false;
          break;
        case suffixKey + MOVE_STATUS.right:
          player.press.right = false;
          break;
        default:
          break;
      }
    });
  }
}

export default GameKeyEvent;
