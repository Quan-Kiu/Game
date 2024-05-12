import { v4 } from "uuid";
import { Game } from "./classes/Game";
import "./custom/build-in/index";
import { Player } from "./classes/Player";
import GameKeyEvent from "./classes/GameKeyEvent";
import { Global } from "./classes/Global";

//INIT GAME
(async () => {
  try {
    const game = new Game();
    game.init();
  } catch (error) {
    console.error(error);
  }
})();
