module.exports = function Log(properties = {}) {
  ({
    message: this.message,
    level: this.level,
    senderClass: this.senderClass,
    thread: this.thread,
    timestamp: this.timestamp,
  } = properties);
};
