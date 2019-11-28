// Map Assets
import outsideTileset from '../assets/maps/tilesets/outside.png';
import doorsTileset from '../assets/maps/tilesets/doors.png';
import houseTileset from '../assets/maps/tilesets/house.png';
import worldTileset from '../assets/maps/tilesets/world.png';
import tilemapJSONFile from '../assets/maps/HomeTown/HomeTown.json';
// Character Sprites
import playerSpritesheetFile from '../assets/player.png';
import lumberjackSpritesheetFile from '../assets/lumberjack.png';
import emiSpritesheetFile from '../assets/emi.png';
import marthaSpriteSheetFile from '../assets/martha.png';
// Utility Sprites
import actionBox from '../assets/playerActionBox.png';
import playerAura from '../assets/playerAura.png';
import aButtonSprite from '../assets/a-button.png';
import bButtonSprite from '../assets/b-button.png';

// Audio files
import textBlipOgg from '../assets/blip.ogg';
import textBlipMp3 from '../assets/blip.mp3';
import homeTownOgg from '../assets/hometown.ogg';
import homeTownMp3 from '../assets/hometown.mp3';

// Plugins
import dialogueModalPlugin from '../plugins/DialogueModal';
import characterMovementPlugin from '../plugins/CharacterMovement';
import playerRangePlugin from '../plugins/PlayerRange';
import virtualJoyStickPlugin from '../plugins/rex-plugins/virtualjoystick';

class HomeTown extends Phaser.Scene {
	constructor() {
		super({ key: 'HomeTown' });
		this.NPCs = [];
		this.mapLayer = [];
		this.characterSpriteConfig = {
			frameWidth: 32,
			frameHeight: 32,
		};
		this.utilitySpriteConfig = {
			frameHeight: 1,
			frameWidth: 1,
		};

		this.isMobile = false;
	}

	preload() {
		// map tilesets
		this.load.image('outside', outsideTileset);
		this.load.image('doors', doorsTileset);
		this.load.image('house', houseTileset);
		this.load.image('world', worldTileset);

		this.load.tilemapTiledJSON('map', tilemapJSONFile);

		// spritesheets
		this.load.spritesheet('player', playerSpritesheetFile, this.characterSpriteConfig);
		this.load.spritesheet('lumberjack', lumberjackSpritesheetFile, this.characterSpriteConfig);
		this.load.spritesheet('emi', emiSpritesheetFile, this.characterSpriteConfig);
		this.load.spritesheet('martha', marthaSpriteSheetFile, this.characterSpriteConfig);
		this.load.spritesheet('inFrontBlock', actionBox, this.utilitySpriteConfig);
		this.load.spritesheet('playerAura', playerAura, this.utilitySpriteConfig);

		// Mobile button images
		this.load.image('aButton', aButtonSprite);
		this.load.image('bButton', bButtonSprite);

		// Audio
		this.load.audio('textBlip', [textBlipOgg, textBlipMp3]);
		this.load.audio('hometown', [homeTownOgg, homeTownMp3]);

		// Plugins
		this.load.scenePlugin('dialogueModal', dialogueModalPlugin);
		this.load.scenePlugin('characterMovement', characterMovementPlugin);
		this.load.scenePlugin('playerRange', playerRangePlugin);

		// Determines if device is a desktop or not
		if (this.sys.game.device.os.desktop) {
			this.isMobile = false;
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
			Down: [0, 1, 2, 1],
		};
		const textBlip = this.sound.add('textBlip');
		const hometownMusic = this.sound.add('hometown');
		hometownMusic.play({ loop: true, volume: 0.5 });

		/**********************************
		 *             Plugin
		 ***********************************/
		const dialoguePlugin = this.dialogueModal;
		const rangePlugin = this.playerRange;
		const movementPlugin = this.characterMovement;

		dialoguePlugin.init({ textBlip: textBlip });

		/**********************************
		 *               Map
		 ***********************************/
		const map = this.make.tilemap({ key: 'map' });
		const outsideTileset = map.addTilesetImage('outside', 'outside');
		const doorsTileset = map.addTilesetImage('doors', 'doors');
		const houseTileset = map.addTilesetImage('house', 'house');
		const worldTileset = map.addTilesetImage('world', 'world');
		const tilesetArr = [outsideTileset, doorsTileset, houseTileset, worldTileset];

		// Layers
		this.mapLayer.push(map.createStaticLayer('Below Player', tilesetArr, 0, 0));
		this.mapLayer.push(map.createStaticLayer('Above Ground', tilesetArr, 0, 0));
		this.mapLayer.push(map.createStaticLayer('Obstacles', tilesetArr, 0, 0));
		this.mapLayer.push(map.createStaticLayer('House Below', tilesetArr, 0, 0));

		// Spawn Points from map
		const playerSpawnPoint = map.findObject('Player Spawn Point', obj => obj.name === 'Player Spawn Point');
		const lumberjackSpawnPoint = map.findObject('Lumberjack', obj => obj.name === 'Lumberjack');
		const emiSpawnPoint = map.findObject('Emi', obj => obj.name === 'Emi');

		/**********************************
		 *             Player
		 ***********************************/
		const playerData = {
			characterKey: 'player',
			animsKeys: animsKeys,
			auraKey: 'playerAura',
			spawnData: {
				x: playerSpawnPoint.x,
				y: playerSpawnPoint.y,
				initialFrame: 1,
			},
			speed: 80,
		};

		// this.invisibleBlock = this.physics.add.sprite(0, 0, "invisibleBlock");
		// this.invisibleBlock.setPosition()
		movementPlugin.init(playerData, this.isMobile);
		rangePlugin.init('inFrontBlock', 'playerAura', this.player);

		// Creating player keys to manipulate
		this.player.canMove = true;

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
			speed: 30,
		};
		const lumberjackIndex = movementPlugin.createCharacter(lumberjackData);
		this.NPCs[lumberjackIndex].dialogue = [
			'We were cutting down trees to expand our village, and found a big patch of land!',
			'What do you think could be over there?',
		];

		const emiData = {
			characterKey: 'emi',
			animsKeys: animsKeys,
			spawnData: {
				x: emiSpawnPoint.x,
				y: emiSpawnPoint.y,
				initialFrame: 1,
			},
			speed: 30,
		};
		const emiIndex = movementPlugin.createCharacter(emiData);

		const marthaData = {
			characterKey: 'martha',
			animsKeys: animsKeys,
			spawnData: {
				x: 300,
				y: 300,
				initialFrame: 1,
			},
			speed: 400,
		};
		const marthaIndex = movementPlugin.createCharacter(marthaData);

		this.NPCs[marthaIndex].dialogue = [
			'I',
			'AM',
			'SPEEEEEEEEEEEEEEEEEEEEEEEEEED',
			"I'm Martha. Most of the character sprites are from different artists.",
			"My pixels were put together by 'kitterlings'.",
			"You can find my artist on Instagram @ 'kitterlings' as well on 'kitterlings.itch.io'",
		];

		this.NPCs[emiIndex].dialogue = [
			"Oh! Hi there! I'm Emi.",
			"We just got virtual buttons for mobile devices! I see you're already using them. If you have any problems with this game on your device, let my creator know.",
			'The latest update was on Wednesday, November 27th, 2019 at 9:00 PM',
			'In this updated version, initial set up has been created for making different choices in dialogue.',
			'We also just got some music. Now this place is a bit livelier than usual.',
			'Because of recent developments, the ability to skip dialogue with your B button has been removed.',
			'In the upcomming updates, you will be able to enter the buildings in this map.',
			'That concludes the latest updates, I hope you are excited for the finished game as much as I am!',
		];

		if (!this.isMobile) {
			this.NPCs[emiIndex].dialogue[1] =
				'We just got virtual buttons for mobile devices! Visit this site on your phone to try them out. If you have any problems with this game on your device, let my creator know.';
			this.NPCs[emiIndex].dialogue[5] =
				'Because of recent developments, the ability to skip dialogue with your Z key has been removed.';
		}

		/**********************************
		 *   Map Layers Above Characters
		 ***********************************/
		this.mapLayer.push(map.createStaticLayer('Trees', tilesetArr, 0, 0));
		this.mapLayer.push(map.createStaticLayer('House Above', tilesetArr, 0, 0));

		/**********************************
		 *             Cameras
		 ***********************************/

		this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
		this.cameras.main.startFollow(this.player);
		this.cameras.main.roundPixels = true;

		/**********************************
		 *        Physics Collision
		 ***********************************/
		// loops through array of map layers and sets collision
		// obstaclesLayer.setCollisionByProperty({ collides: true });
		this.mapLayer.forEach(layer => {
			layer.setCollisionByProperty({ collides: true });
		});

		// Collision with world boundaries
		this.physics.world.bounds.width = map.widthInPixels;
		this.physics.world.bounds.height = map.heightInPixels;
		this.player.setCollideWorldBounds(true);

		// Collision with map layers
		this.physics.add.collider(this.player, this.mapLayer);
		this.physics.add.collider(this.NPCs, this.mapLayer);

		this.physics.add.collider(this.player, this.NPCs);
		this.physics.add.collider(this.NPCs[0], this.player);

		/**********************************
		 *            Dialogue
		 ***********************************/
		// might get rid of this later or put it on an obstacle (this is the tutorial)
		if (this.isMobile) {
			dialoguePlugin.playDialogue(
				[
					'Your A button is used for confirming actions. Try pressing A to continue.',
					'You can move around with the joystick on the left hand side of your screen.',
					'Your B button is used for closing and canceling actions.',
					'In this latest update, you can now run by holding down B',
				],
				this.player
			);
		} else {
			dialoguePlugin.playDialogue(
				[
					"Your 'X' key is used for confirming actions. Try pressing 'X' to continue.",
					"You can move around with your keyboard's arrow keys.",
					"Your 'Z' key is used for closing and canceling actions.",
					"In this latest update, you can now run by holding down 'Z'",
				],
				this.player
			);
		}

		/**********************************
		 *            Controls
		 ***********************************/

		this.input.addPointer(2);

		if (this.isMobile) {
			const virtualJoyStick = new virtualJoyStickPlugin(this, {
				x: 70,
				y: 140,
				radius: 40,
				dir: 2,
			});
			this.cursors = virtualJoyStick.createCursorKeys();
			const aButton = this.add.image(420, 120, 'aButton');
			const bButton = this.add.image(375, 160, 'bButton');
			aButton.setScale(0.6);
			aButton.alpha = 0.9;
			bButton.setScale(0.6);
			bButton.alpha = 0.9;
			aButton.setScrollFactor(0);
			bButton.setScrollFactor(0);

			aButton.setInteractive();
			bButton.setInteractive();

			aButton.on('pointerdown', () => {
				this.actionButton();
			});
			bButton.on('pointerdown', () => {
				this.cancelButton();
				this.player.speed = playerData.speed * 2;
			});
			bButton.on('pointerup', () => {
				this.cancelButton();
				this.player.speed = playerData.speed;
			});
		} else {
			// Action Button
			this.input.keyboard.on('keydown_X', () => {
				this.actionButton(textBlip);
			});
			this.input.keyboard.on('keydown_Z', () => {
				this.cancelButton();
				this.player.isRunning = true;

				this.player.speed = playerData.speed * 2;
			});

			this.input.keyboard.on('keyup_Z', () => {
				this.player.speed = playerData.speed;
				this.player.isRunning = false;
			});
		}
		this.cursors.down.on('down', () => {
			if (this.choiceIsOn) {
				dialoguePlugin.toggleChoice();
			}
		});
		this.cursors.up.on('down', () => {
			if (this.choiceIsOn) {
				dialoguePlugin.toggleChoice();
			}
		});
	}

	actionButton(sound) {
		// if dialogue is NOT Playing
		// HomeTown.dialogueIsPlaying is initiated in DialogueModal.js (the DialogueModal plugin)
		if (!this.dialogueIsPlaying && !this.cursors.active) {
			// rangePlugin checkOverlap checks to see if the action box in PlayerRange.js overlaps with an NPC
			// if there is an overlap with a NPC and the action box, it will set actionData to an object.
			// the object contains npc: (the npc sprite) and dialogue, an array contained in npc.dialogue initiated under the NPC section in this file
			const actionData = null || this.playerRange.checkOverlap(this.inFrontBlock, this.NPCs);
			if (actionData) {
				this.dialogueModal.playDialogue(actionData.dialogue, this.player, actionData.npc);
			}
		} else {
			this.dialogueModal.keydownXHandler();
		}

		if (this.dialogueIsPlaying && this.choiceIsOn) {
			this.dialogueModal.closeChoiceWindow();
		}
	}

	cancelButton() {
		/*
        // Commenting this out for now until I get the localstorage set up
        // The goal is to have a "haveSeen" value. If true, player can skip the dialogue

		this.dialogueModal.dialogueIndex = this.dialogueModal.dialogueArr.length;
        this.dialogueModal.closeWindow(this.dialogueModal.currentNPC);
        */
	}

	update(time, delta) {
		this.playerRange.setBlockInFront(this.player);
		this.playerRange.setBlockOnPlayer(this.player);
		this.characterMovement.npcMovement(this.NPCs[this.NPCs.lumberjack], [
			{ direction: 'right', value: 55 },
			{ direction: 'left', value: 55 },
		]);
		this.characterMovement.npcMovement(this.NPCs[this.NPCs.martha], [
			{ direction: 'left', value: 55 },
			{ direction: 'right', value: 55 },
			{ direction: 'up', value: 55 },
			{ direction: 'left', value: 55 },
			{ direction: 'right', value: 55 },
			{ direction: 'down', value: 55 },
		]);
		if (this.player.canMove) {
			this.characterMovement.playerControls(this.player);
		}
	}
}

export default HomeTown;
