import { type NewMessage, zNewMessage } from "../../domain/message";
import type { DateProvider } from "../date.provider";
import type { MessageRepository } from "../message.repository.interface";

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
