import type { DateProvider } from "../providers";
import type { MessageRepository } from "../repositories";
import { type NewMessage, zNewMessage } from "../types";

export class PostMessageUseCase {
  constructor(
    private readonly repository: MessageRepository,
    private readonly provider: DateProvider
  ) {}

  async handle(message: NewMessage) {
    zNewMessage.parse(message);

    await this.repository.save({ ...message, id: message.id || crypto.randomUUID(), date: this.provider.now });
  }
}
