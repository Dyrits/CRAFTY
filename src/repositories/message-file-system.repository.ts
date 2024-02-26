
import * as fs from "fs";
import * as path from "path";

import { Message } from "../usecases/post-message.usecase";
import { MessageRepository } from "./message.repository";

export class FileSystemMessageRepository implements MessageRepository {
    message: Message;

    async save(message: Message) {
        this.message = message;
        return fs.promises.writeFile(path.join(__dirname, 'message.json'), JSON.stringify(this.message));
    }
}