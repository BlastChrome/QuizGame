class Quiz {
  constructor() {
    this.score = 0;
    this.currentQuestionIndex = 0;
    this.questions = [];
  }

  //   Getters
  getScore() {
    return this.score;
  }
  getCurrentQuestionIndex() {
    return this.currentQuestionIndex;
  }
  getQuestionsLength() {
    return this.questions.length;
  }

  //   Quiz manipulation methods
  incrementCurrentQuestionIndex() {
    this.currentQuestionIndex += 1;
  }
}

module.exports = Quiz;
