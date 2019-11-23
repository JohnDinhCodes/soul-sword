import Phaser from 'phaser';
class CharacterMovement extends Phaser.Plugins.ScenePlugin {
	constructor(scene, pluginManager) {
		super(scene, pluginManager);
	}

	init() {
		// Creates cursors for your scene
		this.scene.cursors = this.scene.input.keyboard.createCursorKeys();
		console.log(this.scene.cursors);
	}

	spawnCharacter(characterKey, x, y, initialFrame) {
		this.scene[characterKey] = this.scene.physics.add.sprite(x, y, characterKey, initialFrame);
	}

	createAnims({ character, animsKeys }) {
		// might not need this line
		if (!this[character]) this[character] = character;
		for (let animsKey in animsKeys) {
			this.scene.anims.create({
				key: animsKey,
				frames: this.scene.anims.generateFrameNames(character, {
					frames: animsKeys[animsKey],
				}),
				frameRate: 10,
			});
		}
	}
}

export default CharacterMovement;
