class UI {
  constructor() {
    this.body = document.querySelector("body");
    this.darkThemeBtn = document.getElementById("dark-theme-switch");
    this.lightThemeBtn = document.getElementById("light-theme-switch");
    this.themeController = document.getElementById("theme-controller");
    this.selectionButtons = document.getElementById("choice");
    this.themeToggleCheckbox = document.getElementById("theme-toggle-checkbox");

    // Event Listeners
    this.selectionButtons.addEventListener("click", this.handleSelectionClick);
    this.themeController.addEventListener(
      "click",
      this.handlThemeControllerClick
    );
  }

  handleSelectionClick = (e) => {
    const button = e.target.closest("button");
    console.log(
      Array.prototype.indexOf.call(this.selectionButtons.children, button)
    );
  };

  handlThemeControllerClick = (e) => {
    const clickedElement =
      e.target.closest("button") || e.target.closest("label");

    if (clickedElement == this.lightThemeBtn) {
      this.changeTheme("remove", false);
    } else if (clickedElement == this.darkThemeBtn) {
      this.changeTheme("add", true);
    } else if (clickedElement.id == "theme-toggle") {
      if (this.themeToggleCheckbox.checked) {
        this.changeTheme("add", true);
      } else {
        this.changeTheme("remove", false);
      }
    }
  };

  changeTheme(action, switchValue) {
    if (!(action == "add" || action == "remove")) return null;
    this.body.classList[action]("dark-theme");
    this.themeToggleCheckbox.checked = switchValue;
  }
}

module.exports = UI;
