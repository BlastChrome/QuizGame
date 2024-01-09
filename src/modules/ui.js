class UI {
  constructor() {
    this.clickCount = 0; // Add a click counter
    this.selectionButtons = document.getElementById("choice");
    this.themeController = document.getElementById("theme-controller");

    if (this.selectionButtons) {
      this.selectionButtons.addEventListener(
        "click",
        this.handleSelectionClick
      );
    }

    if (this.themeController) {
      this.themeController.addEventListener("click", this.handleThemeClick);
    }
  }

  handleSelectionClick = (e) => {
    const button = e.target.closest("button");
    console.log(
      Array.prototype.indexOf.call(this.selectionButtons.children, button)
    );
  };

  handleThemeClick = (e) => {
    const clickable = e.target.closest("button") || e.target.closest("input");
    console.log(clickable);
  };

  testLogger() {
    console.log(this.selectionButtons);
    console.log(this.themeController);
  }
}

module.exports = UI;
