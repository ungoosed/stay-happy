import { Boot } from "./scenes/Boot";
import { Game as MainGame } from "./scenes/Game";
import { GameOver } from "./scenes/GameOver";
import { MainMenu } from "./scenes/MainMenu";
import { Preloader } from "./scenes/Preloader";
import { Instructions } from "./scenes/Instructions";
import { AUTO, Game } from "phaser";

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
  type: AUTO,
  width: 1024,
  height: 768,
  parent: "game-container",
  backgroundColor: "#028af8",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  pixelArt: true,
  zoom: 3,
  physics: {
    default: "arcade",
  },
  scene: [Boot, Preloader, MainMenu, MainGame, GameOver, Instructions],
};

const StartGame = (parent) => {
  return new Game({ ...config, parent });
};

export default StartGame;
