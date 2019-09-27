import CharacterCreation from "./modules/CharacterCreation";

//Functions
import createListener from "./functions/createListener";

const gameWindow = document.querySelector(".game");
const createWindow = gameWindow.querySelector(".creation");
const music = createWindow.querySelector("audio");
const form = createWindow.querySelector(".creation__input-form");

let MainCharacter = JSON.parse(localStorage.getItem("MainCharacter"));

if (!MainCharacter) {
    createWindow.style.display = "block";
    form.addEventListener("submit", createListener);
    music.play();
} else {
    console.log("yeet");
}

console.log(MainCharacter);


