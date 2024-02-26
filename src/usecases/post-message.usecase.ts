import { MessageRepository } from "../repositories/message.repository";

export type MessageInput = { message: string; author: string };
export type Message = MessageInput & { date: Date };

export interface DateProvider {
  _now: Date;

  get now(): Date;

  set now(date: Date);
}

export class MessageLengthError extends Error {
  constructor() {
    super("Message can contain a maximum of 280 characters~");
  }
}

export class MessageEmptyError extends Error {
  constructor() {
    super("Message cannot be empty~");
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