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
  }

  setQuizInProgress = (isInProgress) => {
    this.isQuizStarted = isInProgress;
  };

  // Event Handler Methods
  handleQuizSelection = (e) => {
    const BUTTON = e.target.closest("button");
    const CLICKED_BUTTON_INDEX = Array.prototype.indexOf.call(
      this.selectionButtons.children,
      BUTTON
    );
    // stops the user from selecting another quiz while it hs in progress
    if (this.isQuizStarted) return null;
    // passes the index of the button to a callback
    this.onQuizSelectionCallback(CLICKED_BUTTON_INDEX);
  };

  handleOptionSelection = (e) => {
    const CLICKED_BUTTON = e.target.closest("button");

    // if the clicked button is an option button, add the css selected class
    if (CLICKED_BUTTON.dataset.optionGroup == "quiz-options") {
      this.addButtonSelectedClass(CLICKED_BUTTON);

      // if the submit button was pressed, submit the selected answer
    } else {
      const SELECTED_BUTTON = this.getSelectionButtonsArray().find((button) =>
        button.classList.contains("choice__selector--selected")
      );
      // if the there's no selected button, do nothing
      if (!SELECTED_BUTTON) return;

      // finally submit the selected answer
      const SELECTED_BUTTON_TEXT =
        SELECTED_BUTTON.querySelector("h3").innerText;
      this.onOptionSelectionCallback(SELECTED_BUTTON_TEXT);
    }
  };

  addButtonSelectedClass = (clickedButton) => {
    // filters down to the option buttons [A-D]
    const OPTION_BUTTONS = this.getSelectionButtonsArray();
    // remove the selected class from all buttons at the start
    OPTION_BUTTONS.forEach((button) => {
      this.modifyElement(button, "remove", "choice__selector--selected");
    });
    // add the selected class to the clicked button
    this.modifyElement(clickedButton, "add", "choice__selector--selected");
  };

  onQuizSelection = (callback) => {
    this.onQuizSelectionCallback = callback;
    this.selectionButtons.addEventListener("click", this.handleQuizSelection);
  };

  onOptionSelection = (callback) => {
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

  getSelectionButtonsArray = () => {
    return Array.from(this.selectionButtons.children).filter(
      (button) => button.dataset.optionGroup == "quiz-options"
    );
  };

  //Rendering Methods
  renderQuestion = (questionObject) => {
    this.hideStartScreenElements();
    this.renderInProgressElements();
    this.questionText.innerText = questionObject.question;

    // filter the [A-D] buttons
    const OPTION_BUTTONS = this.getSelectionButtonsArray();

    // Update the text inside the buttons to a question
    OPTION_BUTTONS.forEach((button, index) => {
      const OPTIONS_TEXT = button.querySelector("h3");
      OPTIONS_TEXT.innerHTML = questionObject.options[index];
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
