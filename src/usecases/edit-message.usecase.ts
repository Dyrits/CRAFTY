import { MessageRepository } from "../repositories";
import { DateProvider } from "../providers";
import { MessageEmptyError, MessageLengthError } from "../errors";

export class EditMessageUseCase {
  constructor(
    private readonly repository: MessageRepository,
    private readonly provider: DateProvider
  ) {
  };

  async handle(message: { author: string, id: string, message: string }) {
    if (message.message.length > 280) {
      throw new MessageLengthError();
    }

    if (!message.message.trim()) {
      throw new MessageEmptyError();
    }

    const $message = await this.repository.get(message.id);

    if (!$message) {
      // @TODO: Create a custom error.
      throw new Error("No message was found with the provided identifier.");
    }

    if ($message.author !== message.author) {
      // @TODO: Create a custom error.
      throw new Error("Only the author of a message can edit it.");
    }

    await this.repository.update({...$message, ...message, date: this.provider.now });
  }
}