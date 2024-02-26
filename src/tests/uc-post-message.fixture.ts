import { DateProvider, StubDateProvider } from "../providers";
import { InMemoryMessageRepository, MessageRepository } from "../repositories";
import { Message, MessageInput } from "../types";
import { PostMessageUseCase } from "../usecases";

export class UCPostMessageFixture {
  // Variables
  error: Error;
  repository: MessageRepository;
  providers: {  date: DateProvider };
  usecase: PostMessageUseCase;

  constructor() {
    this.repository = new InMemoryMessageRepository();
    this.providers = { date: new StubDateProvider() };
    this.usecase = new PostMessageUseCase(this.repository, this.providers.date);
  }

  given = {
    date: (date: Date) => {
      this.providers.date.now = date;
    }
  };

  when = {
    post: async (message: MessageInput) => {
      try {
        await this.usecase.handle(message);
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
