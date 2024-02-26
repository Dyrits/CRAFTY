import { Message } from "../types";

export interface MessageRepository {
  _messages: Message[];
  save: (message: Message) => Promise<void>;

  get messages(): Message[];
  set messages(messages: Message[]);
}