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
        this.timeouts = [];
    }

    showMenu() {
        const flame = this.sceneOneWindow.querySelector(".scene-one__flame");
        this.sceneOneMusic.play();
        this.sceneOneWindow.classList.add("show-window");
        flame.draggable = false;
        flame.classList.add("fade-in");
    }

    typeWriter(line) {
        // Clear previous setTimout if user clicks before text is done loading
        for (let timeout of this.timeouts) {
            clearInterval(timeout);
        }
        this.sceneOneTextContainer.innerHTML = "";

        // Array of individual characters from line
        let arr = line.split("");

        // Loops through each character and plays blip sound
        for (let i = 0; i < line.length; i++) {
            let char = arr[i];
            this.timeouts.push(setTimeout(() => {
                const span = document.createElement("span");
                span.innerHTML = char;
                this.sceneOneTextContainer.appendChild(span);
                this.blipSound.pause();
                this.blipSound.currentTime = 0;
                this.blipSound.play();
            }, i * 20));
            this.timeouts[i];
        }
    }


    playDialogue() {
        let counter = 1;
        if (counter === 1) { this.typeWriter(this.sceneOneDiologue["line1"]) }
        const keyLength = Object.keys(this.sceneOneDiologue).length;
        this.sceneOneWindow.addEventListener("click", () => {
            if (counter < keyLength) {
                const key = Object.keys(this.sceneOneDiologue)[counter];
                this.typeWriter(this.sceneOneDiologue[key]);
                counter++
            } else {

            }

        })
    }

    playScene() {
        this.showMenu();
        this.playDialogue();
    }


}

module.exports = SceneOne;