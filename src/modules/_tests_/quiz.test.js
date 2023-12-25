const { description } = require("commander");
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

describe("Quiz question array tests", () => {
  test("Quiz should be able to increment the current question Index", () => {
    const currentIndex = quiz.getCurrentQuestionIndex();
    quiz.incrementCurrentQuestionIndex();
    const nextIndex = quiz.getCurrentQuestionIndex();
    expect(nextIndex).toBe(currentIndex + 1);
  });
  test("if the currentIndex exceeds the array it should throw an error", () => {
    const length = quiz.getQuestionsLength();
    const bounds = length + 1;
    expect(bounds);
  });
});
