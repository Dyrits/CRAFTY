import { DateProvider, Message, MessageInput, PostMessageUsecase } from "../usecases/post-message.usecase";

import { MessageRepository } from "../repositories/message.repository";
import { InMemoryMessageRepository } from "../repositories/message-in-memory.repository";

export class StubDateProvider implements DateProvider {
  _now: Date;

  set now($now: Date) {
    this._now = $now;
  }

  get now() {
    return this._now;
  }
}

export class UCPostMessageFixture {
  // Variables
  error: Error;
  repository: MessageRepository;
  providers: {  date: DateProvider };
  usecase: PostMessageUsecase;

  constructor() {
    this.providers = { date: new StubDateProvider() };
    this.repository = new InMemoryMessageRepository();
    this.usecase = new PostMessageUsecase(this.repository, this.providers.date);
  }

  given = {
    date: (date: Date) => {
      this.providers.date.now = date;
    }
  };

  when = {
    post: async ($message: MessageInput) => {
      try {
        await this.usecase.handle($message);
      } catch (error) {
        this.error = error;
      }
    }
  };

  then = {
    message: {
      equals: (message: Message) => {
        expect(message).toEqual(this.repository.message);
      }
    },
    error: {
      is: (error: new () => Error) => {
        expect(this.error).toBeInstanceOf(error);
      }
    }
  };
}
