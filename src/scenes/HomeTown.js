// Map Assets
import tilesetFile from "../assets/maps/tilesets/outside.png";
import tilemapJSONFile from "../assets/maps/HomeTown/HomeTown.json";
// Character Sprites
import playerSpritesheetFile from "../assets/player.png";
import lumberjackSpritesheetFile from "../assets/lumberjack.png";
// Utility Sprites
import actionBox from "../assets/playerActionBox.png";
import playerAura from "../assets/playerAura.png";
// Plugins
import dialogueModalPlugin from "../plugins/DialogueModal";
import characterMovementPlugin from "../plugins/CharacterMovement";
import playerRangePlugin from "../plugins/PlayerRange";
import virtualJoyStickPlugin from "../plugins/rex-plugins/virtualjoystick";

class HomeTown extends Phaser.Scene {
    constructor() {
        super({ key: "HomeTown" });
        this.NPCs = [];
        this.characterSpriteConfig = {
            frameWidth: 32,
            frameHeight: 32
        };
        this.utilitySpriteConfig = {
            frameHeight: 1,
            frameWidth: 1
        };

        this.isMobile = false;
    }

    preload() {
        this.load.image("outside", tilesetFile);
        this.load.tilemapTiledJSON("map", tilemapJSONFile);
        this.load.spritesheet(
            "player",
            playerSpritesheetFile,
            this.characterSpriteConfig
        );
        this.load.spritesheet(
            "lumberjack",
            lumberjackSpritesheetFile,
            this.characterSpriteConfig
        );
        this.load.spritesheet(
            "lumberjack1",
            lumberjackSpritesheetFile,
            this.characterSpriteConfig
        );
        this.load.spritesheet(
            "inFrontBlock",
            actionBox,
            this.utilitySpriteConfig
        );
        this.load.spritesheet(
            "playerAura",
            playerAura,
            this.utilitySpriteConfig
        );
        this.load.scenePlugin("dialogueModal", dialogueModalPlugin);
        this.load.scenePlugin("characterMovement", characterMovementPlugin);
        this.load.scenePlugin("playerRange", playerRangePlugin);

        if (this.sys.game.device.os.desktop) {
            console.log("desktop");
        } else {
            this.isMobile = true;
        }
    }

    create() {
        /**********************************
         *            Constants
         ***********************************/
        const animsKeys = {
            Left: [3, 4, 5, 4],
            Right: [6, 7, 8, 7],
            Up: [9, 10, 11, 10],
            Down: [0, 1, 2, 1]
        };

        /**********************************
         *             Plugin
         ***********************************/
        const dialoguePlugin = this.dialogueModal;
        const rangePlugin = this.playerRange;
        const movementPlugin = this.characterMovement;

        dialoguePlugin.init();

        /**********************************
         *               Map
         ***********************************/
        const map = this.make.tilemap({ key: "map" });
        const outsideTileset = map.addTilesetImage("outside", "outside");
        const tilesetArr = [outsideTileset];

        // Layers
        const belowLayer = map.createStaticLayer(
            "Below Player",
            tilesetArr,
            0,
            0
        );
        const obstaclesLayer = map.createStaticLayer(
            "Obstacles",
            tilesetArr,
            0,
            0
        );

        // Set collisions by layer property
        obstaclesLayer.setCollisionByProperty({ collides: true });

        // Spawn Points from map
        const playerSpawnPoint = map.findObject(
            "Player Spawn Point",
            obj => obj.name === "Player Spawn Point"
        );
        const lumberjackSpawnPoint = map.findObject(
            "Lumberjack",
            obj => obj.name === "Lumberjack"
        );

        /**********************************
         *             Player
         ***********************************/
        const playerData = {
            characterKey: "player",
            animsKeys: animsKeys,
            auraKey: "playerAura",
            spawnData: {
                x: playerSpawnPoint.x,
                y: playerSpawnPoint.y,
                initialFrame: 1
            },
            speed: 80
        };

        // this.invisibleBlock = this.physics.add.sprite(0, 0, "invisibleBlock");
        // this.invisibleBlock.setPosition()
        movementPlugin.init(playerData, this.isMobile);
        rangePlugin.init("inFrontBlock", "playerAura", this.player);

        // Creating player keys to manipulate
        this.player.canMove = true;

        /**********************************
         *              NPCs
         ***********************************/
        const lumberjackData = {
            characterKey: "lumberjack",
            animsKeys: animsKeys,
            spawnData: {
                x: lumberjackSpawnPoint.x,
                y: lumberjackSpawnPoint.y,
                initialFrame: 7
            },
            speed: 30
        };
        const lumberjackIndex = movementPlugin.createCharacter(lumberjackData);
        this.NPCs[lumberjackIndex].dialogue = [
            "We were cutting down trees to expand our village, and found a big patch of land!",
            "What do you think could be over there?"
        ];

        const lumberjackData1 = {
            characterKey: "lumberjack1",
            animsKeys: animsKeys,
            spawnData: {
                x: 500,
                y: 300,
                initialFrame: 1
            },
            speed: 30
        };
        const lumberjack1Index = movementPlugin.createCharacter(
            lumberjackData1
        );
        this.NPCs[lumberjack1Index].dialogue = [
            "Hi! I'm a test character! I'll be telling you the latest updates for the game.",
            "I was updated Monday November 25th, 2019",
            "In this updated version, the screen dimensions have changed to fit mobile phones!",
            "Also, I was created in this update! (very exciting)",
            "Eventually, there will be virtual buttons for mobile devices so you can play soul sword on the go.",
            "That concludes the latest updates, I hope are excited for the finished game as much as I am!	"
        ];

        /**********************************
         *   Map Layers Above Characters
         ***********************************/
        const treeLayer = map.createStaticLayer("Trees", tilesetArr, 0, 0);
        treeLayer.setCollisionByProperty({ collides: true });

        /**********************************
         *             Cameras
         ***********************************/
        this.cameras.main.setBounds(
            0,
            0,
            map.widthInPixels,
            map.heightInPixels
        );
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true;

        /**********************************
         *        Physics Collision
         ***********************************/

        // Collision with world boundaries
        this.physics.world.bounds.width = map.widthInPixels;
        this.physics.world.bounds.height = map.heightInPixels;
        this.player.setCollideWorldBounds(true);

        // Collision with map layers
        this.physics.add.collider(this.player, [treeLayer, obstaclesLayer]);
        this.physics.add.collider(this.NPCs, [treeLayer, obstaclesLayer]);

        this.physics.add.collider(this.player, this.NPCs);
        this.physics.add.collider(this.NPCs[0], this.player);

        /**********************************
         *            Dialogue
         ***********************************/
        // might get rid of this later or put it on an obstacle (this is the tutorial)
        dialoguePlugin.playDialogue(
            [
                "Your 'X' key is used for confirming actions. Try pressing 'X' to continue.",
                "You can move around with your keyboard's arrow keys.",
                "Your 'Z' key is used for closing and canceling actions.",
                "You can skip dialogue completely by pressing the 'Z' key.",
                "When using 'X' to continue dialogue, the window will automatically close if there is no more dialogue to display.",
                "You can always replay this by talking to the old man in (insert home village here)"
            ],
            this.player
        );
        /**********************************
         *            Controls
         ***********************************/
        // Action Button
        this.input.keyboard.on("keydown_X", () => {
            // if dialogue is NOT Playing
            // HomeTown.dialogueIsPlaying is initiated in DialogueModal.js (the DialogueModal plugin)
            if (!this.dialogueIsPlaying) {
                // rangePlugin checkOverlap checks to see if the action box in PlayerRange.js overlaps with an NPC
                // if there is an overlap with a NPC and the action box, it will set actionData to an object.
                // the object contains npc: (the npc sprite) and dialogue, an array contained in npc.dialogue initiated under the NPC section in this file
                let actionData = rangePlugin.checkOverlap(
                    this.inFrontBlock,
                    this.NPCs
                );
                if (actionData) {
                    dialoguePlugin.playDialogue(
                        actionData.dialogue,
                        this.player,
                        actionData.npc
                    );
                }
            } else {
                dialoguePlugin.keydownXHandler();
            }
        });

        if (this.isMobile) {
            const virtualJoyStick = new virtualJoyStickPlugin(this, {
                x: 50,
                y: 150,
                radius: 20,
                dir: 2
            });
            this.cursors = virtualJoyStick.createCursorKeys();
        }
    }

    update(time, delta) {
        this.playerRange.setBlockInFront(this.player);
        this.playerRange.setBlockOnPlayer(this.player);
        this.characterMovement.npcMovement(this.NPCs[this.NPCs.lumberjack], [
            { direction: "right", value: 55 },
            { direction: "left", value: 55 }
        ]);
        if (this.player.canMove) {
            this.characterMovement.playerControls(this.player);
        }
    }
}

export default HomeTown;
