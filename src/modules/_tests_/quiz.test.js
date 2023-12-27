const Quiz = require("../quiz");

describe("Tests for nomal quiz initialization", () => {
  const quiz = new Quiz();
  test("The initial score of a quiz shoule be 0", () => {
    const result = quiz.getScore();
    expect(result).toBe(0);
  });

  test("The initial length of the quiz question array should be 0", () => {
    const result = quiz.getAllQuestions();
    expect(result.length).toBe(0);
  });

  test("The initial index of the quiz should be 0", () => {
    const result = quiz.getCurrentQuizIndex();
    expect(result).toBe(0);
  });
});

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

describe("Tests for how the questions array is loaded into the quiz object", () => {
  test("should load questions into the question array", () => {
    const quiz = new Quiz();
    quiz.loadAllQuestions(mockQuestions);
    const questions = quiz.getAllQuestions();
    expect(questions).toEqual(mockQuestions);
    expect(questions.length).toBe(mockQuestions.length);
  });

  test("the initial quiz index should point to the first question", () => {
    const quiz = new Quiz();
    quiz.loadAllQuestions(mockQuestions);
    const currentQuestion = quiz.getCurrentQuestion();
    expect(currentQuestion).toBe(mockQuestions[0]);
    expect(quiz.getCurrentQuizIndex()).toBe(0);
  });

  test("Should throw an error if the loaded questions array is empty", () => {
    const quiz = new Quiz();
    const loadEmptyQuestions = () => {
      quiz.loadAllQuestions([]);
    };
    expect(loadEmptyQuestions).toThrow(
      Error("Error: Questions array cannot be empty or invalid!")
    );
  });
});

describe("Tests to validate the structure of questions", () => {
  test("Should validate the structure of a question object", () => {
    const quiz = new Quiz();
    const validQuestion = mockQuestions[0];
    expect(quiz.validateQuestion(validQuestion)).toBe(true);
  });

  test("Detects missing question property", () => {
    const quiz = new Quiz();
    const invalidQuestion = { ...mockQuestions[0], question: undefined };
    expect(quiz.validateQuestion(invalidQuestion)).toBe(false);
  });

  test("Detects missing answer property", () => {
    const quiz = new Quiz();
    const invalidAnswer = { ...mockQuestions[0], answer: undefined };
    expect(quiz.validateQuestion(invalidAnswer)).toBe(false);
  });

  test("Detects missing options property", () => {
    const quiz = new Quiz();
    const invalidOptions = { ...mockQuestions[0], options: undefined };
    expect(quiz.validateQuestion(invalidOptions)).toBe(false);
  });
});

describe("Test to validate when the user selects an option", () => {
  test("Should return true if the correct answer is picked", () => {
    const quiz = new Quiz();
    quiz.loadAllQuestions(mockQuestions);
    const correct = "2";
    expect(quiz.selectOption(correct)).toBe(true);
  });

  test("Should return false if any incorrect options are selected", () => {
    const quiz = new Quiz();
    quiz.loadAllQuestions(mockQuestions);
    const incorrect_1 = "1";
    const incorrect_2 = "4";
    const incorrect_3 = "3";
    expect(quiz.selectOption(incorrect_1)).toBe(false);
    expect(quiz.selectOption(incorrect_2)).toBe(false);
    expect(quiz.selectOption(incorrect_3)).toBe(false);
  });

  test("Score should increment when the correct answer is picked", () => {
    const quiz = new Quiz();
    quiz.loadAllQuestions(mockQuestions);
    const correct = "2";
    quiz.selectOption(correct);
    const newScore = quiz.getScore(); // 1
    expect(newScore).toBe(1);
  });

  test("score should remain the same, if the incorrect answer is picked", () => {
    const quiz = new Quiz();
    quiz.loadAllQuestions(mockQuestions);
    const incorrect_1 = "1";
    const incorrect_2 = "4";
    const incorrect_3 = "3";
    quiz.selectOption(incorrect_1);
    quiz.selectOption(incorrect_2);
    quiz.selectOption(incorrect_3);
    const score = quiz.getScore();
    expect(score).toBe(0);
  });
});
