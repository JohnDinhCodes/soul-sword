class DialogueModal extends Phaser.Plugins.ScenePlugin {
  constructor(scene, pluginManager) {
    super(scene, pluginManager);
  }

  boot() {
    const eventEmitter = this.systems.events;
    eventEmitter.once("shutdown", this.shutdown, this);
    eventEmitter.once("destroy", this.destroy, this);
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
    dialogueSpeed
  } = {}) {
    // set properties from options object or use defaults
    this.borderThickness = borderThickness || 3;
    this.borderColor = borderColor || 0x907748;
    this.borderAlpha = borderAlpha || 1;
    this.windowAlpha = windowAlpha || 0.8;
    this.windowColor = windowColor || 0x303030;
    this.windowHeight = windowHeight || 80;
    this.padding = padding || 0;
    this.closeBtnColor = closeBtnColor || "darkgoldenrod";
    this.dialogueSpeed = dialogueSpeed || 4;

    // used for animating the text
    this.eventCounter = 0;
    // if the dialog window is shown
    this.visible = true;
    // the current text in the window
    this.text;
    // the text that will be displayed in the window
    this.dialogue;
    this.graphics;
    this.closeBtn;
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
  calculateWindowDimensions(width, height) {
    const x = this.padding - this.getCameraX();
    const y = height - this.windowHeight - this.padding - this.getCameraY();
    const rectWidth = width - this.padding * 2;
    const rectHeight = this.windowHeight;
    return {
      x,
      y,
      rectWidth,
      rectHeight
    };
  }

  // Creates the inner dialogue window (where the text is displayed)
  createInnerWindow({ x, y, rectWidth, rectHeight }) {
    this.graphics.fillStyle(this.windowColor, this.windowAlpha);
    this.graphics.fillRect(x + 1, y + 1, rectWidth - 1, rectHeight - 1);
  }

  // Creates the border rectangle of the dialogue window
  createOuterWindow({ x, y, rectWidth, rectHeight }) {
    this.graphics.lineStyle(
      this.borderThickness,
      this.borderColor,
      this.borderAlpha
    );
    this.graphics.strokeRect(x, y, rectWidth, rectHeight);
  }

  // Creates the close dialogue window button
  createCloseModalButton() {
    this.closeBtn = this.scene.make.text({
      x: this.getGameWidth() - this.padding - 14 - this.getCameraX(),
      y:
        this.getGameHeight() -
        this.windowHeight -
        this.padding +
        3 -
        this.getCameraY(),
      text: "X",
      style: {
        font: "bold 12px Arial",
        fill: this.closeBtnColor
      }
    });
    this.closeBtn.setInteractive();

    this.closeBtn.on("pointerover", function() {
      this.setTint(0xff0000);
    });

    this.closeBtn.on("pointerout", function() {
      this.clearTint();
    });
    this.closeBtn.on("pointerdown", () => {
      this.closeWindow();
    });
  }

  // Creates the close dialogue button border
  createCloseModalButtonBorder() {
    const x = this.getGameWidth() - this.padding - 20 - this.getCameraX();
    const y =
      this.getGameHeight() -
      this.windowHeight -
      this.padding -
      this.getCameraY();
    this.graphics.strokeRect(x, y, 20, 20);
  }

  // Hide/Show the dialogue window
  closeWindow() {
    this.visible = false;
    if (this.text) this.text.visible = false;
    if (this.graphics) this.graphics.visible = false;
    if (this.closeBtn) this.closeBtn.visible = false;
    if (this.timedEvent) this.timedEvent.remove();
    if (this.text) this.text.destroy();

    // Sets player's canMove value to true.
    // (Make sure you set your player's spritesheet key to "player")
    this.scene.player.canMove = true;
  }

  // Sets the text for the dialogue window
  setText(text, animate = true) {
    // Reset the dialogue
    this.eventCounter = 0;
    this.dialogue = text.split("");
    if (this.timedEvent) this.timedEvent.remove();

    const tempText = animate ? "" : text;
    this._setText(tempText);

    if (animate) {
      this.timedEvent = this.scene.time.addEvent({
        delay: 150 - this.dialogueSpeed * 30,
        callback: this.animateText,
        callbackScope: this,
        loop: true
      });
    }
  }

  _setText(text) {
    // Reset the dialogue
    if (this.text) this.text.destroy();

    const x = this.padding + 10 - this.getCameraX();
    const y =
      this.getGameHeight() -
      this.windowHeight -
      this.padding +
      10 -
      this.getCameraY();

    this.text = this.scene.make.text({
      x,
      y,
      text,
      style: {
        wordWrap: {
          width: this.getGameWidth() - this.padding * 2 - 25
        }
      }
    });
  }

  // Slowly displays the text in the window to make it appear annimated
  animateText() {
    this.eventCounter++;
    this.text.setText(this.text.text + this.dialogue[this.eventCounter - 1]);
    if (this.eventCounter === this.dialogue.length) {
      this.timedEvent.remove();
    }
  }

  // Creates the dialogue window
  createWindow() {
    const gameHeight = this.getGameHeight();
    const gameWidth = this.getGameWidth();
    const dimensions = this.calculateWindowDimensions(gameWidth, gameHeight);
    this.graphics = this.scene.add.graphics();

    this.createOuterWindow(dimensions);
    this.createInnerWindow(dimensions);

    this.createCloseModalButton();
    this.createCloseModalButtonBorder();
  }

  playDialogue([...text]) {
    // Set player's canMove value to false
    this.scene.player.canMove = false;
    let dialogueIndex = 1;
    this.createWindow();
    // Automatically play first line in dialogue array
    this.setText(text[0]);

    // Closes window when Z key is pressed
    // (Map this to anything you want)
    this.scene.input.keyboard.on("keydown_Z", () => {
      this.scene.input.keyboard.removeAllListeners();
      this.closeWindow();
    });

    this.scene.input.keyboard.on("keydown_X", () => {
      if (dialogueIndex === text.length) {
        this.scene.input.keyboard.removeAllListeners();
        this.canMove = true;
        this.closeWindow();
      } else {
        this.setText(text[dialogueIndex]);
        dialogueIndex++;
      }
    });
  }
}

export default DialogueModal;
