class PlayerRange extends Phaser.Plugins.ScenePlugin {
	constructor(scene, pluginManager) {
		super(scene, pluginManager);
	}

	init(inFrontBlock, player) {
		this.blockKey = inFrontBlock;
		this.player = player;
		this.scene[inFrontBlock] = this.scene.physics.add.sprite(0, 0, inFrontBlock);
		this.scene[inFrontBlock].setSize(player.width - 10, player.height - 10);
		this.actionData = null;
	}

	checkOverlap(block, NPCs) {
		this.actionData = null;
		this.scene.physics.overlap(NPCs, block, npc => {
			if (this.player.direction === 'right') npc.anims.play(npc.texture.key + 'Left');
			else if (this.player.direction === 'left') npc.anims.play(npc.texture.key + 'Right');
			else if (this.player.direction === 'down') npc.anims.play(npc.texture.key + 'Up');
			else if (this.player.direction === 'up') npc.anims.play(npc.texture.key + 'Down');
			this.actionData = {
				npc,
				dialogue: npc.dialogue,
			};
		});
		return this.actionData;
	}

	setBlockInFront() {
		this.scene[this.blockKey].x = this.player.x;
		this.scene[this.blockKey].y = this.player.y;
		if (this.player.direction === 'right') {
			this.scene[this.blockKey].x += 32;
		} else if (this.player.direction === 'left') {
			this.scene[this.blockKey].x -= 32;
		} else if (this.player.direction === 'down') {
			this.scene[this.blockKey].y += 32;
		} else if (this.player.direction === 'up') {
			this.scene[this.blockKey].y -= 32;
		}
	}
	// when user presses x, => this.keyboard.on keydown thing
	// run function where it checks overlap, (obj1, arr of NPCs)
	// create One big array of things player can interact with ?
}

export default PlayerRange;
