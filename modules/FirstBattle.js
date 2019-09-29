class FirstBattle {
    constructor({ mainWindow, testDialogue, mainTextContainer, blipSound }) {
        this.mainWindow = mainWindow;
        this.testDialogue = testDialogue;
        this.mainTextContainer = mainTextContainer;
        this.blipSound = blipSound;
        this.timeouts = [];
    }

    init() {
        this.playDialogue(this.mainWindow, this.testDialogue.part1, this.mainTextContainer, this.blipSound);
    }

    typeWriter(line, textContainer, blipSound) {
        // Clear previous setTimeout if user clicks before text is done loading
        for (let timeout of this.timeouts) {
            clearInterval(timeout);
        }
        textContainer.innerHTML = "";

        // Array of individual characters from line
        let arr = line.split("");

        // Loops through each character and plays blip sound
        for (let i = 0; i < line.length; i++) {
            let char = arr[i];
            this.timeouts.push(setTimeout(() => {
                const span = document.createElement("span");
                span.innerHTML = char;
                textContainer.appendChild(span);
                blipSound.pause();
                blipSound.currentTime = 0;
                blipSound.play();
            }, i * 20));
            this.timeouts[i];
        }
    }


    playDialogue(mainWindow, dialogue, textContainer, blipSound) {
        let counter = 1;
        if (counter === 1) { this.typeWriter(dialogue["line1"], textContainer, blipSound) }
        const keyLength = Object.keys(dialogue).length;
        mainWindow.addEventListener("click", () => {
            if (counter < keyLength) {
                const key = Object.keys(dialogue)[counter];
                this.typeWriter(dialogue[key], textContainer, blipSound);
                counter++
            } else {
                mainWindow.removeEventListener("click", () => "");
                // this.sceneOneWindow.removeEventListener("click", () => "");
                // this.sceneOneWindow.style.transition = "opacity 2s";
                // this.sceneOneWindow.style.opacity = "0";
                // this.sceneOneWindow.style.position = "absolute";
                // for (let i = 0; i < this.sceneOneMusic.volume / .1; i++) {
                //     setTimeout(() => {
                //         this.sceneOneMusic.volume -= .1;
                //     }, i * 500);
                // }
                // setTimeout(() => {
                //     this.sceneOneWindow.remove();
                // }, 5000);
            }

        })
    }


}

module.exports = FirstBattle;