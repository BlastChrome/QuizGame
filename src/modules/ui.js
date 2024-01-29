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
    this.questionText = document.getElementById("question");
    this.progressNumber = document.getElementById("progress-number");
    this.quizSelectionHandler = (e) => this.handleQuizSelection(e);
  }

  setQuizInProgress = (isInProgress) => {
    this.isQuizStarted = isInProgress;
  };

  // Event Handler Methods
  handleQuizSelection = (e) => {
    const button = e.target.closest("button");
    const clickedButtonIndex = Array.prototype.indexOf.call(
      this.selectionButtons.children,
      button
    );
    // stops the user from selecting another quiz while it hs in progress
    if (this.isQuizStarted) return null;
    // passes the index of the button to a callback
    this.onQuizSelectionCallback(clickedButtonIndex);
  };

  handleOptionSelection = (e) => {
    const clickedButton = e.target.closest("button");
    const optionButtons = Array.from(this.selectionButtons.children).filter(
      (button) => button.dataset.optionGroup == "quiz-options"
    );
    if (clickedButton.classList.contains("submit")) {
      return;
    }
    optionButtons.forEach((button) => {
      button.classList.remove("choice__selector--selected");
    });
    clickedButton.classList.add("choice__selector--selected");
  };

  onQuizSelection = (callback) => {
    this.onQuizSelectionCallback = callback;
    this.selectionButtons.addEventListener("click", this.handleQuizSelection);
  };
  initOnSelectionListeners = (callback) => {
    this.onOptionSelectionCallback = callback;
    this.selectionButtons.addEventListener("click", this.handleOptionSelection);
  };

  resetEventListeners = () => {
    // Remove the existing quiz selection listener
    this.selectionButtons.removeEventListener(
      "click",
      this.quizSelectionHandler
    );
  };

  //Rendering Methods
  renderQuestion = (questionObject) => {
    this.hideStartScreenElements();
    this.renderInProgressElements();
    this.questionText.innerText = questionObject.question;

    // filter the [A-D] buttons
    const optionButtons = Array.from(this.selectionButtons.children).filter(
      (button) => button.dataset.optionGroup == "quiz-options"
    );

    // Update the text inside the buttons to a question
    optionButtons.forEach((button, index) => {
      const optionsText = button.querySelector("h3");
      optionsText.innerHTML = questionObject.options[index];
    });
  };

  renderQuizSubjectIcon = (icon) => {
    const ICON_TEXT = document.querySelector("#quiz-subject-text");
    const ICON_ELEMENTS = Array.from(
      document.querySelectorAll(".header__header-left__icon")
    );
    const FOUND_ELEMENT = ICON_ELEMENTS.find((elem) =>
      elem.classList.contains(
        `header__header-left__icon--${icon.toLowerCase()}`
      )
    );
    FOUND_ELEMENT.classList.add("active");
    ICON_TEXT.innerHTML = icon;
  };

  renderProgressNumber = (index) => {
    this.progressNumber.innerHTML = index + 1;
  };

  renderStartScreenElements = () => {
    this.startScreenElements.forEach((element) =>
      this.modifyElement(element, "remove", "hide")
    );
  };

  renderInProgressElements = () => {
    this.inProgressElements.forEach((element) => {
      this.modifyElement(element, "remove", "hide");
    });
  };

  hideStartScreenElements = () => {
    this.startScreenElements.forEach((element) => {
      this.modifyElement(element, "add", "hide");
    });
  };

  modifyElement = (element, action, classToEdit) => {
    element.classList[action](classToEdit);
  };
}

module.exports = UI;
