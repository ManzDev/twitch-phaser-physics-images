import Phaser from "phaser";
import { MainScene } from "./scenes/MainScene.js";
import { width, height } from "./modules/constants.js";

const config = {
  type: Phaser.AUTO,
  width,
  height,
  autoCenter: Phaser.Scale.Center.CENTER_VERTICALLY,
  backgroundColor: "#000",
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: {
        y: 200
      }
    }
  },
  pixelArt: false,
  scene: [MainScene]
};

// eslint-disable-next-line
const game = new Phaser.Game(config);
