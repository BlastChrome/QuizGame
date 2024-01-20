class UI {
  constructor() {
    this.selectionButtons = document.getElementById("choice");
    this.selectionButtons.addEventListener("click", this.handleSelectionClick);
  }

  handleSelectionClick = (e) => {
    const button = e.target.closest("button");
    console.log(
      Array.prototype.indexOf.call(this.selectionButtons.children, button)
    );
  };
}

module.exports = UI;
