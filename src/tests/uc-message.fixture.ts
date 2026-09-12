import { ZodError } from "zod";
import type { DateProvider } from "../application/date.provider";
import type { MessageRepository } from "../application/message.repository.interface";
import { PostMessageUseCase } from "../application/usecases";
import { EditMessageUseCase } from "../application/usecases/edit-message.usecase";
import type { ErrorMessage } from "../domain/errors";
import type { Message, NewMessage, UpdatedMessage } from "../domain/message";
import { StubDateProvider } from "../infrastructure/providers";
import { InMemoryMessageRepository } from "../infrastructure/repositories";

export class UCMessageFixture {
  // Variables
  error: Error | ZodError | null = null;
  repository: MessageRepository;
  providers: { date: DateProvider };
  usecases: {
    post: PostMessageUseCase;
    edit: EditMessageUseCase;
  };

  constructor() {
    this.repository = new InMemoryMessageRepository();
    this.providers = { date: new StubDateProvider() };
    this.usecases = {
      post: new PostMessageUseCase(this.repository, this.providers.date),
      edit: new EditMessageUseCase(this.repository, this.providers.date)
    };
  }

  given = {
    date: (date: Date) => {
      this.providers.date.now = date;
    },
    message: async (message: Message) => {
      await this.repository.save(message);
    }
  };

  when = {
    post: async (message: NewMessage) => {
      try {
        await this.usecases.post.handle(message);
      } catch (error) {
        this.error = error as Error | ZodError;
      }
    },
    edit: async (message: UpdatedMessage) => {
      try {
        await this.usecases.edit.handle(message);
      } catch (error) {
        this.error = error as Error | ZodError;
      }
    }
  };

  then = {
    message: {
      equals: (message: Message) => {
        expect(message).toEqual(this.repository.messages[0]);
      }
    },
    error: {
      has: (error: ErrorMessage) => {
        if (this.error instanceof ZodError) {
          expect(this.error.issues.map((issue) => issue.message)).toContain(error);
        } else if (this.error) {
          expect(this.error.message).toBe(error);
        }
      }
    }
  };
}
