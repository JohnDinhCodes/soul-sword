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
        "Please set a scene value for opts with",
        "\nhttps://photonstorm.github.io/phaser3-docs/Phaser.Plugins.PluginManager.html#install__anchor"
      );
    }
    // set properties from opts object or use defaults
    this.borderThickness = opts.borderThickness || 3;
    this.borderColor = opts.borderColor || 0x907748;
    this.borderAlpha = opts.borderAlpha || 1;
    this.windowAlpha = opts.windowAlpha || 0.8;
    this.windowColor = opts.windowColor || 0x303030;
    this.windowHeight = opts.windowHeight || 150;
    this.padding = opts.padding || 32;
    this.closeBtnColor = opts.closeBtnColor || "darkgoldenrod";
    this.dialogSpeed = opts.dialogSpeed || 3;
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

  calculateWindowDimensions(width, height) {
    const x = this.padding;
    const y = height - this.windowHeight - this.padding;
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
      x: this.getGameWidth() - this.padding - 14,
      y: this.getGameHeight() - this.windowHeight - this.padding + 3,
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
      this.toggleWindow();
    });
  }

  createCloseModalButtonBorder() {
    const x = this.getGameWidth() - this.padding - 20;
    const y = this.getGameHeight() - this.windowHeight - this.padding;
    this.graphics.strokeRect(x, y, 20, 20);
  }

  createWindow() {
    console.log("createWindow is being called");
    const gameHeight = this.getGameHeight();
    const gameWidth = this.getGameWidth();
    const dimensions = this.calculateWindowDimensions(gameWidth, gameHeight);
    this.graphics = this.scene.add.graphics();
    this.createOuterWindow(dimensions);
    this.createInnerWindow(dimensions);
    this.createCloseModalButton();
    this.createCloseModalButtonBorder();
  }
}

export default DialogueModal;
