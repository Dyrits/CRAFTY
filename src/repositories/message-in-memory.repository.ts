import { MessageRepository } from "./message.repository";
import { Message } from "../types";

export class InMemoryMessageRepository implements MessageRepository {
  _messages: Message[] = [];

  async save(message: Partial<Message>) {
    // @TODO: Add the identifier to the message.
    this._messages.unshift(message as Message);
  }

  async update(message: { id: string, message: string }) {
    const index = this._messages.findIndex($message => $message.id === message.id);
    if (!~index) {
      throw new Error("No message found with the given id.");
    }
    this._messages[index].message = message.message;
  }

  get messages() {
    return this._messages;
  }

  set messages(messages: Message[]) {
    this._messages = messages;
  }
}

