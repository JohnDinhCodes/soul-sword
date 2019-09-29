class StartMenu {
    constructor({ startBtn, clickSound, startWindow }) {
        this.startBtn = startBtn;
        this.clickSound = clickSound;
        this.startWindow = startWindow;
    }

    startBtnClick(callback) {
        this.startBtn.addEventListener("click", e => {
            this.clickSound.play();
            this.startWindow.remove();
            callback();
        });
    }
}

module.exports = StartMenu;