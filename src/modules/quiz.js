const Logger = require("./logger");
class Quiz {
  constructor(logger) {
    this.score = 0;
    this.questionIndex = 0;
    this.currentQuiz = {};
    this.questions = [];
    this.isComplete = false;
    this.isInProgress = false;
    this.logger = logger || new Logger();
  }

  //getter methods
  getScore() {
    return this.score;
  }

  getIsComplete() {
    return this.isComplete;
  }

  getAllQuestions() {
    return this.questions;
  }

  getCurrentQuiz() {
    return this.currentQuiz;
  }

  getQuestionIndex() {
    return this.questionIndex;
  }

  getIsInProgress() {
    return this.isInProgress;
  }

  getCurrentQuestionObject() {
    return this.questions[this.questionIndex];
  }

  loadAllQuestions(questions) {
    if (this.getIsInProgress()) {
      throw new Error(
        "Error: Cannot load questions while quiz is in progress!"
      );
    }
    if (!Array.isArray(questions) || questions.length == 0) {
      throw new Error("Error: Questions array cannot be empty or invalid!");
    }
    if (this.validateAllQuestions(questions)) {
      this.questions = questions;
      this.questionIndex = 0;
      this.score = 0;
      this.isInProgress = true;
    } else {
      throw new Error("Error: Invalid question structure detected!");
    }
  }

  loadQuiz(quiz) {
    if (this.validateQuiz(quiz)) {
      this.loadAllQuestions(quiz.questions);

      this.currentQuiz = quiz;

      this.logger.printMessage(
        `Quiz successfully loaded: ${this.getCurrentQuiz().title} quiz\n`
      );
      this.printCurrentQuestion();
    } else {
      throw new Error("Invalid Quiz structure detected!");
    }
  }

  validateQuiz(quiz) {
    if (!Array.isArray(quiz.questions)) return false;
    if (typeof quiz.title !== "string") return false;
    if (!this.validateIcon(quiz.icon)) return false;
    return true;
  }

  validateIcon(iconPath) {
    if (typeof iconPath !== "string") return false;
    const validExtensions = ["svg", "jpg", "jpeg", "png"];
    const hasValid = validExtensions.some((ext) => iconPath.endsWith(ext));
    return hasValid;
  }

  validateAllQuestions(questionsToValidate) {
    if (Array.isArray(questionsToValidate)) {
      for (const question of questionsToValidate) {
        if (!this.validateQuestion(question)) return false;
      }
    }
    return true;
  }

  validateQuestion(q) {
    if (typeof q.question !== "string") {
      return false;
    }
    if (
      !Array.isArray(q.options) ||
      q.options.some((opt) => typeof opt !== "string")
    ) {
      return false;
    }
    if (typeof q.answer !== "string" || !q.options.includes(q.answer)) {
      return false;
    }
    return true;
  }

  //class methods
  selectOption(option) {
    const currentQuestion = this.getCurrentQuestionObject();
    if (currentQuestion.options.includes(option)) {
      if (option === currentQuestion.answer) {
        this.incremementScore();
        this.incrementQuizQuestionIndex();
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  printCurrentQuestion() {
    const index = this.getQuestionIndex();
    const question = this.getCurrentQuestionObject().question;
    const options = this.getCurrentQuestionObject().options;
    const selections = ["A", "B", "C", "D"];

    //log out the current question
    this.logger.printMessage(`Question #${index + 1}: ${question}\n`);

    //log out each option
    options.forEach((option, i) =>
      this.logger.printMessage(`${selections[i]}: ${option}\n`)
    );
  }

  incrementQuizQuestionIndex() {
    if (this.questionIndex < this.questions.length - 1) {
      this.questionIndex++;
    } else {
      // quiz complete
      this.isComplete = true;
      this.isInProgress = false;
    }
  }
  incremementScore() {
    this.score++;
  }
}

module.exports = Quiz;
