import CharacterCreation from "./modules/CharacterCreation";

//Functions
import createListener from "./functions/createListener";

const gameWindow = document.querySelector(".game");

const startWindow = gameWindow.querySelector(".start");
const startBtn = startWindow.querySelector("button");

const createWindow = gameWindow.querySelector(".creation");
const createMusic = createWindow.querySelector("audio");
const form = createWindow.querySelector(".creation__input-form");
const sceneOne = gameWindow.querySelector(".scene-one");
const clickSound = document.querySelector(".click-sound");
const sceneOneMusic = sceneOne.querySelector("audio");


let textContainer = document.querySelector(".text-container");
let bleep = document.querySelector(".blip-sound");
let text = "yeeeeeeeeeeeeeeeet yeet yeet yeet yeeeet yeet yeeet";
text = text.split("");

let MainCharacter = JSON.parse(localStorage.getItem("MainCharacter"));
startBtn.addEventListener("click", e => {
    clickSound.play();
    startWindow.remove();
    if (!MainCharacter) {
        createMusic.play();
        createWindow.style.visibility = "visible";
        createWindow.classList.add("fade-in")
        form.addEventListener("submit", () => {
            createListener()
        });
    } else {
        createWindow.style.display = "none";
        sceneOne.style.visibility = "visible";
        sceneOne.querySelector("img").classList.add("fade-in");
        sceneOneMusic.play();
        test(text);
    }
})

function test(text) {
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        setTimeout(function () {
            let y = document.createElement("span");
            y.innerHTML = char;
            y.style.color = "white";
            textContainer.appendChild(y);
            // clickSound.pause();
            clickSound.currentTime = 0;
            clickSound.play();
        }, i * 100);
    }
}

function test2(char) {


}



