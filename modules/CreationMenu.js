import CharacterCreation from "./CharacterCreation";
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
            localStorage.setItem("MainCharacter", JSON.stringify(new CharacterCreation({ name })));
            this.createWindow.remove();
            callback();
        })
    }
}

module.exports = CreationMenu;


// e.preventDefault();
// const name = this.querySelector("input").value;
// this.querySelector("input").value = "";
// localStorage.setItem("MainCharacter", JSON.stringify(new CharacterCreation({ name })));
// this.parentElement.parentElement.querySelector(".scene-one").style.display = "block";
// this.parentElement.parentElement.querySelector(".scene-one").style.visibility = "visible";
// this.parentElement.parentElement.querySelector(".scene-one").classList.add("fade-in");
// document.querySelector(".scene-one__flame").classList.add("fade-in");
// this.parentElement.remove();