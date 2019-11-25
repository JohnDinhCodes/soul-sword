class PlayerRange extends Phaser.Plugins.ScenePlugin {
    constructor(scene, pluginManager) {
        super(scene, pluginManager);
    }

    init(inFrontBlock, playerAura, player) {
        // A string that references the invisible sprite that is going to be in front of player
        this.blockKey = inFrontBlock;
        // A string that references the invisible sprite that will be around the player
        this.auraKey = playerAura;

        // Reference to the player
        this.player = player;
        this.playerWidth = player.body.width;

        // Letting Scene[inFrontBlock] reference the sprite for event listeners in Scene
        this.scene[inFrontBlock] = this.scene.physics.add.sprite(
            0,
            0,
            inFrontBlock
        );

        // Sets the size of the invisible block
        // Might change this later to have a single dot in front of player
        this.scene[inFrontBlock].setSize(player.width - 10, player.height - 10);

        // Might change the name "Aura"
        // Creates invisible sprite that surrounds player
        this.scene[playerAura] = this.scene.physics.add.sprite(
            0,
            0,
            playerAura
        );
        this.scene[playerAura].setSize(player.width + 2, player.height + 2);

        // See checkOverlap method for use of this.actionData
        this.actionData = null;
    }

    checkOverlap(block, NPCs) {
        // resets this.actionData to null
        this.actionData = null;
        // checks overlap with invisible block, and an Array of NPCs
        // Callback function has an argument of "npc" which is the value of an NPC overlapping the box
        // if there is no overlap between an NPC and the block, npc will be undefined
        this.scene.physics.overlap(NPCs, block, npc => {
            // based on the player direction, the NPC will turn towards the player
            if (this.player.direction === "right")
                npc.anims.play(npc.texture.key + "Left");
            else if (this.player.direction === "left")
                npc.anims.play(npc.texture.key + "Right");
            else if (this.player.direction === "down")
                npc.anims.play(npc.texture.key + "Up");
            else if (this.player.direction === "up")
                npc.anims.play(npc.texture.key + "Down");
            // sets this.actionData to an object with the npc, and the npc's dialogue
            this.actionData = {
                npc,
                dialogue: npc.dialogue
            };
        });
        return this.actionData;
    }

    // The following methods are meant to be called in Scene's update method

    // sets the "aura" sprite to be around the player
    setBlockOnPlayer() {
        this.scene[this.auraKey].x = this.player.x;
        this.scene[this.auraKey].y = this.player.y;
    }

    // Sets the "actionBlock" to be in front of the player
    setBlockInFront() {
        this.scene[this.blockKey].x = this.player.x;
        this.scene[this.blockKey].y = this.player.y;
        if (this.player.direction === "right") {
            this.scene[this.blockKey].x += this.playerWidth;
        } else if (this.player.direction === "left") {
            this.scene[this.blockKey].x -= this.playerWidth;
        } else if (this.player.direction === "down") {
            this.scene[this.blockKey].y += this.playerWidth;
        } else if (this.player.direction === "up") {
            this.scene[this.blockKey].y -= this.playerWidth;
        }
    }
    // when user presses x, => this.keyboard.on keydown thing
    // run function where it checks overlap, (obj1, arr of NPCs)
    // create One big array of things player can interact with ?
}

export default PlayerRange;
