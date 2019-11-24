import Phaser from "phaser";

class Loading extends Phaser.Scene {
  constructor() {
    super({ key: "Loading" });
  }

  init() {}

  preload() {}

  create() {
    this.scene.start("HomeTown");
  }

  update(time, delta) {}
}

export default Loading;
