class Quiz {
  constructor() {
    this.score = 0;
    this.currentQuizQuestionIndex = 0;
    this.questions = [];
  }

  //getter methods
  getScore() {
    return this.score;
  }

  getAllQuestions() {
    return this.questions;
  }

  getCurrentQuizQuestionIndex() {
    return this.currentQuizQuestionIndex;
  }

  getCurrentQuestion() {
    return this.questions[this.currentQuizQuestionIndex];
  }

  loadAllQuestions(array) {
    if (!Array.isArray(array) || array.length === 0) {
      throw new Error("Error: Questions array cannot be empty or invalid!");
    }
    if (this.validateAllQuestions(array)) {
      this.questions = array;
    } else {
      throw new Error("Error: Invalid question structure detected!");
    }
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

  selectOption(option) {
    const currentQuestion = this.getCurrentQuestion();
    if (currentQuestion.options.includes(option)) {
      if (option === currentQuestion.answer) {
        this.incremementScore();
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  //class methods
  incrementQuizIndex() {
    if (this.currentQuizIndex < this.questions.length - 1) {
      this.currentQuizIndex++;
    }
  }
  incremementScore() {
    this.score++;
  }
}

module.exports = Quiz;
