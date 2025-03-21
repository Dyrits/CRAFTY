import * as fs from "fs";
import * as path from "path";

import { MessageRepository } from "./message.repository";
import { Message } from "../types";
import * as crypto from "node:crypto";

export class FileSystemMessageRepository implements MessageRepository {
  _messages: Message[] = [];

  private constructor() {
  }

  static async AsyncNew(): Promise<MessageRepository> {
    const instance = new FileSystemMessageRepository();
    await instance.read();
    return instance;
  }

  async save(message: Message) {
    this._messages.unshift(message as Message);
    await this.write();
  }

  async update(message: Message) {
    const index = this._messages.findIndex(($message) => $message.id === message.id);
    this._messages[index] = message;
    await this.write();
  }

  async get(id: string) {
    return this._messages.find((message) => message.id === id);
  }

  get messages() {
    return this._messages;
  }

  set messages(messages: Message[]) {
    throw new Error("Messages cannot be set directly. The save method must be used to add a new message.");
  }

  private async read() {
    const file = path.join(__dirname, "message.json");
    try {
      const content = await fs.promises.readFile(file, "utf-8");
      const messages = JSON.parse(content);
      this._messages = messages.map((message: Message) => ({
        ...message,
        date: new Date(message.date)
      }));
    } catch (error) {
      this._messages = [];
    }
  }

  private async write() {
    const file = path.join(__dirname, "message.json");
    return fs.promises.writeFile(file, JSON.stringify(this._messages));
  }
}