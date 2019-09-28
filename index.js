// import CharacterCreation from "./modules/CharacterCreation";
import StartMenu from "./modules/StartMenu";
import CreationMenu from "./modules/CreationMenu";
import SceneOne from "./modules/SceneOne";

//Functions
import createListener from "./functions/createListener";
// Global Sounds
const clickSound = document.querySelector(".click-sound");
const blipSound = document.querySelector(".blip-sound");

// Game Div
const gameWindow = document.querySelector(".game");

// Start Window Elements
const startWindow = gameWindow.querySelector(".start");
const startBtn = startWindow.querySelector("button");

// Character Creation Window Elements
const createWindow = gameWindow.querySelector(".creation");
const createMusic = createWindow.querySelector("audio");
const createForm = createWindow.querySelector(".creation__input-form");

// Scene One Elements 
const sceneOneWindow = gameWindow.querySelector(".scene-one");
const sceneOneMusic = sceneOneWindow.querySelector("audio");
const sceneOneTextContainer = sceneOneWindow.querySelector(".text-container");
const sceneOneDiologue = {
    line1: "At a time before souls, there was a swordsman everyone feared.",
    line2: "And then he yeeted"
}

// Initial Modules
const startMenu = new StartMenu({ startBtn, clickSound, startWindow });
const createMenu = new CreationMenu({ clickSound, createWindow, createMusic, createForm });
const sceneOne = new SceneOne({ sceneOneWindow, sceneOneMusic, sceneOneDiologue, sceneOneTextContainer, blipSound });

// CURRENTLY TESTING
let textContainer = document.querySelector(".text-container");
let bleep = document.querySelector(".blip-sound");
let text = "yeeeeeeeeeeeeeeeet yeet yeet yeet yeeeet yeet yeeet";
text = text.split("");

let MainCharacter = JSON.parse(localStorage.getItem("MainCharacter"));




startMenu.startBtnClick(() => {
    if (!MainCharacter) {
        createMenu.showMenu();
        createMenu.formListener(() => {
            sceneOne.playScene();
        });

    } else {
        console.log("Get Scene from Local Storage");
        sceneOne.playScene();

    }
});

// function test(text) {
//     for (let i = 0; i < text.length; i++) {
//         let char = text[i];
//         setTimeout(function () {
//             let y = document.createElement("span");
//             y.innerHTML = char;
//             y.style.color = "white";
//             textContainer.appendChild(y);
//             clickSound.pause();
//             clickSound.currentTime = 0;
//             clickSound.play();
//         }, i * 40);
//     }
// }


