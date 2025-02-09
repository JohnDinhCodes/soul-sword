class DialogueModal extends Phaser.Plugins.ScenePlugin {
	constructor(scene, pluginManager) {
		super(scene, pluginManager);
	}

	boot() {
		const eventEmitter = this.systems.events;
		eventEmitter.once('shutdown', this.shutdown, this);
		eventEmitter.once('destroy', this.destroy, this);
	}

	init({
		borderThickness,
		borderColor,
		borderAlpha,
		windowAlpha,
		windowColor,
		windowHeight,
		padding,
		closeBtnColor,
		dialogueSpeed,
		textBlip,
	} = {}) {
		// set properties from options object or use defaults
		this.borderThickness = borderThickness || 3;
		this.borderColor = borderColor || 0x907748;
		this.borderAlpha = borderAlpha || 1;
		this.windowAlpha = windowAlpha || 0.8;
		this.windowColor = windowColor || 0x303030;
		this.windowHeight = windowHeight || 80;
		this.padding = padding || 0;
		this.closeBtnColor = closeBtnColor || 'darkgoldenrod';
		this.dialogueSpeed = dialogueSpeed || 4;
		this.textBlip = textBlip || undefined;

		// used for animating the text
		this.eventCounter = 0;
		// if the dialog window is shown
		this.visible = true;
		// the current text in the window
		this.text;
		// the text that will be displayed in the window
		this.dialogue;
		this.dialogueGraphics;
		this.yesNoGraphics;
		this.closeBtn;

		this.scene.dialogueIsPlaying = false;

		// Setup dimensions for yes/no options
	}

	shutdown() {
		if (this.timedEvent) this.timedEvent.remove();
		if (this.text) this.text.destroy();
	}

	// Gets the width of the game (based on the scene)
	getGameWidth() {
		return this.scene.sys.game.config.width;
	}

	// Gets the height of the game (based on the scene)
	getGameHeight() {
		return this.scene.sys.game.config.height;
	}

	// returns x offset value when camera moves
	getCameraX() {
		let x = this.getGameWidth() / 2 - this.scene.cameras.main.midPoint.x;
		return x > 0 ? 0 : x;
	}

	//  returns y offset value when camera moves
	getCameraY() {
		const y = this.getGameHeight() / 2 - this.scene.cameras.main.midPoint.y;
		return y > 0 ? 0 : y;
	}

	// Calculates where to place the dialogue window
	calculateWindowDimensions(width, height, isYesNoDialogue) {
		let x = this.padding - this.getCameraX();
		let y = height - this.windowHeight - this.padding - this.getCameraY();
		let rectWidth = width - this.padding * 2;
		let rectHeight = this.windowHeight;
		if (isYesNoDialogue) {
			x += 375;
			y -= 80;
			rectHeight /= 2.5;
			rectWidth -= 400;
		}
		return {
			x,
			y,
			rectWidth,
			rectHeight,
		};
	}

	// Creates the inner dialogue window (where the text is displayed)
	createInnerWindow({ x, y, rectWidth, rectHeight }, isYesNoDialogue = false) {
		if (isYesNoDialogue) {
			this.yesNoGraphics.fillStyle(this.windowColor, this.windowAlpha);
			this.yesNoGraphics.fillRect(x + 1, y + 1, rectWidth - 1, rectHeight - 1);
		} else {
			this.dialogueGraphics.fillStyle(this.windowColor, this.windowAlpha);
			this.dialogueGraphics.fillRect(x + 1, y + 1, rectWidth - 1, rectHeight - 1);
		}
	}

	// Creates the border rectangle of the dialogue window
	createOuterWindow({ x, y, rectWidth, rectHeight }, isYesNoDialogue = false) {
		if (isYesNoDialogue) {
			this.yesNoGraphics.lineStyle(this.borderThickness, this.borderColor, this.borderAlpha);
			this.yesNoGraphics.strokeRect(x, y, rectWidth, rectHeight);
		} else {
			this.dialogueGraphics.lineStyle(this.borderThickness, this.borderColor, this.borderAlpha);
			this.dialogueGraphics.strokeRect(x, y, rectWidth, rectHeight);
		}
	}

	// Creates the close dialogue window button
	// createCloseModalButton() {
	// 	this.closeBtn = this.scene.make.text({
	// 		x: this.getGameWidth() - this.padding - 14 - this.getCameraX(),
	// 		y: this.getGameHeight() - this.windowHeight - this.padding + 3 - this.getCameraY(),
	// 		text: 'X',
	// 		style: {
	// 			font: 'bold 12px Arial',
	// 			fill: this.closeBtnColor,
	// 		},
	// 	});
	// 	this.closeBtn.setInteractive();

	// 	this.closeBtn.on('pointerover', function() {
	// 		this.setTint(0xff0000);
	// 	});

	// 	this.closeBtn.on('pointerout', function() {
	// 		this.clearTint();
	// 	});
	// }

	// Creates the close dialogue button border
	// createCloseModalButtonBorder() {
	// 	const x = this.getGameWidth() - this.padding - 20 - this.getCameraX();
	// 	const y = this.getGameHeight() - this.windowHeight - this.padding - this.getCameraY();
	// 	this.dialogueGraphics.strokeRect(x, y, 20, 20);
	// }

	// Hide/Show the dialogue window
	closeWindow(obj) {
		if (this.scene.dialogueIsPlaying) {
			this.scene.dialogueIsPlaying = false;
		}

		this.visible = false;
		if (this.text) this.text.visible = false;
		if (this.dialogueGraphics) this.dialogueGraphics.visible = false;
		if (this.closeBtn) this.closeBtn.visible = false;
		if (this.timedEvent) this.timedEvent.remove();
		if (this.text) this.text.destroy();

		// Sets player's canMove value to true.
		// (Make sure you set your player's spritesheet key to "player")
		this.scene.player.canMove = true;
		if (obj) obj.canMove = true;
	}

	// Sets the text for the dialogue window
	setText(text, animate = true) {
		// Reset the dialogue
		this.eventCounter = 0;
		this.dialogue = text.split('');
		if (this.timedEvent) this.timedEvent.remove();

		const tempText = animate ? '' : text;
		this._setText(tempText);

		if (animate) {
			this.timedEvent = this.scene.time.addEvent({
				delay: 150 - this.dialogueSpeed * 30,
				callback: this.animateText,
				callbackScope: this,
				loop: true,
			});
		}
	}

	_setText(text) {
		// Reset the dialogue
		if (this.text) this.text.destroy();

		const x = this.padding + 10 - this.getCameraX();
		const y = this.getGameHeight() - this.windowHeight - this.padding + 10 - this.getCameraY();

		this.text = this.scene.make.text({
			x,
			y,
			text,
			style: {
				wordWrap: {
					width: this.getGameWidth() - this.padding * 2 - 25,
				},
			},
		});
	}

	// Slowly displays the text in the window to make it appear annimated
	animateText() {
		this.textBlip.play();
		this.eventCounter++;
		this.text.setText(this.text.text + this.dialogue[this.eventCounter - 1]);
		if (this.eventCounter === this.dialogue.length) {
			this.timedEvent.remove();
		}
	}

	createChoiceWindow() {
		this.scene.choiceIsOn = true;
		if (!this.scene.yesNoChoice) this.scene.yesNoChoice = 'yes';
		this.yesNoGraphics = this.scene.add.graphics();
		this.yesDimension = this.calculateWindowDimensions(this.getGameWidth(), this.getGameHeight(), true);
		this.noDimension = this.calculateWindowDimensions(this.getGameWidth(), this.getGameHeight() + 35, true);

		let x = this.padding + 10 - this.getCameraX() + 390;
		let y = this.getGameHeight() - this.windowHeight - this.padding - this.getCameraY() - 70;

		this.yesText = this.scene.make.text({
			x,
			y,
			text: 'YES',
			style: {
				wordWrap: {
					width: this.getGameWidth() - this.padding * 2 - 25,
				},
			},
		});

		this.noText = this.scene.make.text({
			x: (x += 6),
			y: (y += 35),
			text: 'NO',
			style: {
				wordWrap: {
					width: this.getGameWidth() - this.padding * 2 - 25,
				},
			},
		});

		if (this.scene.yesNoChoice === 'yes') {
			this.createOuterWindow(this.yesDimension, true);
		} else if (this.scene.yesNoChoice === 'no') {
			this.createOuterWindow(this.noDimension, true);
		} else {
			console.log('Uh oh, this is not supposed to happen');
		}

		this.createInnerWindow(this.yesDimension, true);
		this.createInnerWindow(this.noDimension, true);
	}

	toggleChoice() {
		if (this.scene.yesNoChoice === 'yes') {
			this.scene.yesNoChoice = 'no';
		} else if (this.scene.yesNoChoice === 'no') {
			this.scene.yesNoChoice = 'yes';
		} else {
			console.log('This is not supposed to happen');
		}
		this.closeChoiceWindow();
		this.createChoiceWindow();
	}

	closeChoiceWindow() {
		this.scene.choiceIsOn = false;
		this.yesText.destroy();
		this.noText.destroy();
		if (this.yesNoGraphics) this.yesNoGraphics.destroy();
		if (this.timedEvent) this.timedEvent.remove();
	}

	// Creates the dialogue window
	createWindow() {
		this.scene.dialogueIsPlaying = true;
		const gameHeight = this.getGameHeight();
		const gameWidth = this.getGameWidth();
		const dimensions = this.calculateWindowDimensions(gameWidth, gameHeight);
		this.dialogueGraphics = this.scene.add.graphics();

		this.createOuterWindow(dimensions);
		this.createInnerWindow(dimensions);

		// this.createCloseModalButton();
		// this.createCloseModalButtonBorder();
	}

	playDialogue([...text], player, obj) {
		// Set player's canMove value to false
		player.canMove = false;
		// If obj is passed, disable movement for them
		if (obj) obj.canMove = false;
		// Might change name later | dialogue might not be only for NPCs
		this.currentNPC = obj;

		// Sets index to the second element in text array (first element automatically plays)
		// Sets DialogueModal.dialogueIndex to event handler from Scene can access it
		this.dialogueIndex = 1;

		// Renders the dialogue window
		this.createWindow();

		// Automatically play first line in dialogue array
		this.setText(text[0]);

		// sets the text arr passed through to DialogueModal.dialogueArr so event handler from Scene can access the arr
		this.dialogueArr = text;
	}

	keydownXHandler() {
		// If statement to check if all DialogueModal.dialogueArr elements have been played
		if (this.dialogueIndex === this.dialogueArr.length) {
			// Pass along NPC to resume NPC's movement
			this.closeWindow(this.currentNPC);
		} else {
			// Play text, then increase DialogueModal.dialogueIndex by 1;
			this.setText(this.dialogueArr[this.dialogueIndex]);
			this.dialogueIndex++;
		}
	}
}

export default DialogueModal;
