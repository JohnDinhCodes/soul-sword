// Map Assets
import tilesetFile from '../assets/maps/tilesets/outside.png';
import tilemapJSONFile from '../assets/maps/HomeTown/HomeTown.json';
// Character Sprites
import playerSpritesheetFile from '../assets/player.png';
import lumberjackSpritesheetFile from '../assets/lumberjack.png';
import invisibleBlockFile from '../assets/invisible.png';
// Plugins
import dialogueModalPlugin from '../plugins/DialogueModal';
import characterMovementPlugin from '../plugins/CharacterMovement';
import rangeDetectionPlugin from '../plugins/RangeDetection';

class HomeTown extends Phaser.Scene {
	constructor() {
		super({ key: 'HomeTown' });
		this.NPCs = [];
	}

	preload() {
		this.load.image('outside', tilesetFile);
		this.load.tilemapTiledJSON('map', tilemapJSONFile);
		this.load.spritesheet('player', playerSpritesheetFile, {
			frameWidth: 32,
			frameHeight: 32,
		});
		this.load.spritesheet('lumberjack', lumberjackSpritesheetFile, {
			frameHeight: 32,
			frameWidth: 32,
		});
		this.load.spritesheet('invisibleBlock', invisibleBlockFile, {
			frameHeight: 1,
			frameWidth: 1,
		});
		this.load.scenePlugin('dialogueModal', dialogueModalPlugin);
		this.load.scenePlugin('characterMovement', characterMovementPlugin);
		this.load.scenePlugin('rangeDetection', rangeDetectionPlugin);
	}

	create() {
		/**********************************
		 *            Constants
		 ***********************************/
		const animsKeys = {
			Left: [3, 4, 5, 4],
			Right: [6, 7, 8, 7],
			Up: [9, 10, 11, 10],
			Down: [0, 1, 2, 1],
		};

		/**********************************
		 *             Plugin
		 ***********************************/
		const dialoguePlugin = this.dialogueModal;
		const movementPlugin = this.characterMovement;
		const rangePlugin = this.rangeDetection;

		dialoguePlugin.init();

		/**********************************
		 *               Map
		 ***********************************/
		const map = this.make.tilemap({ key: 'map' });
		const outsideTileset = map.addTilesetImage('outside', 'outside');
		const tilesetArr = [outsideTileset];

		// Layers
		const belowLayer = map.createStaticLayer('Below Player', tilesetArr, 0, 0);
		const obstaclesLayer = map.createStaticLayer('Obstacles', tilesetArr, 0, 0);

		// Set collisions by layer property
		obstaclesLayer.setCollisionByProperty({ collides: true });

		// Spawn Points from map
		const playerSpawnPoint = map.findObject('Player Spawn Point', obj => obj.name === 'Player Spawn Point');
		const lumberjackSpawnPoint = map.findObject('Lumberjack', obj => obj.name === 'Lumberjack');

		/**********************************
		 *             Player
		 ***********************************/
		const playerData = {
			characterKey: 'player',
			animsKeys: animsKeys,
			spawnData: {
				x: playerSpawnPoint.x,
				y: playerSpawnPoint.y,
				initialFrame: 1,
			},
		};

		// this.invisibleBlock = this.physics.add.sprite(0, 0, "invisibleBlock");
		// this.invisibleBlock.setPosition()
		movementPlugin.init(playerData);
		rangePlugin.init('invisibleBlock', this.player);

		// Creating player keys to manipulate
		this.player.canMove = true;
		this.player.speed = 80;

		/**********************************
		 *              NPCs
		 ***********************************/
		const lumberjackData = {
			characterKey: 'lumberjack',
			animsKeys: animsKeys,
			spawnData: {
				x: lumberjackSpawnPoint.x,
				y: lumberjackSpawnPoint.y,
				initialFrame: 7,
			},
		};
		const lumberjackIndex = movementPlugin.createCharacter(lumberjackData);

		/**********************************
		 *   Map Layers Above Characters
		 ***********************************/
		const treeLayer = map.createStaticLayer('Trees', tilesetArr, 0, 0);
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
		dialoguePlugin.playDialogue([
			"Your 'X' key is used for confirming actions. Try pressing 'X' to continue.",
			"You can move around with your keyboard's arrow keys.",
			"Your 'Z' key is used for closing and canceling actions.",
			"You can skip dialogue completely by pressing the 'Z' key.",
			"When using 'X' to continue dialogue, the window will automatically close if there is no more dialogue to display.",
			'You can always replay this by talking to the old man in (insert home village here)',
		]);
	}

	update(time, delta) {
		console.log(this.player.angle);
		this.rangeDetection.setBlockPosition(this.player);
		this.characterMovement.npcMovement(this.NPCs[this.NPCs.lumberjack], [
			{ direction: 'right', value: 55 },
			{ direction: 'left', value: 55 },
		]);
		if (this.player.canMove) {
			this.characterMovement.playerControls(this.player);
		}
	}
}

export default HomeTown;
