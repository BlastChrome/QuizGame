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

describe("Test for nomal quiz initialization", () => {
  const quiz = new Quiz();

  test("The initia score of a quiz shoule be 0", () => {
    const result = quiz.getScore();
    expect(result).toBe(0);
  });

  test("The initial length of the quiz question array should be 0", () => {
    const result = quiz.getQuestions();
    expect(result.length).toBe(0);
  });

  test("The initial index of the quiz should be 0", () => {
    const result = quiz.getCurrentQuizIndex();
    expect(result).toBe(0);
  });
});
