import { Message } from "../usecases/post-message.usecase";
import { MessageRepository } from "./message.repository";

export class FileSystemMessageRepository implements MessageRepository {
    message: Message;
    async save(message: Message) {
        this.message = message;
    }
}