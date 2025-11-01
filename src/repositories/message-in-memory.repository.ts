import * as crypto from "node:crypto";
import type { Message } from "../types";
import type { MessageRepository } from "./message.repository";

export class InMemoryMessageRepository implements MessageRepository {
  _messages: Message[] = [];

  async save(message: Message) {
    message.id = message.id || crypto.randomUUID();
    this._messages.unshift(message);
  }

  async update(message: Message) {
    const index = this._messages.findIndex(($message) => $message.id === message.id);
    this._messages[index] = message;
  }

  async get(id: string) {
    return this._messages.find((message) => message.id === id) || null;
  }

  get messages() {
    return this._messages;
  }

  set messages(messages: Message[]) {
    this._messages = messages;
  }
}
