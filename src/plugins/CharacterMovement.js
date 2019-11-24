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

	npcMovement(npc) {
		npc.body.setVelocity(0);
		if (npc.body.touching.none) {
			npc.body.moves = true;
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
		} else {
			npc.body.moves = false;
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
	}
}

export default CharacterMovement;
