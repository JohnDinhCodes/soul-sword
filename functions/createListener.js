import CharacterCreation from "../modules/CharacterCreation";

function createListener(e) {
    e.preventDefault();
    const name = this.querySelector("input").value;
    this.querySelector("input").value = "";
    localStorage.setItem("MainCharacter", JSON.stringify(new CharacterCreation({ name })));
    location.reload();
}

module.exports = createListener;