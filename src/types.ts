export type MessageInput = { message: string; author: string };
export type Message = MessageInput & { date: Date };
export type Timeline= { message: String, author: String, elapsed: String }[];