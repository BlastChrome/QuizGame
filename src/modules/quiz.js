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
  getQuestions() {
    return this.questions;
  }
  getCurrentQuizIndex() {
    return this.currentQuizIndex;
  }
  getCurrentQuestion() {
    return this.questions[this.currentQuizIndex];
  }

  loadQuestions(array) {
    if (array.length > 0) {
      this.questions = array;
    } else {
      throw new Error("Error: Questions cannot be empty!");
    }
  }

  //class methods
  incrementQuizIndex() {
    if (this.currentQuizIndex < this.questions.length - 1) {
      this.currentQuizIndex++;
    }
  }
}

module.exports = Quiz;
