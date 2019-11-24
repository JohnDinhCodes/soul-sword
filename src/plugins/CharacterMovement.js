class CharacterMovement extends Phaser.Plugins.ScenePlugin {
	constructor(scene, pluginManager) {
		super(scene, pluginManager);
	}

	// Spawn and setup main player in scene
	init(playerData) {
		// Creates cursors for your scene
		this.scene.cursors = this.scene.input.keyboard.createCursorKeys();

		this.createCharacter(playerData);
	}

	// Spawns character at X, Y coordinate with an initial frame
	spawnCharacter(characterKey, { x, y, initialFrame }) {
		if (characterKey === 'player') {
			this.scene[characterKey] = this.scene.physics.add.sprite(x, y, characterKey, initialFrame);
		} else {
			// Adds NPC to scene's NPC array and makes them immovable
			this.scene.NPCs.push(this.scene.physics.add.sprite(x, y, characterKey, initialFrame));
			this.scene.NPCs[this.scene.NPCs.length - 1].body.movable = false;
			this.scene.NPCs[this.scene.NPCs.length - 1].speed = 40;
		}
	}

	// Create character animation
	createAnims(characterKey, animsKeys) {
		for (let animsKey in animsKeys) {
			this.scene.anims.create({
				key: characterKey + animsKey,
				frames: this.scene.anims.generateFrameNames(characterKey, {
					frames: animsKeys[animsKey],
				}),
				frameRate: 10,
			});
		}
	}

	setTurnCoords(npc, length) {
		const npcKey = npc.texture.key;
		this[npcKey].startX = npc.x;
		this[npcKey].startY = npc.y;
		this[npcKey].moveIndex = npc.moveIndex + 1 === length ? 0 : npc.moveIndex + 1;
		console.log(npc.moveIndex);
	}

	npcMovement(npc, data) {
		npc.setVelocity(0);
		const npcKey = npc.texture.key;
		// Stops NPC movement if touching anything
		npc.body.moves = npc.body.touching.none;
		// // console.log(npc.moveIndex);
		// // Initialize original x and y value of npc's spawn point
		// if (!this[npcKey]) this[npcKey] = npc;
		// if (!this[npcKey].startX && !this[npcKey].startY) {
		// 	this[npcKey].startX = npc.x;
		// 	this[npcKey].startY = npc.y;
		// }

		// console.log(npc.moveIndex);
		// if (!this[npcKey].moveIndex) this[npcKey].moveIndex = 0;
		// console.log(npc.moveIndex);

		// let distance = data[this[npcKey].moveIndex].value;
		// this[npcKey].direction = data[this[npcKey].moveIndex].direction;

		// if (npc.body.moves) {
		// 	if (this[npcKey].direction === 'right') {
		// 		npc.body.setVelocityX(npc.speed);
		// 		if (npc.body.x > this[npcKey].startX + distance) {
		// 			this.setTurnCoords(npc, data.length);
		// 		}
		// 	} else if (this[npcKey].direction === 'left') {
		// 		npc.body.setVelocityX(-npc.speed);
		// 		if (npc.body.x < this[npcKey].startX - distance) {
		// 			this.setTurnCoords(npc, data.length);
		// 		}
		// 	} else if (this[npcKey].direction === 'up') {
		// 		npc.body.setVelocityY(-npc.speed);
		// 		if (npc.body.y < this[npcKey].startY - distance) {
		// 			this.setTurnCoords(npc, data.length);
		// 		}
		// 	} else if (this[npcKey].direction === 'down') {
		// 		npc.body.setVelocityY(npc.speed);
		// 		if (npc.body.y > this[npcKey].startY + distance) {
		// 			this.setTurnCoords(npc, data.length);
		// 		}
		// 	}
		// }

		// if (npc.body.moves) {
		// 	npc.body.setVelocity(0);
		// 	if (npc.direction === 'right') {
		// 		npc.body.setVelocityX(npc.speed);
		// 		npc.anims.play(npcKey + 'Right', true);
		// 		console.log(
		// 			`LEFT: x: ${npc.body.x} y: ${npc.y} | calculated destination: ${this.calculateXOffset(
		// 				npc.startX,
		// 				distance,
		// 				npc.direction
		// 			)}`
		// 		);
		// 		if (npc.body.x >= this.calculateXOffset(npc.startX, distance, npc.direction)) {
		// 			npc.startX = npc.x;
		// 			npc.startY = npc.y;
		// 			npc.moveIndex = npc.moveIndex + 1 === data.length ? 0 : npc.moveIndex + 1;
		// 		}
		// 	} else if (npc.direction === 'up') {
		// 		console.log(
		// 			`UP: y: ${npc.y} | calculated destination: ${this.calculateYOffset(
		// 				npc.startY,
		// 				distance,
		// 				npc.direction
		// 			)}`
		// 		);
		// 		npc.body.setVelocityY(-npc.speed);
		// 		npc.anims.play(npcKey + 'Up', true);
		// 		if (npc.body.y <= this.calculateYOffset(npc.startY, distance, npc.direction)) {
		// 			npc.moveIndex = npc.moveIndex + 1 === data.length ? 0 : npc.moveIndex + 1;
		// 		}
		// 	} else if (npc.direction === 'left') {
		// 		npc.body.setVelocityX(-npc.speed);
		// 		npc.anims.play(npcKey + 'Left', true);
		// 		if (npc.body.x <= this.calculateXOffset(npc.startX, distance, npc.direction)) {
		// 			npc.moveIndex = npc.moveIndex + 1 === data.length ? 0 : npc.moveIndex + 1;
		// 		}
		// 	} else if (npc.direction === 'down') {
		// 		npc.body.setVelocityY(npc.speed);
		// 		npc.anims.play(npcKey + 'Down', true);
		// 	}
		// }
		if (npc.body.moves) {
			if (!npc.direction) npc.direction = 'left';
			if (npc.direction === 'left') {
				npc.body.setVelocityX(-40);
				npc.anims.play(npc.texture.key + 'Left', true);
				if (npc.body.x <= 440) {
					npc.direction = 'right';
				}
			} else if (npc.direction === 'right') {
				npc.body.setVelocityX(40);
				npc.anims.play(npc.texture.key + 'Right', true);
				if (npc.body.x >= 490) {
					npc.direction = 'left';
				}
			}
		}
	}

	calculateXOffset(startX, distance, direction) {
		if (direction === 'right') {
			return startX + distance;
		} else if (direction === 'left') {
			return startX - distance;
		}
	}

	calculateYOffset(startY, distance, direction) {
		if (direction === 'up') {
			return startY - distance;
		} else if (direction === 'down') {
			return startY - distance;
		}
	}

	// Function to be called in Phaser.Scene's update method
	playerControls(player) {
		player.body.setVelocity(0);
		// Horizontal movement
		if (this.scene.cursors.left.isDown) {
			player.body.setVelocityX(-1 * player.speed);
			player.anims.play(player.texture.key + 'Left', true);
		} else if (this.scene.cursors.right.isDown) {
			player.body.setVelocityX(player.speed);
			player.anims.play(player.texture.key + 'Right', true);
		}

		// Vertical movement
		else if (this.scene.cursors.up.isDown) {
			player.body.setVelocityY(-1 * player.speed);
			player.anims.play(player.texture.key + 'Up', true);
		} else if (this.scene.cursors.down.isDown) {
			player.body.setVelocityY(player.speed);
			player.anims.play(player.texture.key + 'Down', true);
		} else {
		}
	}

	// Creates NPCs
	createCharacter({ characterKey, spawnData, animsKeys }) {
		this.spawnCharacter(characterKey, spawnData);
		this.createAnims(characterKey, animsKeys);
		return this.scene.NPCs.length - 1;
	}
}

export default CharacterMovement;
