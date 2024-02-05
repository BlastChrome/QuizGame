import "./scss/main.scss";
const Logger = require("./modules/logger");
const Quiz = require("./modules/quiz");
const ThemeController = require("./modules/theme-controller");
const UI = require("./modules/ui");
const data = require("./data.json");

const main = (() => {
  // initial setup
  const logger = new Logger();
  const quiz = new Quiz(logger);
  const themeController = new ThemeController();
  const ui = new UI();

  const initalizeStartScreen = () => {
    ui.renderStartScreenElements();
  };

  const loadQuiz = (index) => {
    quiz.loadQuiz(data.quizzes[index]);
    quiz.notifyUIQuizStarted((inProgress) => {
      ui.setQuizInProgress(inProgress);
    });
    ui.resetQuizSelectionEventListeners();
  };

  const displayCurrentQuestion = () => {
    quiz.provideCurrentQuestionToUI((questionObject) => {
      ui.renderQuestion(questionObject);
    });
    quiz.provideCurrentQuestionIndexToUI((index) => {
      ui.renderProgressNumber(index);
      ui.renderProgressBar(index);
    });
    quiz.provideCurrentSubjectToUI((icon) => {
      ui.renderQuizSubjectIcon(icon);
    });
  };

  // the main method for quiz loop
  const quizMain = () => {
    console.log("here");
    ui.onOptionSelection((option) => {
      ui.renderSelectionResults(quiz.selectOption(option));
      // after an option is chosen disable the buttons
      ui.resetOptionSelectListeners();
      // initialize the progress button
      ui.onNextClick(() => {
        ui.resetOnNextClickListener();
        ui.initializeOptionSelectListeners();
        // progress to the next question
        displayCurrentQuestion();
      });
    });
  };

  //shows the start screen on load
  initalizeStartScreen();

  // load the quiz based on the button input
  ui.onQuizSelection((index) => {
    if (index !== -1) {
      loadQuiz(index);
      // displays the first question when the quiz is initially loaded
      displayCurrentQuestion();

      //
      quizMain();
    }
  });
})();
