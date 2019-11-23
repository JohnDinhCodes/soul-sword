import Phaser from 'phaser';
class CharacterMovement extends Phaser.Plugins.ScenePlugin {
	constructor(scene, pluginManager) {
		super(scene, pluginManager);
	}

	// Spawn and setup main player in scene
	init({ characterKey, animsKeys, spawnData }) {
		// Creates cursors for your scene
		this.scene.cursors = this.scene.input.keyboard.createCursorKeys();

		// Spawns Main Player
		this.spawnCharacter(characterKey, spawnData);

		// Initializes animations for Main Player
		this.createAnims(characterKey, animsKeys);
	}

	spawnCharacter(characterKey, { x, y, initialFrame }) {
		this.scene[characterKey] = this.scene.physics.add.sprite(x, y, characterKey, initialFrame);
	}

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
}

export default CharacterMovement;
