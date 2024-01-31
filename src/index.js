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
  };

  const renderQuestion = () => {
    quiz.provideCurrentQuestionToUI((questionObject) => {
      ui.renderQuestion(questionObject);
    });
    quiz.provideCurrentQuestionIndexToUI((index) => {
      ui.renderProgressNumber(index);
    });
    quiz.provideCurrentSubjectToUI((icon) => {
      ui.renderQuizSubjectIcon(icon);
    });
    ui.resetEventListeners();
    ui.onOptionSelection((option) => {
      const RESULTS = quiz.selectOption(option);
      ui.renderSelectionResults(RESULTS);
    });
  };

  //shows the start screen on load
  initalizeStartScreen();

  // load the quiz based on the button input
  ui.onQuizSelection((index) => {
    if (index !== -1) {
      loadQuiz(index);
      renderQuestion();
    }
  });
})();
