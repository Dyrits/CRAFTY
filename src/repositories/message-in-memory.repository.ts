import { Message } from "../usecases/post-message.usecase";
import { MessageRepository } from "./message.repository";

export class InMemoryMessageRepository implements MessageRepository {
  message: Message;

  save(message: Message) {
    this.message = message;
  }
}