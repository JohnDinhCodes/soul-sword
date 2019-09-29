import Character from "./Character";
class CreationMenu {
    constructor({ clickSound, createWindow, createMusic, createForm }) {
        this.clickSound = clickSound;
        this.createMusic = createMusic;
        this.createWindow = createWindow;
        this.createForm = createForm;
    }

    showMenu() {
        this.createMusic.play();
        this.createWindow.classList.add("show-window");
    }

    formListener(callback) {
        this.createForm.addEventListener("submit", e => {
            e.preventDefault();
            const input = this.createForm.querySelector("input");
            const name = input.value;
            if (name.length > 0) {
                localStorage.setItem("MainCharacter", JSON.stringify(new Character({ name })));
                this.createWindow.remove();
                callback();
            }

        })
    }
}

module.exports = CreationMenu;
