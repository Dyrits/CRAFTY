import { DateProvider, StubDateProvider } from "../providers";
import { InMemoryMessageRepository, MessageRepository } from "../repositories";
import { Message, MessageInput } from "../types";
import { PostMessageUseCase } from "../usecases";
import { EditMessageUseCase } from "../usecases/edit-message.usecase";

export class UCMessageFixture {
  // Variables
  error: Error;
  repository: MessageRepository;
  providers: {  date: DateProvider };
  usecases: {
    post: PostMessageUseCase,
    edit: EditMessageUseCase,
  }

  constructor() {
    this.repository = new InMemoryMessageRepository();
    this.providers = { date: new StubDateProvider() };
    this.usecases = {
      post: new PostMessageUseCase(this.repository, this.providers.date),
      edit: new EditMessageUseCase(this.repository),
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
    post: async (message: MessageInput) => {
      try {
        await this.usecases.post.handle(message);
      } catch (error) {
        this.error = error;
      }
    },
    edit: async (message: { id: string, message: string }) => {
      try {
        await this.usecases.edit.handle(message);
      } catch (error) {
        this.error = error;
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
      is: (error: new () => Error) => {
        expect(this.error).toBeInstanceOf(error);
      }
    }
  };
}
