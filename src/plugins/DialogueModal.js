import Phaser from "phaser";
class DialogueModal extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager, scene) {
    super(pluginManager);
  }

  // Initialize the dialogue modal
  init(opts) {
    if (!opts) {
      opts = {};
      console.log(
        "Please set scene in opts data with the following",
        "\nhttps://photonstorm.github.io/phaser3-docs/Phaser.Plugins.PluginManager.html#install__anchor"
        //   install plugin in a Phaser.Scene class
        //   let plugin = this.plugins.install(
        //   "dialogueModal",
        //   dialogueModal,
        //   true,
        //   "dialogueModal",
        //   { scene: this } <--- you need to pass at least the scene to make plugin work
        // );
        // plugin.createWindow();
      );
    }
    // set properties from opts object or use defaults
    this.borderThickness = opts.borderThickness || 3;
    this.borderColor = opts.borderColor || 0x907748;
    this.borderAlpha = opts.borderAlpha || 1;
    this.windowAlpha = opts.windowAlpha || 0.8;
    this.windowColor = opts.windowColor || 0x303030;
    this.windowHeight = opts.windowHeight || 80;
    this.padding = opts.padding || 0;
    this.closeBtnColor = opts.closeBtnColor || "darkgoldenrod";
    this.dialogueSpeed = opts.dialogSpeed || 4;
    this.scene = opts.scene;

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

  getGameWidth() {
    return this.scene.sys.game.config.width;
  }

  getGameHeight() {
    return this.scene.sys.game.config.height;
  }

  getCameraX() {
    let x = this.getGameWidth() / 2 - this.scene.cameras.main.midPoint.x;
    return x > 0 ? 0 : x;
  }

  getCameraY() {
    const y = this.getGameHeight() / 2 - this.scene.cameras.main.midPoint.y;
    return y > 0 ? 0 : y;
  }

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

  createInnerWindow({ x, y, rectWidth, rectHeight }) {
    this.graphics.fillStyle(this.windowColor, this.windowAlpha);
    this.graphics.fillRect(x + 1, y + 1, rectWidth - 1, rectHeight - 1);
  }

  createOuterWindow({ x, y, rectWidth, rectHeight }) {
    this.graphics.lineStyle(
      this.borderThickness,
      this.borderColor,
      this.borderAlpha
    );
    this.graphics.strokeRect(x, y, rectWidth, rectHeight);
  }

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
      this.scene.input.keyboard.removeAllListeners();

      this.closeWindow();
    });

    this.scene.input.keyboard.on("keydown_Z", () => {
      this.closeWindow();
    });
  }

  closeWindow() {
    this.toggleWindow(false);
    if (this.timedEvent) this.timedEvent.remove();
    if (this.text) this.text.destroy();
    this.scene.canMove = true;
  }

  createCloseModalButtonBorder() {
    const x = this.getGameWidth() - this.padding - 20 - this.getCameraX();
    const y =
      this.getGameHeight() -
      this.windowHeight -
      this.padding -
      this.getCameraY();
    this.graphics.strokeRect(x, y, 20, 20);
  }

  toggleWindow(setValue) {
    if (setValue === false) {
      this.visible = setValue;
    } else {
      this.visible = !this.visible;
    }
    if (this.text) this.text.visible = this.visible;
    if (this.graphics) this.graphics.visible = this.visible;
    if (this.closeBtn) this.closeBtn.visible = this.visible;
  }

  setText(text, animate) {
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
        wordWrap: { width: this.getGameWidth() - this.padding * 2 - 25 }
      }
    });
  }

  animateText() {
    this.eventCounter++;
    this.text.setText(this.text.text + this.dialogue[this.eventCounter - 1]);
    if (this.eventCounter === this.dialogue.length) {
      this.timedEvent.remove();
    }
  }

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

  destroy() {
    this.scene.input.keyboard.removeAllListeners();

    if (this.timedEvent) this.timedEvent.remove();
    if (this.text) this.text.destroy();
  }
}

export default DialogueModal;
