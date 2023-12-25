const Quiz = require("../quiz");

const mockQuestions = [
  {
    question: "What is 1 + 1?",
    options: ["1", "2", "3", "4"],
    answer: "2",
  },
  {
    question: "What is 2 + 2?",
    options: ["1", "2", "3", "4"],
    answer: "4",
  },
  {
    question: "What is 1 + 2?",
    options: ["1", "2", "3", "4"],
    answer: "3",
  },
];

const quiz = new Quiz();

describe("Quiz Initialization", () => {
  test("Quiz should initialize with a score of 0", () => {
    const score = quiz.getScore();
    expect(score).toBe(0);
  });
  test("The index of the initial question should be 0", () => {
    const currentIndex = quiz.getCurrentQuestionIndex();
    expect(currentIndex).toBe(0);
  });
  test("The length of the initial question list, should be 0", () => {
    const length = quiz.getQuestionsLength();
    expect(length).toBe(0);
  });
});

describe("Quiz Methods", () => {
  test("Quiz should load the questions", () => {
    quiz.loadQuestions(mockQuestions);
    expect(mockQuestions).toBe(quiz.getQuestions());
  });
  test("Quiz should return the current questions", () => {
    quiz.loadQuestions(mockQuestions);
    const currentQuestion = quiz.getCurrentQuestion();
    expect(currentQuestion).toBe(quiz.getCurrentQuestion());
  });
  test("Quiz should return true if the correct answer is picked, or false otherwise", () => {
    quiz.loadQuestions(mockQuestions);
    userAnswer = "2";
    const result = quiz.answer(userAnswer);
    expect(result).toBe(true);
  });
});
