// Import necessary modules
const Quiz = require("../quiz");
const Logger = require("../logger");

// Mock data for quizzes and questions
const mockQuizzes = [
  {
    title: "HTML",
    icon: "./assets/images/icon-html.svg",
    questions: [
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
    ],
  },
  {
    title: "CSS",
    icon: "./assets/images/icon-html.svg",
    questions: [
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
    ],
  },
  {
    title: "JavaScript",
    icon: "./assets/images/icon-html.svg",
    questions: [
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
    ],
  },
  {
    title: "Accessibility",
    icon: "./assets/images/icon-html.svg",
    questions: [
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
    ],
  },
];

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

describe("Quiz Class Initialization", () => {
  let quiz;
  let logger = new Logger();

  beforeEach(() => {
    quiz = new Quiz(logger);
  });

  test("Initial score should be 0", () => {
    expect(quiz.getScore()).toBe(0);
  });

  test("Initial length of question array should be 0", () => {
    expect(quiz.getAllQuestions().length).toBe(0);
  });

  test("Initial question index should be 0", () => {
    expect(quiz.getQuestionIndex()).toBe(0);
  });

  test("Initial quiz object should be empty", () => {
    expect(quiz.getCurrentQuiz()).toEqual({});
  });

  test("Initial isComplete property should return false", () => {
    expect(quiz.getIsComplete()).toBe(false);
  });

  test("inProgress should return false initially", () => {
    expect(quiz.getIsInProgress()).toBe(false);
  });

  test("quiz instance should have a logger property", () => {
    expect(quiz.logger instanceof Logger).toBe(true);
  });
});

describe("Loading and Validating Quiz arrays", () => {
  let quiz;
  beforeEach(() => {
    quiz = new Quiz();
  });

  // function for introducing and testing bad data
  const createMalformedQuiz = (overrides) => ({
    title: "Test Quiz",
    icon: "./assets/images/icon-test.svg",
    questions: [],
    ...overrides,
  });

  test("should be able to add a quiz array to the current quiz property", () => {
    quiz.loadQuiz(mockQuizzes[0]); // should load quiz #1
    const currentQuiz = quiz.getCurrentQuiz();
    expect(currentQuiz).toEqual(mockQuizzes[0]);
  });

  describe("Should throw an error if a quiz is malformed", () => {
    test("should throw an error if the title property is not a string", () => {
      const badTitleQuiz = createMalformedQuiz({ title: 0 });
      expect(() => quiz.loadQuiz(badTitleQuiz)).toThrow(
        "Invalid Quiz structure detected!"
      );
    });

    test("should throw an error if the questions property is not an array", () => {
      const badQuestions = createMalformedQuiz({ questions: {} });
      expect(() => quiz.loadQuiz(badQuestions)).toThrow(
        "Invalid Quiz structure detected!"
      );
    });

    test("Should throw an error if the icon is not a string", () => {
      const badIcon = createMalformedQuiz({ icon: {} });
      expect(() => quiz.loadQuiz(badIcon)).toThrow();
    });

    test("Should throw an error if the icon doesnt end with jpg, svg, jpeg or ,png", () => {
      const badIcon = createMalformedQuiz({
        icon: "./assets/images/icon-test.mp4",
      });
      expect(() => quiz.loadQuiz(badIcon)).toThrow();
    });
  });
});

describe("Question Handling", () => {
  let quiz;

  beforeEach(() => {
    quiz = new Quiz();
  });

  describe("Loading Questions", () => {
    test("Should load questions into the array", () => {
      quiz.loadAllQuestions(mockQuestions);
      expect(quiz.getAllQuestions()).toEqual(mockQuestions);
    });

    test("inProgress should return true, after questions are loaded", () => {
      quiz.loadAllQuestions(mockQuestions);
      expect(quiz.getIsInProgress()).toBe(true);
    });

    test("Should point to the first question initially", () => {
      quiz.loadAllQuestions(mockQuestions);
      expect(quiz.getCurrentQuestionObject()).toBe(mockQuestions[0]);
    });

    test("Empty question array should throw an error", () => {
      expect(() => quiz.loadAllQuestions([])).toThrow();
    });

    test("Missing question array should throw an error", () => {
      expect(() => quiz.loadAllQuestions(null)).toThrow();
    });

    test("Should not be able to load questions after a quiz is in progress", () => {
      quiz.loadAllQuestions(mockQuestions);

      // answer a few questions
      quiz.selectOption(mockQuestions[0].answer);
      quiz.selectOption(mockQuestions[1].answer);

      // should throw an error if another set of questions are loaded at this point
      expect(() => quiz.loadAllQuestions(mockQuestions)).toThrow(
        "Error: Cannot load questions while quiz is in progress!"
      );
    });
  });

  describe("Validating Questions", () => {
    test("Valid question should return true", () => {
      expect(quiz.validateQuestion(mockQuestions[0])).toBe(true);
    });

    test("Invalid question should return false", () => {
      const badQuestion = {
        question: "what's 1 +1",
        options: ["1", "2", "3", "4", "5"],
        answer: 2,
      };
      expect(quiz.validateQuestion(badQuestion)).toBe(false);
    });

    test("Should be able to increment to the next question", () => {
      quiz.loadAllQuestions(mockQuestions);
      quiz.incrementQuizQuestionIndex();
      expect(quiz.getQuestionIndex()).toBe(1);
    });

    test("Incrementing question index should not exceed the number of questions", () => {
      quiz.loadAllQuestions(mockQuestions);

      //increment the the current question index to the end of the array:
      for (let i = 0; i < mockQuestions.length; i++) {
        quiz.incrementQuizQuestionIndex();
      }
      // check should stop this from incrementing
      quiz.incrementQuizQuestionIndex();
      expect(quiz.getQuestionIndex()).toBeLessThanOrEqual(mockQuestions.length);
    });
  });

  // Further testing: Add tests for edge cases, such as loading questions after a quiz has started
});

describe("User Interaction with Quiz", () => {
  let quiz;

  beforeEach(() => {
    quiz = new Quiz();
    quiz.loadAllQuestions(mockQuestions);
  });

  test("Correct answer should return true", () => {
    expect(quiz.selectOption("2")).toBe(true);
  });

  test("Incorect answer should return false", () => {
    expect(quiz.selectOption("3")).toBe(false);
  });

  describe("Scoring Mechanism", () => {
    test("Score increments with correct answer", () => {
      quiz.selectOption("2");
      expect(quiz.getScore()).toBe(1);
    });

    test("Score remains same with incorrect answer", () => {
      const oldScore = quiz.getScore();
      quiz.selectOption("1");
      expect(quiz.getScore()).toBe(oldScore);
    });

    test("A perfect score should be equal to the length of the quiz", () => {
      //loop throw the quiz selecting the correct answer each time
      mockQuestions.forEach((question) => quiz.selectOption(question.answer));
      const quizLength = mockQuestions.length;
      const finalScore = quiz.getScore();
      expect(finalScore).toBe(quizLength);
    });

    // Further testing: Add tests for other user interactions, if any
  });

  describe("Tests for the reaching the end of the quiz", () => {
    test("isComplete should be true, when the end of the quiz is reached", () => {
      // increment to the end of the quiz
      for (let i = 0; i < mockQuestions.length; i++) {
        quiz.incrementQuizQuestionIndex();
      }
      const isQuizFinished = quiz.getIsComplete();
      expect(isQuizFinished).toBe(true);
    });

    test("In progress should be false, when the end of the quiz is reached", () => {
      for (let i = 0; i < mockQuestions.length; i++) {
        quiz.incrementQuizQuestionIndex();
      }
      const isQuizInProgress = quiz.getIsInProgress();
      expect(isQuizInProgress).toBe(false);
    });
  });
});

describe("Quiz Logger Integration", () => {
  let quiz;
  let logger;
  const mockQuiz = mockQuizzes[0];

  beforeEach(() => {
    logger = new Logger();
    quiz = new Quiz(logger); // Assuming Quiz takes a logger as a dependency
    jest.spyOn(logger, "printMessage");
    quiz.loadQuiz(mockQuiz);
  });

  describe("Quiz Loaded Logs", () => {
    test("Should log the title of the loaded quiz", () => {
      expect(logger.printMessage).toHaveBeenCalledWith(
        `Quiz successfully loaded: ${mockQuiz.title} quiz\n`
      );
    });

    test("Should log the current question of a quiz", () => {
      const currentQuestion = quiz.getCurrentQuestionObject().question;
      expect(logger.printMessage).toHaveBeenCalledWith(
        `Question #${quiz.getQuestionIndex() + 1}: ${currentQuestion}\n`
      );
    });
  });
});
