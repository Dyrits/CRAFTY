import type { Message } from "../domain/message";

export interface MessageRepository {
  _messages: Message[];
  save: (message: Message) => Promise<void>;
  get: (id: string) => Promise<Message | null>;
  update: (message: Message) => Promise<void>;

  get messages(): Message[];
  set messages(messages: Message[]);
}
