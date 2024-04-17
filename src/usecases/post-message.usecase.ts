import { MessageRepository } from "../repositories";
import { DateProvider } from "../providers";
import { MessageInput } from "../types";

export class MessageLengthError extends Error {
  constructor() {
    super("Message can contain a maximum of 280 characters~");
    Object.setPrototypeOf(this, MessageLengthError.prototype)
  }
}

export class MessageEmptyError extends Error {
  constructor() {
    super("Message cannot be empty~");
    Object.setPrototypeOf(this, MessageEmptyError.prototype)
  }
}

export class PostMessageUseCase {
  constructor(
    private readonly repository: MessageRepository,
    private readonly provider: DateProvider
  ) {
  };

  async handle(message: MessageInput) {
    if (message.message.length > 280) {
      throw new MessageLengthError();
    }
    if (!message.message.trim()) {
      throw new MessageEmptyError();
    }
    await this.repository.save({...message, date: this.provider.now});
  }
}