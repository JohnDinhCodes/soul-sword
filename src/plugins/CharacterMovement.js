import Phaser from 'phaser';
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
			this.scene.NPCs[this.scene.NPCs.length - 1].body.immovable = true;
		}
	}

	// Create character animation
	createAnims(characterKey, animsKeys) {
		for (let animsKey in animsKeys) {
			this.scene.anims.create({
				key: animsKey,
				frames: this.scene.anims.generateFrameNames(characterKey, {
					frames: animsKeys[animsKey],
				}),
				frameRate: 10,
			});
		}
	}

	// Function to be called in Phaser.Scene's update method
	playerControls(player) {
		player.body.setVelocity(0);
		// Horizontal movement
		if (this.scene.cursors.left.isDown) {
			player.body.setVelocityX(-1 * player.speed);
			player.anims.play('left', true);
		} else if (this.scene.cursors.right.isDown) {
			player.body.setVelocityX(player.speed);
			player.anims.play('right', true);
		}

		// Vertical movement
		else if (this.scene.cursors.up.isDown) {
			player.body.setVelocityY(-1 * player.speed);
			player.anims.play('up', true);
		} else if (this.scene.cursors.down.isDown) {
			player.body.setVelocityY(player.speed);
			player.anims.play('down', true);
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
