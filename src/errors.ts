export class MessageLengthError extends Error {
  constructor() {
    super("Message length exceeds the allowed limit.");
    this.name = "MessageLengthError";
    Object.setPrototypeOf(this, MessageLengthError.prototype);
  }
}

export class MessageEmptyError extends Error {
  constructor() {
    super("Message cannot be empty.");
    this.name = "MessageEmptyError";
    Object.setPrototypeOf(this, MessageEmptyError.prototype);
  }
}