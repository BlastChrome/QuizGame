class UI {
  constructor() {
    this.isQuizStarted = false;
    this.selectionButtons = document.getElementById("choice");
    this.startScreenElements = Array.from(
      document.getElementsByClassName("start-screen")
    );
    this.inProgressElements = Array.from(
      document.getElementsByClassName("in-progress")
    );
    this.lastClickedButtonIndex = null;
  }

  getLastClickedButtonIndex = () => {
    return this.lastClickedButtonIndex;
  };

  onQuizSelection = (callback) => {
    this.selectionButtons.addEventListener("click", (e) => {
      const button = e.target.closest("button");
      const clickedButtonIndex = Array.prototype.indexOf.call(
        this.selectionButtons.children,
        button
      );
      if (this.isQuizStarted) return null;
      callback(clickedButtonIndex);
      this.isQuizStarted = true;
    });
  };

  renderQuestion = (question) => {
    this.hideStartScreenElements();
    this.renderInProgressElements();
    this.updateCurrentQuestionText();
    console.log(question);
  };

  renderStartScreenElements = () => {
    this.startScreenElements.forEach((element) =>
      this.modifyElement(element, "remove", "hide")
    );
  };

  hideStartScreenElements = () => {
    this.startScreenElements.forEach((element) => {
      this.modifyElement(element, "add", "hide");
    });
  };

  renderInProgressElements = () => {
    this.inProgressElements.forEach((element) => {
      this.modifyElement(element, "remove", "hide");
    });
  };

  updateCurrentQuestionText = () => {};

  modifyElement = (element, action, classToEdit) => {
    element.classList[action](classToEdit);
  };
}

module.exports = UI;
