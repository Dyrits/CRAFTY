import * as fs from "node:fs";
import * as path from "node:path";
import type { Message } from "../types";
import type { MessageRepository } from "./message.repository";

export class FileSystemMessageRepository implements MessageRepository {
  _messages: Message[] = [];

  private constructor(private readonly file: string) {}

  static async AsyncNew(file: string = path.join(__dirname, "message.json")): Promise<MessageRepository> {
    const instance = new FileSystemMessageRepository(file);
    await instance.read();
    return instance;
  }

  async save(message: Message) {
    this._messages.unshift(message as Message);
    await this.write();
  }

  async update(message: Message) {
    const index = this._messages.findIndex(($message) => $message.id === message.id);
    if (~index) {
      this._messages[index] = message;
      await this.write();
    }
  }

  async get(id: string) {
    return this._messages.find((message) => message.id === id) || null;
  }

  get messages() {
    return this._messages;
  }

  set messages(_messages: Message[]) {
    throw new Error("Messages cannot be set directly. The save method must be used to add a new message.");
  }

  private async read() {
    try {
      const content = await fs.promises.readFile(this.file, "utf-8");
      const messages = JSON.parse(content);
      this._messages = messages.map((message: Message) => ({
        ...message,
        date: new Date(message.date)
      }));
    } catch (_error) {
      this._messages = [];
    }
  }

  private async write() {
    return fs.promises.writeFile(this.file, JSON.stringify(this._messages));
  }
}
