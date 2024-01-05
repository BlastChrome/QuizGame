const readline = require("readline");
const Logger = require("./modules/logger");
const Quiz = require("./modules/quiz");
const data = require("./test.json");

//create terminal interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const logger = new Logger();

const quiz = new Quiz(logger);

quiz.loadQuiz(data.quizzes[0]);

// Function to ask a question
function askQuestion() {
  const question = quiz.getCurrentQuestionObject();
  if (quiz.getIsComplete()) {
    rl.close();
    return;
  }

  rl.question(question.question + "\n", (answer) => {
    quiz.selectOption(answer);
    // Ask the next question
    quiz.promptUser();
    askQuestion();
  });
}

// Start asking questions
askQuestion();
