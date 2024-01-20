class UI {
  constructor() {
    this.body = document.querySelector("body");
    this.darkThemeBtn = document.getElementById("dark-theme-switch");
    this.lightThemeBtn = document.getElementById("light-theme-switch");
    this.themeController = document.getElementById("theme-controller");
    this.themetoggleBtn = document.getElementById("theme-toggle");
    this.themeToggleCheckbox = document.getElementById("theme-toggle-checkbox");
    this.themeController.addEventListener(
      "click",
      this.handlThemeControllerClick
    );

    // this.selectionButtons = document.getElementById("choice");
    // this.selectionButtons.addEventListener("click", this.handleSelectionClick);
  }

  // handleSelectionClick = (e) => {
  //   const button = e.target.closest("button");
  //   console.log(
  //     Array.prototype.indexOf.call(this.selectionButtons.children, button)
  //   );
  // };

  handlThemeControllerClick = (e) => {
    const button = e.target.closest("button");

    if (button == this.lightThemeBtn) {
      this.updateTheme("remove", false);
    } else if (button == this.darkThemeBtn) {
      this.updateTheme("add", true);
    } else if (button == this.themetoggleBtn) {
      if (this.themeToggleCheckbox.checked == true) {
        this.updateTheme("remove", false);
      } else {
        this.updateTheme("add", true);
      }
    }
  };

  updateTheme(action, switchValue) {
    if (!(action == "add" || action == "remove")) return null;
    this.body.classList[action]("dark-theme");
    this.themeToggleCheckbox.checked = switchValue;
  }
}

module.exports = UI;
