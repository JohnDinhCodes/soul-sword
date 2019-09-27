import CharacterCreation from "./modules/CharacterCreation";

//Functions
import createListener from "./functions/createListener";

const gameWindow = document.querySelector(".game");
const startWindow = gameWindow.querySelector(".start");
const startBtn = startWindow.querySelector("button");
const createWindow = gameWindow.querySelector(".creation");
const music = createWindow.querySelector("audio");
const form = createWindow.querySelector(".creation__input-form");

let MainCharacter = JSON.parse(localStorage.getItem("MainCharacter"));



if (!MainCharacter) {
    startBtn.addEventListener("click", e => {
        music.play();
        startWindow.style.display = "none";
        createWindow.style.display = "block";
    });
    form.addEventListener("submit", createListener);
} else {
    startBtn.addEventListener("click", e => {
        music.play();
        startWindow.style.display = "none";
    })
}

console.log(MainCharacter);


