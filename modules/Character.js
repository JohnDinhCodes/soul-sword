import Stats from "./Stats";

class Character extends Stats {
    constructor({ name }) {
        super();
        this.name = name;
        this.level = 1;
    }
}

module.exports = Character;