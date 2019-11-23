class DialogueModal extends Phaser.Plugins.ScenePlugin {
  constructor(scene, pluginManager) {
    super(scene, pluginManager);
  }

  boot() {
    const eventEmitter = this.systems.events;
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

    this.createWindow();
  }

  destroy() {}

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

  // Creates the dialogue window
  createWindow() {
    const gameHeight = this.getGameHeight();
    const gameWidth = this.getGameWidth();
    const dimensions = this.calculateWindowDimensions(gameWidth, gameHeight);
    this.graphics = this.scene.add.graphics();

    this.createOuterWindow(dimensions);
    this.createInnerWindow(dimensions);
  }
}

export default DialogueModal;
