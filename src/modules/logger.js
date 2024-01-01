class Logger {
  constructor() {}

  formatMessage(message) {
    return typeof message == "number" ? message.toString() : message;
  }

  logMessage(message) {
    const formatted = this.formatMessage(message);
    if (typeof formatted !== "string")
      throw new Error("Error: message must be a string!");
    else if (formatted.length <= 0)
      throw new Error("Error: message be atleast 1 character long!");
    return formatted;
  }
}

module.exports = Logger;
