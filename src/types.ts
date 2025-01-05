export type MessageInput = { id?: string; message: string; author: string };
export type Message = MessageInput & { id: string, date: Date };
export type TimeLineMessage = { id: string, message: string, author: string, elapsed: string };
export type Timeline= TimeLineMessage[];