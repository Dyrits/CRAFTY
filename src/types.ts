import z from "zod";
import { ErrorMessage } from "./errors";

export const zNewMessage = z.object({
  id: z.string().optional(),
  author: z.string(),
  message: z.string().trim().min(1, ErrorMessage.MessageEmptyError).max(280, ErrorMessage.MessageLengthError)
});

export const zUpdatedMessage = zNewMessage.extend({
  id: z.string()
});

export const zMessage = zUpdatedMessage.extend({
  date: z.date()
});

export type NewMessage = z.infer<typeof zNewMessage>;
export type UpdatedMessage = z.infer<typeof zUpdatedMessage>;
export type Message = z.infer<typeof zMessage>;
export type TimeLineMessage = { id: string; message: string; author: string; elapsed: string };
export type Timeline = TimeLineMessage[];
