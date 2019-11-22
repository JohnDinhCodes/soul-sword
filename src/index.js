import Phaser from "phaser";
import Loading from "./scenes/Loading";
import OpenWorld from "./scenes/OpenWorld";
import DialogueModal from "./plugins/DialogueModal";

const config = {
  width: 400,
  height: 300,
  zoom: 2,
  type: Phaser.AUTO,
  parent: "game",
  scene: [Loading, OpenWorld],
  title: "Soul Sword",
  version: "0.0.1 BETA",
  autoFocus: true,
  disableContextMenu: true,
  render: {
    pixelArt: true
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 }
    }
  }
};

const game = new Phaser.Game(config);

function preload() {}

function create() {}
