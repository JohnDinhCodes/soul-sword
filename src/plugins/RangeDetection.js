class RangeDetection extends Phaser.Plugins.ScenePlugin {
	constructor(scene, pluginManager) {
		super(scene, pluginManager);
	}

	init(invisibleBlockKey, player) {
		this.blockKey = invisibleBlockKey;
		this.scene[invisibleBlockKey] = this.scene.physics.add.sprite(0, 0, invisibleBlockKey);
		this.scene[invisibleBlockKey].setSize(player.width, player.height);
		this.scene.input.keyboard.on('keydown_X', () => {
			this.scene[invisibleBlockKey].x = player.x;
			this.scene[invisibleBlockKey].y = player.y;
			this.checkOverlap(this.scene[invisibleBlockKey], this.scene.NPCs, player);
		});
	}

	checkOverlap(block, NPCs, player) {
		this.scene.physics.overlap(NPCs, block, npc => {
			npc.canMove = false;
			// npc.anims.play(npc.texture.key + 'Up');
			if (player.direction === 'right') npc.anims.play(npc.texture.key + 'Left');
			else if (player.direction === 'left') npc.anims.play(npc.texture.key + 'Right');
			else if (player.direction === 'down') npc.anims.play(npc.texture.key + 'Up');
			else if (player.direction === 'up') npc.anims.play(npc.texture.key + 'Down');
			console.log(npc, this.scene.player);
		});
	}

	setBlockPosition(player) {
		this.scene[this.blockKey].x = player.x;
		this.scene[this.blockKey].y = player.y;
		if (player.direction === 'right') {
			this.scene[this.blockKey].x += 32;
		} else if (player.direction === 'left') {
			this.scene[this.blockKey].x -= 32;
		} else if (player.direction === 'down') {
			this.scene[this.blockKey].y += 32;
		} else if (player.direction === 'up') {
			this.scene[this.blockKey].y -= 32;
		}
	}
	// when user presses x, => this.keyboard.on keydown thing
	// run function where it checks overlap, (obj1, arr of NPCs)
	// create One big array of things player can interact with
}

export default RangeDetection;
