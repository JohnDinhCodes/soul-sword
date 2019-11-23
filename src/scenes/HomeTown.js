import tilesetFile from '../assets/maps/tilesets/outside.png';
import tilemapJSONFile from '../assets/maps/HomeTown/HomeTown.json';
import playerSpritesheetFile from '../assets/player.png';
import dialogueModalPlugin from '../plugins/DialogueModal';
import characterMovementPlugin from '../plugins/CharacterMovement';

class HomeTown extends Phaser.Scene {
	constructor() {
		super({ key: 'HomeTown' });
	}

	preload() {
		this.load.image('outside', tilesetFile);
		this.load.tilemapTiledJSON('map', tilemapJSONFile);
		this.load.spritesheet('player', playerSpritesheetFile, {
			frameWidth: 32,
			frameHeight: 32,
		});
		this.load.scenePlugin('dialogueModal', dialogueModalPlugin);
		this.load.scenePlugin('characterMovement', characterMovementPlugin);
	}

	create() {
		/**********************************
		 *             Plugin
		 ***********************************/
		const dialogueModalPlugin = this.dialogueModal;
		const characterMovementPlugin = this.characterMovement;

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

		/**********************************
		 *             Player
		 ***********************************/
		const playerData = {
			characterKey: 'player',
			animsKeys: {
				left: [3, 4, 5, 4],
				right: [6, 7, 8, 7],
				up: [9, 10, 11, 10],
				down: [0, 1, 2, 1],
			},
			spawnData: {
				x: playerSpawnPoint.x,
				y: playerSpawnPoint.y,
				initialFrame: 1,
			},
		};

		characterMovementPlugin.init(playerData);

		// Creating player keys to manipulate
		this.player.canMove = true;
		this.player.speed = 80;

		// characterMovementPlugin.createAnims(playerAnims);

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
		this.physics.world.bounds.width = map.widthInPixels;
		this.physics.world.bounds.height = map.heightInPixels;
		this.player.setCollideWorldBounds(true);
	}

	update(time, delta) {
		this.player.body.setVelocity(0);
		if (this.player.canMove) {
			// Horizontal movement
			if (this.cursors.left.isDown) {
				this.player.body.setVelocityX(-1 * this.player.speed);
				this.player.anims.play('left', true);
			} else if (this.cursors.right.isDown) {
				this.player.body.setVelocityX(this.player.speed);
				this.player.anims.play('right', true);
			}

			// Vertical movement
			else if (this.cursors.up.isDown) {
				this.player.body.setVelocityY(-1 * this.player.speed);
				this.player.anims.play('up', true);
			} else if (this.cursors.down.isDown) {
				this.player.body.setVelocityY(this.player.speed);
				this.player.anims.play('down', true);
			} else {
			}
		}
	}
}

export default HomeTown;
