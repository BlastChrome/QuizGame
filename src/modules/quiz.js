const { isArray } = require("lodash");

class Quiz {
  constructor() {
    this.score = 0;
    this.currentQuizIndex = 0;
    this.questions = [];
  }
  //getter methods
  getScore() {
    return this.score;
  }
  getAllQuestions() {
    return this.questions;
  }
  getCurrentQuizIndex() {
    return this.currentQuizIndex;
  }
  getCurrentQuestion() {
    return this.questions[this.currentQuizIndex];
  }

  loadAllQuestions(array) {
    if (array.length > 0) {
      if (this.validateAllQuestions(array)) {
        this.questions = array;
      }
    } else {
      throw new Error("Error: Questions cannot be empty!");
    }
  }

  validateAllQuestions(questionsToValidate) {
    if (isArray(questionsToValidate)) {
      questionsToValidate.forEach((question) => {
        if (!this.validateQuestion(question)) return false;
      });
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
  incrementQuizIndex() {
    if (this.currentQuizIndex < this.questions.length - 1) {
      this.currentQuizIndex++;
    }
  }
}

module.exports = Quiz;
