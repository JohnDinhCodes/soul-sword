// TODO clean up this mess

class FirstBattle {
    constructor({
        mainWindow,
        firstBattleData,
        mainTextContainer,
        blipSound,
        battleMusic
    }) {
        this.mainWindow = mainWindow;
        this.firstBattleData = firstBattleData;
        this.part1Dialogue = firstBattleData.part1;
        this.mainTextContainer = mainTextContainer;
        this.blipSound = blipSound;
        this.timeouts = [];
        this.part1Buttons = firstBattleData.part1Buttons;
        this.buttonContainer = mainWindow.querySelector(".main-screen__button-container");
        this.battleMusic = battleMusic;
    }

    init() {
        this.playDialogue(this.mainWindow, this.part1Dialogue, this.mainTextContainer, this.blipSound);
        this.battleMusic.play();
    }

    clearTimeouts() {
        for (let timeout of this.timeouts) {
            clearInterval(timeout);
        }
    }



    option1() {
        this.mainWindow.querySelector("#option-1").addEventListener("click", (e) => {
            this.buttonContainer.innerHTML = "";
            this.mainTextContainer.innerHTML = "";
            this.clearTimeouts();
            this.playDialogue(this.mainWindow, this.firstBattleData.searchForParents, this.mainTextContainer, this.blipSound);
            
        });
    }

    option2() {
        this.mainWindow.querySelector("#option-2").addEventListener("click", (e) => {
            this.buttonContainer.innerHTML = "";
            this.mainTextContainer.innerHTML = "";
            console.log("do something for option 2 here");
            this.clearTimeouts();
        });
    }



    buttons() {
        for (let i = 0; i < this.part1Buttons.length; i++) {
            const button = document.createElement("button");
            button.innerHTML = this.part1Buttons[i];
            button.setAttribute("id", `option-${i + 1}`);
            this.buttonContainer.appendChild(button);
        }
        this.option1();
        this.option2();
    }

    typeWriter(line, textContainer, blipSound) {
        // Clear previous setTimeout if user clicks before text is done loading
        this.clearTimeouts();
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
        if (counter === 1) {
            this.typeWriter(dialogue["line1"], textContainer, blipSound)
        }
        const keyLength = Object.keys(dialogue).length;
        mainWindow.addEventListener("click", () => {
            if (counter < keyLength) {
                const key = Object.keys(dialogue)[counter];
                this.typeWriter(dialogue[key], textContainer, blipSound);
                if (counter === keyLength - 1) {
                    this.buttons()
                };
                counter++
            }
        });
    }


}

module.exports = FirstBattle;