import { MessageRepository } from "../repositories";
import { DateProvider } from "../providers";
import { MessageInput } from "../types";
import { MessageEmptyError, MessageLengthError } from "../errors";

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