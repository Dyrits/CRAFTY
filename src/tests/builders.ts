import { Message, TimeLineMessage } from "../types";

export const builders = {
  message: ({
              id = "#Test-ID",
              author = "#Test-AUTHOR",
              message = "#Test-MESSAGE",
              date = new Date("2024-01-01T10:00:00Z")
            }: Partial<Message>) => ({ id, author, message, date }),
  timeline: ({
               id = "#Test-ID",
               message = "#Test-MESSAGE",
               author = "#Test-AUTHOR",
               elapsed = "#Test-ELAPSED"
             }: Partial<TimeLineMessage>) => ({ id, message, author, elapsed })
};