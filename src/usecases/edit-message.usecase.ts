import { MessageRepository } from "../repositories";
// import { DateProvider } from "../providers";
import { MessageEmptyError, MessageLengthError } from "../errors";

export class EditMessageUseCase {
  constructor(
    private readonly repository: MessageRepository,
    // private readonly provider: DateProvider
  ) {
  };

  async handle(message: { id: string, message: string }) {
    if (message.message.length > 280) {
      throw new MessageLengthError();
    }
    if (!message.message.trim()) {
      throw new MessageEmptyError();
    }
    await this.repository.update(message);
  }
}