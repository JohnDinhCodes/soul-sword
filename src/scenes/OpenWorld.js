import tilesetFile from "../assets/maps/tilesets/outside.png";
import tilemapJSONFile from "../assets/maps/HomeTown/HomeTown.json";
import playerSpritesheetFile from "../assets/player.png";
import dialogueModal from "../plugins/DialogueModal";

class OpenWorld extends Phaser.Scene {
  constructor() {
    super({ key: "OpenWorld" });
    this.canMove = true;
    // default speed is 80
    this.playerSpeed = 80;
  }

  init() {}

  preload() {
    this.load.image("tiles", tilesetFile);
    this.load.tilemapTiledJSON("map", tilemapJSONFile);
    this.load.spritesheet("player", playerSpritesheetFile, {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.scenePlugin(
      "dialogueModal",
      dialogueModal,
      "dialogueModal",
      "dialogueModal"
    );
  }

  create() {
    const dialogueModalPlugin = this.dialogueModal;
    // plugin
    // const dialogueModalPlugin = this.plugins.install(
    //   "dialogueModal",
    //   dialogueModal,
    //   true,
    //   "dialogueModal",
    //   {
    //     scene: this
    //   }
    // );

    // map
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("outside", "tiles");

    const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
    const obstaclesLayer = map.createStaticLayer("Obstacles", tileset, 0, 0);

    obstaclesLayer.setCollisionByProperty({ collides: true });

    // const debugGraphics = this.add.graphics().setAlpha(0.75);
    // worldLayer.renderDebug(debugGraphics, {
    //   tileColor: null,
    //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255)
    // });

    const spawnPoint = map.findObject(
      "Spawn Point",
      obj => obj.name === "Spawn Point"
    );
    console.log(spawnPoint);

    this.player = this.physics.add.sprite(
      spawnPoint.x,
      spawnPoint.y,
      "player",
      1
    );
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);

    const treeLayer = map.createStaticLayer("Trees", tileset, 0, 0);
    treeLayer.setCollisionByProperty({ collides: true });

    // cursors
    this.cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true;

    this.physics.add.collider(this.player, [treeLayer, obstaclesLayer]);

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

    // Initial RPG Tutorial
    this.dialoguePlayer(
      [
        "Your 'X' key is used for confirming actions.\nTry pressing 'X' to continue.",
        "You can move around with your keyboard's arrow keys.",
        "Your 'Z' key is used for closing and canceling actions.",
        "You can skip dialogue completely by pressing the 'Z' key.",
        "When using 'X' to continue dialogue, the window will automatically close if there is no more dialogue to display.",
        "You can always replay this by talking to the old man in (insert home village here)"
      ],
      dialogueModalPlugin
    );
  }

  dialoguePlayer([...dialogue], plugin) {
    this.canMove = false;
    plugin.createWindow();
    let counter = 1;
    plugin.setText(dialogue[0], true);
    this.input.keyboard.on("keydown_Z", () => {
      this.input.keyboard.removeAllListeners();
      plugin.toggleWindow(false);
    });
    this.input.keyboard.on("keydown_X", () => {
      if (counter === dialogue.length) {
        this.input.keyboard.removeAllListeners();
        this.canMove = true;
        plugin.toggleWindow(false);
      } else {
        plugin.setText(dialogue[counter], true);
        counter++;
      }
    });
  }

  // autoMovement(person, direction = "left") {
  //   if (direction === "left") {
  //     if (person.body.x > 100) {
  //       person.body.x -= 1;
  //       this.player.anims.play("left", true);
  //       console.log(person.body.x);
  //     } else {
  //       direction = "down";
  //     }
  //   } else if (direction === "down") {
  //     if (person.body.y < 700) {
  //       person.body.y += 1;
  //       person.anims.play("down", true);
  //     } else {
  //       direction = "right";
  //     }
  //   } else if (direction === "right") {
  //     if (person.body.x < 480) {
  //       person.body.x += 1;
  //       this.player.anims.play("right", true);
  //     } else {
  //       direction = "up";
  //     }
  //   }
  // }

  update(time, delta) {
    // this.autoMovement(this.player);

    // console.log(this.cameras.main.midPoint);
    this.player.body.setVelocity(0);

    if (this.canMove) {
      // Horizontal movement
      if (this.cursors.left.isDown) {
        this.player.body.setVelocityX(-1 * this.playerSpeed);
        this.player.anims.play("left", true);
      } else if (this.cursors.right.isDown) {
        this.player.body.setVelocityX(this.playerSpeed);
        this.player.anims.play("right", true);
      }

      // Vertical movement
      else if (this.cursors.up.isDown) {
        this.player.body.setVelocityY(-1 * this.playerSpeed);
        this.player.anims.play("up", true);
      } else if (this.cursors.down.isDown) {
        this.player.body.setVelocityY(this.playerSpeed);
        this.player.anims.play("down", true);
      } else {
      }
    }
  }
}

export default OpenWorld;
