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

  getQuestions() {
    return this.questions;
  }

  //   Quiz manipulation methods
  incrementCurrentQuestionIndex() {
    this.currentQuestionIndex += 1;
  }

  loadQuestions(data) {
    this.questions = data;
  }

  answer(userAnswer) {
    if (userAnswer == this.questions[this.currentQuestionIndex].answer) {
      return true;
    } else {
      return false;
    }
  }

  getCurrentQuestion() {
    return this.questions[this.getCurrentQuestionIndex()].question;
  }
}

module.exports = Quiz;
