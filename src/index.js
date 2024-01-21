import "./scss/main.scss";
const Logger = require("./modules/logger");
const Quiz = require("./modules/quiz");
const ThemeController = require("./modules/theme-controller");
const UI = require("./modules/ui");
const data = require("./data.json");

//create terminal interface
// const rl = readline.createInterface({
//   input: process.stdin,
// });
//   output: process.stdout,

const main = (() => {
  // initial setup
  const logger = new Logger();
  const quiz = new Quiz(logger);
  const themeController = new ThemeController();
  const ui = new UI();

  ui.renderStartScreenElements();

  const selectQuiz = (index) => {
    if (index !== -1) {
      quiz.loadQuiz(data.quizzes[index]);
    }
  };

  // load the quiz based on the button input
  ui.onQuizSelection(selectQuiz);
})();

// quiz.loadQuiz(data.quizzes[0]);

// Function to ask a question
// function askQuestion() {
//   const question = quiz.getCurrentQuestionObject();
//   if (quiz.getIsComplete()) {
//     rl.close();
//     return;
//   }

//   rl.question(question.question + "\n", (answer) => {
//     quiz.selectOption(answer);
//     // Ask the next question
//     quiz.promptUser();
//     askQuestion();
//   });
// }

// // Start asking questions
// askQuestion();
