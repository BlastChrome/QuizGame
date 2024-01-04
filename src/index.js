// import "./scss/main.scss";
// import Logger from "./modules/logger";
// import Quiz from "./modules/quiz";
// import data from "./data.json";

const Logger = require("./modules/logger");
const Quiz = require("./modules/quiz");
const data = require("./data.json");

const logger = new Logger();

const quiz = new Quiz(logger);

quiz.loadQuiz(data.quizzes[0]);
