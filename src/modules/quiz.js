class Quiz {
  constructor() {
    this.score = 0;
    this.questionIndex = 0;
    this.currentQuiz = {};
    this.questions = [];
    this.isComplete = false;
    this.isInProgress = false;
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

  getCurrentQuestion() {
    return this.questions[this.questionIndex];
  }

  loadAllQuestions(array) {
    if (this.getIsInProgress()) {
      throw new Error(
        "Error: Cannot load questions while quiz is in progress!"
      );
    }
    if (!Array.isArray(array) || array.length === 0) {
      throw new Error("Error: Questions array cannot be empty or invalid!");
    }
    if (this.validateAllQuestions(array)) {
      this.questions = array;
      this.resetCounts();
      this.isInProgress = true;
    } else {
      throw new Error("Error: Invalid question structure detected!");
    }
  }

  loadQuiz(quiz) {
    if (this.validateQuiz(quiz)) this.currentQuiz = quiz;
    else {
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
    const currentQuestion = this.getCurrentQuestion();
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

  incrementQuizQuestionIndex() {
    if (this.questionIndex < this.questions.length - 1) {
      this.questionIndex++;
    } else {
      //set isComplete to true
      this.isComplete = true;
      this.isInProgress = false;
    }
  }
  incremementScore() {
    this.score++;
  }

  resetCounts() {
    this.questionIndex = 0;
    this.score = 0;
  }
}

module.exports = Quiz;
