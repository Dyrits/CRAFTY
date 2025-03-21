import { MessageRepository } from "../repositories";
import { DateProvider } from "../providers";
import { NewMessage } from "../types";
import { MessageEmptyError, MessageLengthError } from "../errors";

export class PostMessageUseCase {
  constructor(
    private readonly repository: MessageRepository,
    private readonly provider: DateProvider
  ) {
  };

  async handle(message: NewMessage) {

    if (message.message.length > 280) {
      throw new MessageLengthError();
    }

    if (!message.message.trim()) {
      throw new MessageEmptyError();
    }

    await this.repository.save({...message, id: message.id || crypto.randomUUID(), date: this.provider.now });
  }
}