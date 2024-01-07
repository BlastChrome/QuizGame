class UI {
  constructor() {
    this.clickCount = 0; // Add a click counter
    this.quizSelectorButtons = Array.from(document.querySelectorAll("button"));
    this.submitButton = document.getElementById("submit");

    this.quizSelectorButtons.forEach((button) => {
      button.addEventListener("click", this.handleButtonClick);
    });
  }

  handleButtonClick = (e) => {
    this.clickCount++; // Increment counter on click
    console.log(e.target.dataset.select);
  };
}

module.exports = UI;
