import Phaser from "phaser";
import tilesetFile from "../assets/overworld_tileset_grass.png";
import tilemapJSONFile from "../assets/OpenWorld.json";
import playerSpritesheetFile from "../assets/player.png";
import dialogueModal from "../plugins/DialogueModal";

class OpenWorld extends Phaser.Scene {
  constructor() {
    super({ key: "OpenWorld" });
  }

  init() {}

  preload() {
    this.load.image("tiles", tilesetFile);
    this.load.tilemapTiledJSON("map", tilemapJSONFile);
    this.load.spritesheet("player", playerSpritesheetFile, {
      frameWidth: 32,
      frameHeight: 32
    });
    // this.load.plugin("dialogueModal", dialogueModal, false);
  }

  create() {
    // plugin.init({ scene: this });

    // map
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("tileset", "tiles");

    const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
    const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
    worldLayer.setCollisionByProperty({ collides: true });

    // const debugGraphics = this.add.graphics().setAlpha(0.75);
    // worldLayer.renderDebug(debugGraphics, {
    //   tileColor: null,
    //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255)
    // });

    // player
    this.player = this.physics.add.sprite(50, 100, "player", 1);
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);

    // cursors
    this.cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true;

    this.physics.add.collider(this.player, worldLayer);

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [3, 4, 5, 4]
      }),
      frameRate: 10
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [6, 7, 8, 7]
      }),
      frameRate: 10
    });

    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [9, 10, 11, 10]
      }),
      frameRate: 10
    });

    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [0, 1, 2, 1]
      }),
      frameRate: 10
    });
    let plugin = this.plugins.install(
      "dialogueModal",
      dialogueModal,
      true,
      "dialogueModal",
      { scene: this }
    );
    // plugin.createWindow();
  }

  update(time, delta) {
    this.player.body.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-80);
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(80);
      this.player.anims.play("right", true);
    }

    // Vertical movement
    else if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-80);
      this.player.anims.play("up", true);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(80);
      this.player.anims.play("down", true);
    } else {
    }
  }
}

export default OpenWorld;
