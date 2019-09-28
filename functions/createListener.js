import CharacterCreation from "../modules/CharacterCreation";
const clickSound = document.querySelector(".click-sound")
const sceneOne = document.querySelector(".scene-one");
const sceneOneMusic = sceneOne.querySelector("audio");
function createListener(e) {
    clickSound.play();
    sceneOneMusic.play();
    e.preventDefault();
    const name = this.querySelector("input").value;
    this.querySelector("input").value = "";
    localStorage.setItem("MainCharacter", JSON.stringify(new CharacterCreation({ name })));
    this.parentElement.parentElement.querySelector(".scene-one").style.display = "block";
    this.parentElement.parentElement.querySelector(".scene-one").style.visibility = "visible";
    this.parentElement.parentElement.querySelector(".scene-one").classList.add("fade-in");
    document.querySelector(".scene-one__flame").classList.add("fade-in");
    this.parentElement.remove();

}

module.exports = createListener;