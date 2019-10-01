import { callbackify } from "util";

class TypeWriter {
    constructor(blipSound, textContainer, dialogue) {
        this.blipSound = blipSound;
        this.textContainer = textContainer;
        this.dialogue = dialogue;
        this.timeouts = [];
    }

    // Clears setTimeouts in this.timeouts array
    clearTimeouts() {
        for (let timeout of this.timeouts) {
            clearInterval(timeout);
        }

        this.textContainer.innerHTML = "";
    }

    // Renders specified string of text with a typewriter effect
    typeWriteLine(line, textContainer, blipSound) {
        this.clearTimeouts();

        // Array of individual characters from line
        let splitLine = line.split("");

        // Loops through each character and plays a blip sound
        for (let i = 0; i < line.length; i++) {
            let char = arr[i];
            this.timeouts.push(setTimeout(() => {
                const span = document.createElement("span");
                span.innerHTML = char;
                textContainer.appendChild(span);

                blipSound.currentTime = 0;
                blipSound.play();

            }, i * 20));
        }
    }

    // Loops through each line of dialogue and calls typeWriterLine
    // to render each line
    processDialogue(mainWindow, dialogue, textContainer, blipSound, callback) { //TODO make sure this works for all future cases
        let counter = 1;
        const firstLine = Object.keys(dialogue)[0];
        
        // Renders first line automatically so users don't have to click an empty screen
        if (counter === 1) {
            this.typeWriteLine(dialogue[firstLine], textContainer, blipSound)
        }

        // Number of lines to render. Find by looking at object key length
        const keyLength = Object.keys(dialogue).length;

        // Listens for click on main window, renders next line on click
        mainWindow.addEventListener("click", () => {
            if (counter < keyLength) {
                const key = Object.keys(dialogue)[counter];
                this.typeWriteLine(dialogue[key], textContainer, blipSound);
                
                // Runs callback when last line is rendered
                if (counter === keyLength - 1 && callback) {
                    callback();
                }

                counter++;
            }
        });

    }




}