import StartMenu from "./modules/StartMenu";
import CreationMenu from "./modules/CreationMenu";
import SceneOne from "./modules/SceneOne";
import MainUI from "./modules/MainUI";

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
createMusic.loop = true;
createMusic.currentTime = 5;
const createForm = createWindow.querySelector(".creation__input-form");

// Home Elements
const mainUIEl = gameWindow.querySelector(".main-UI");

let MainCharacter = JSON.parse(localStorage.getItem("MainCharacter")) || null;


// Scene One Elements 
const sceneOneWindow = gameWindow.querySelector(".scene-one");
const sceneOneMusic = sceneOneWindow.querySelector("audio");
sceneOneMusic.loop = true;
sceneOneMusic.currentTime = 15;
const sceneOneTextContainer = sceneOneWindow.querySelector(".text-container");

const sceneOneDialogue = {
    line1: "At a time before humans were born with souls",
    line2: "Your existence amounted to your skill for survival",
    line3: "Swordsmanship",
    line4: "Spiritual Energy",
    line5: "Hand to hand combat",
    line6: "These core skills were the starting point to a long life",
    line7: "You have to master it all in order to achieve what every human innately desired",
    line8: "Surviving.",
    line9: "For the chance to encounter the soul sword",
    line10: `Will you be able to achieve the human race's dream?`,
}



// Initial Modules
const startMenu = new StartMenu({ startBtn, clickSound, startWindow });
const createMenu = new CreationMenu({ clickSound, createWindow, createMusic, createForm });
const sceneOne = new SceneOne({ sceneOneWindow, sceneOneMusic, sceneOneDialogue, sceneOneTextContainer, blipSound });
const mainUI = new MainUI({ mainUIEl });


startMenu.startBtnClick(() => {
    if (!MainCharacter) {
        createMenu.showMenu();
        createMenu.formListener(() => {
            sceneOne.playScene();
        });

    } else {
        console.log("Get Scene from Local Storage");
        mainUI.init();
        // sceneOne.playScene();

    }
});

