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

  // load the quiz based on the button input
  ui.renderStartScreenElements();
  // load the quiz based on the button input
  ui.onQuizSelection((index) => {
    if (index !== -1) {
      quiz.loadQuiz(data.quizzes[index]);
      quiz.notifyUIQuizStarted((inProgress) => {
        ui.setQuizInProgress(inProgress);
      });
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
      ui.initOnSelectionListeners((option) => {
        quiz.selectOption(option);
        // quiz.notifyUISelectionResult();
      });
    }
  });
})();
