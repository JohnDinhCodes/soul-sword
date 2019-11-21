class DecisionButtons {
    constructor(buttonText, buttonContainer) {
        this.buttonText = buttonText;
        this.buttonContainer = buttonContainer;
    }

    createButtons() {
        for (let i = 0; i < this.buttonText; i++) {
            const button = document.createElement("button");
            button.innerHTML = this.buttonText[i];
            // button.setAttribute("id", `option-${i + 1}`);
            this.buttonContainer.appendChild(button);
        }
    }
}