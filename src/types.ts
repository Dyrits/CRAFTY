export type NewMessage = { id?: string; message: string; author: string };
export type UpdatedMessage = { id: string; message: string; author: string };
export type Message = UpdatedMessage & { date: Date };
export type TimeLineMessage = { id: string, message: string, author: string, elapsed: string };
export type Timeline= TimeLineMessage[];