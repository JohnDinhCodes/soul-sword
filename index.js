import Stats from "./modules/Stats";
import CharacterCreation from "./modules/CharacterCreation";

//Functions
import createListener from "./functions/createListener";

const gameWindow = document.querySelector(".game");
const createWindow = gameWindow.querySelector(".creation");
const form = createWindow.querySelector(".creation__input-form");

let MainCharacter = JSON.parse(localStorage.getItem("MainCharacter"));

if (!MainCharacter) {
    createWindow.style.display = "block";
    form.addEventListener("submit", createListener);
} else {
    console.log("yeet");
}

console.log(MainCharacter);
