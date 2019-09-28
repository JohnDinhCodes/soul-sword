class SceneOne {
    constructor({
        sceneOneWindow,
        sceneOneMusic,
        sceneOneDiologue,
        blipSound,
        sceneOneTextContainer,
    }) {

        this.sceneOneWindow = sceneOneWindow;
        this.sceneOneMusic = sceneOneMusic;
        this.sceneOneDiologue = sceneOneDiologue;
        this.blipSound = blipSound;
        this.sceneOneTextContainer = sceneOneTextContainer;
    }

    showMenu() {
        const flame = this.sceneOneWindow.querySelector(".scene-one__flame");
        const darkMC = this.sceneOneWindow.querySelector(".scene-one__darkMC");
        this.sceneOneMusic.play();
        this.sceneOneWindow.classList.add("show-window");
        flame.classList.add("fade-in");
    }

    typeWriter(line) {
        let arr = line.split("");
        for (let i = 0; i < line.length; i++) {
            let char = arr[i];
            setTimeout(() => {
                const span = document.createElement("span");
                span.innerHTML = char;


            })
        }
    }


    playDiologue() {
        for (let line in this.sceneOneDiologue) {
            console.log(this.sceneOneDiologue[line]);
        }
    }

    playScene() {
        this.showMenu();
        this.playDiologue();
    }


}

module.exports = SceneOne;