
import * as fs from "fs";
import * as path from "path";

import { Message } from "../usecases/post-message.usecase";
import { MessageRepository } from "./message.repository";

export class FileSystemMessageRepository implements MessageRepository {
    message: Message;

    async save(message: Message) {
        this.message = message;
        const file = path.join(__dirname, 'message.json');
        let messages: Message[] = [];

        if (fs.existsSync(file)) {
            const content = await fs.promises.readFile(file, 'utf-8');
            messages = JSON.parse(content);
        }
        messages.push(this.message );
        return fs.promises.writeFile(file, JSON.stringify(messages));
    }
}