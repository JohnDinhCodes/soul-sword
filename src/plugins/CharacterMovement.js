class CharacterMovement extends Phaser.Plugins.ScenePlugin {
    constructor(scene, pluginManager) {
        super(scene, pluginManager);
    }

    // Spawn and setup main player in scene
    init(playerData, isMobile) {
        // Creates cursors for your scene
        if (!isMobile) {
            this.scene.cursors = this.scene.input.keyboard.createCursorKeys();
        }
        this.auraKey = playerData.auraKey;
        this.createCharacter(playerData);
    }

    // Spawns character at X, Y coordinate with an initial frame
    spawnCharacter(characterKey, speed, { x, y, initialFrame }) {
        if (characterKey === "player") {
            this.scene[characterKey] = this.scene.physics.add.sprite(
                x,
                y,
                characterKey,
                initialFrame
            );
            this.scene[characterKey].speed = speed;
        } else {
            // Adds NPC to scene's NPC array and makes them immovable
            this.scene.NPCs.push(
                this.scene.physics.add.sprite(x, y, characterKey, initialFrame)
            );
            this.scene.NPCs[this.scene.NPCs.length - 1].speed = speed;
            this.scene.NPCs[this.scene.NPCs.length - 1].body.immovable = true;
            this.scene.NPCs[this.scene.NPCs.length - 1].body.movable = false;
            this.scene.NPCs[this.scene.NPCs.length - 1].canMove = true;
            this.scene.NPCs[this.scene.NPCs.length - 1].speed = 40;
            this.scene.NPCs[characterKey] = this.scene.NPCs.length - 1;
        }
    }

    // Create character animation
    createAnims(characterKey, animsKeys) {
        for (let animsKey in animsKeys) {
            this.scene.anims.create({
                key: characterKey + animsKey,
                frames: this.scene.anims.generateFrameNames(characterKey, {
                    frames: animsKeys[animsKey]
                }),
                frameRate: 10
            });
        }
    }

    setTurnCoords(npc, length) {
        const npcKey = npc.texture.key;
        npc.startX = npc.x;
        npc.startY = npc.y;
        npc.moveIndex = npc.moveIndex + 1 === length ? 0 : npc.moveIndex + 1;
    }

    npcMovement(npc, data) {
        npc.setVelocity(0);
        const npcKey = npc.texture.key;
        // Allows character to move by default
        npc.body.moves = true;
        this.scene.physics.overlap(this.scene[this.auraKey], npc, () => {
            // If NPC is overlapping player's invisible aura sprite, npc stops moving
            npc.body.moves = false;
        });

        // If first time running, this will initialize the startX and startY with the NPC's spawn x & y
        if (!npc.moveIndex && !npc.startX) {
            npc.moveIndex = 0;
            npc.startX = npc.x;
            npc.startY = npc.y;
        }

        // Sets NPC's direction and distance (amount of values in the x/y plane to move) by current moveIndex
        const direction = data[npc.moveIndex].direction;
        const distance = data[npc.moveIndex].value;

        if (npc.canMove) {
            if (direction === "right") {
                this.scene.physics.moveTo(
                    npc,
                    npc.startX + distance,
                    npc.startY,
                    npc.speed
                );
                npc.anims.play(npcKey + "Right", true);
                if (Math.floor(npc.x) === Math.floor(npc.startX + distance)) {
                    this.setTurnCoords(npc, data.length);
                }
            } else if (direction === "up") {
                this.scene.physics.moveTo(
                    npc,
                    npc.startX,
                    npc.startY - distance,
                    npc.speed
                );
                npc.anims.play(npcKey + "Up", true);
                if (Math.floor(npc.y) === Math.floor(npc.startY - distance)) {
                    this.setTurnCoords(npc, data.length);
                }
            } else if (direction === "left") {
                this.scene.physics.moveTo(
                    npc,
                    npc.startX - distance,
                    npc.startY,
                    npc.speed
                );
                npc.anims.play(npcKey + "Left", true);
                if (Math.floor(npc.x) === Math.floor(npc.startX - distance)) {
                    this.setTurnCoords(npc, data.length);
                }
            } else if (direction === "down") {
                this.scene.physics.moveTo(
                    npc,
                    npc.startX,
                    npc.startY + distance,
                    npc.speed
                );
                npc.anims.play(npcKey + "Down", true);
                if (Math.floor(npc.y) === Math.floor(npc.startY + distance)) {
                    this.setTurnCoords(npc, data.length);
                }
            }
        }
    }

    // Function to be called in Phaser.Scene's update method
    playerControls(player) {
        player.body.setVelocity(0);
        // Horizontal movement
        if (this.scene.cursors.left.isDown) {
            player.body.setVelocityX(-1 * player.speed);
            player.anims.play(player.texture.key + "Left", true);
            player.direction = "left";
            this.scene.cursors.active = true;
        } else if (this.scene.cursors.right.isDown) {
            player.body.setVelocityX(player.speed);
            player.anims.play(player.texture.key + "Right", true);
            player.direction = "right";
            this.scene.cursors.active = true;
        }

        // Vertical movement
        else if (this.scene.cursors.up.isDown) {
            player.body.setVelocityY(-1 * player.speed);
            player.anims.play(player.texture.key + "Up", true);
            player.direction = "up";
            this.scene.cursors.active = true;
        } else if (this.scene.cursors.down.isDown) {
            player.body.setVelocityY(player.speed);
            player.anims.play(player.texture.key + "Down", true);
            player.direction = "down";
            this.scene.cursors.active = true;
        } else {
            this.scene.cursors.active = false;
        }
    }

    // Creates NPCs
    createCharacter({ characterKey, spawnData, animsKeys, speed }) {
        this.spawnCharacter(characterKey, speed, spawnData);
        this.createAnims(characterKey, animsKeys);
        if (characterKey !== "player") {
            // when an NPC is created, you can set this method to a variable to get that NPC's index in Scene.NPCs[]
            return this.scene.NPCs.length - 1;
        }
    }
}

export default CharacterMovement;
