import { MessageRepository } from "./message.repository";
import { Message } from "../types";

export class InMemoryMessageRepository implements MessageRepository {
  _messages: Message[] = [];

  async save(message: Message) {
    this._messages.unshift(message);
  }

  get messages() {
    return this._messages;
  }

  set messages(messages: Message[]) {
    this._messages = messages;
  }
}

