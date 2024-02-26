import * as fs from "fs";
import * as path from "path";

import { MessageRepository } from "./message.repository";
import { Message } from "../types";

export class FileSystemMessageRepository implements MessageRepository {
    _messages: Message[] = [];

    async save(message: Message) {
        const file = path.join(__dirname, 'message.json');

        if (fs.existsSync(file)) {
            const content = await fs.promises.readFile(file, 'utf-8');
            this._messages = JSON.parse(content);
        }
        this._messages.unshift(message);
        return fs.promises.writeFile(file, JSON.stringify(this._messages));
    }

    get messages() {
        return this._messages;
    }

    set messages(messages: Message[]) {
        throw new Error("Messages cannot be set directly. The save method must be used to add a new message.");
    }
}