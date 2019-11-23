import tilesetFile from "../assets/maps/tilesets/outside.png";
import tilemapJSONFile from "../assets/maps/HomeTown/HomeTown.json";
import playerSpritesheetFile from "../assets/player.png";
import dialogueModalPlugin from "../plugins/DialogueModal";

class HomeTown extends Phaser.Scene {
  constructor() {
    super({ key: "HomeTown" });
  }

  preload() {
    this.load.image("outside", tilesetFile);
    this.load.tilemapTiledJSON("map", tilemapJSONFile);
    this.load.spritesheet("player", playerSpritesheetFile, {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.scenePlugin("dialogueModal", dialogueModalPlugin);
  }

  create() {
    /**********************************
     *               Map
     ***********************************/
    const map = this.make.tilemap({ key: "map" });
    const outsideTileset = map.addTilesetImage("outside", "outside");
    const tilesetArr = [outsideTileset];

    // Layers
    const belowLayer = map.createStaticLayer("Below Player", tilesetArr, 0, 0);
    const obstaclesLayer = map.createStaticLayer("Obstacles", tilesetArr, 0, 0);

    // Set collisions by layer property
    obstaclesLayer.setCollisionByProperty({ collides: true });

    // Spawn Points from map
    const playerSpawnPoint = map.findObject(
      "Player Spawn Point",
      obj => obj.name === "Player Spawn Point"
    );

    /**********************************
     *             Player
     ***********************************/
    this.player = this.physics.add.sprite(
      playerSpawnPoint.x,
      playerSpawnPoint.y,
      "player",
      1
    );

    // Map Layers Above Player
    const treeLayer = map.createStaticLayer("Trees", tilesetArr, 0, 0);
    treeLayer.setCollisionByProperty({ collides: true });

    /**********************************
     *             Cameras
     ***********************************/
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true;

    /**********************************
     *        Physics Collision
     ***********************************/
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);
    /**********************************
     *             Plugin
     ***********************************/
    const dialogueModalPlugin = this.dialogueModal;
    dialogueModalPlugin.init();
    dialogueModalPlugin.playDialogue([
      "testing this thing out if it works and if it doesnt i guess i'm going to have to code some more",
      "okay so this is the second line in the dialogue",
      "hello world, this is the third line"
    ]);
  }
}

export default HomeTown;
