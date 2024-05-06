import { v4 } from "uuid";
import { Game } from "./classes/Game";
import "./custom/build-in/index";
import { Player } from "./classes/Player";
import GameKeyEvent from "./classes/GameKeyEvent";

//INIT GAME
(async () => {
  try {
    const game = new Game();
    game.init();

    //add first player to testing
    const firstPlayer = new Player({
      id: v4(),
      size: {
        w: 40,
        h: 80,
      },
      position: {
        x: 60,
        y: 60,
      },
    });

    game.player = firstPlayer;

    GameKeyEvent.move(firstPlayer);

    game.addPlayer(firstPlayer);
  } catch (error) {
    console.error(error);
  }
})();
