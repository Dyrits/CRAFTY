import type { DateProvider } from "../providers";
import type { MessageRepository } from "../repositories";
import { type UpdatedMessage, zUpdatedMessage } from "../types";

export class EditMessageUseCase {
  constructor(
    private readonly repository: MessageRepository,
    private readonly provider: DateProvider
  ) {}

  async handle(message: UpdatedMessage) {
    zUpdatedMessage.parse(message);

    const $message = await this.repository.get(message.id);

    if (!$message) {
      // @TODO: Create a custom error.
      throw new Error("No message was found with the provided identifier.");
    }

    if ($message.author !== message.author) {
      // @TODO: Create a custom error.
      throw new Error("Only the author of a message can edit it.");
    }

    await this.repository.update({ ...$message, ...message, date: this.provider.now });
  }
}
