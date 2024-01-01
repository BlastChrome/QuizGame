class Logger {
  constructor() {}

  logMessage(message) {
    if (typeof message !== "string")
      throw new Error("Error: message must be a string!");
    else if (message.length <= 0)
      throw new Error("Error: message be atleast 1 character long!");
    return message;
  }
}

module.exports = Logger;
