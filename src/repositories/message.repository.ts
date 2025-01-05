import { Message } from "../types";

export interface MessageRepository {
  _messages: Message[];
  save: (message: Partial<Message>) => Promise<void>;
  update: (message: { id: string, message: string }) => Promise<void>;

  get messages(): Message[];
  set messages(messages: Message[]);
}