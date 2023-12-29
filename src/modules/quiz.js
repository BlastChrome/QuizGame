class Quiz {
  constructor() {
    this.score = 0;
    this.currentQuiz = {};
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

  getCurrentQuiz() {
    return this.currentQuiz;
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

  loadQuiz(quiz) {
    this.currentQuiz = quiz;
  }

  validateQuiz(quiz) {
    if (typeof quiz.title !== "string") return false;
    if (typeof quiz.icon !== "string") return false;
    if (!Array.isArray(quiz.questions)) return false;
    return true;
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
  incrementQuizQuestionIndex() {
    if (this.currentQuizQuestionIndex < this.questions.length - 1) {
      this.currentQuizQuestionIndex++;
    }
  }
  incremementScore() {
    this.score++;
  }
}

module.exports = Quiz;
