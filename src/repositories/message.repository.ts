import { Message } from "../usecases/post-message.usecase";

export interface MessageRepository {
  message: Message;
  save: (message: Message) => Promise<void>;
}