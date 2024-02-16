import { DateProvider, Message, MessageInput, MessageRepository, UCPostMessage } from "../usecases/uc-post-message";

class StubDateProvider implements DateProvider {
  _now: Date;

  set now($now: Date) {
    this._now = $now;
  }

  get now() {
    return this._now;
  }
}

class InMemoryMessageRepository implements MessageRepository {
  message: Message;

  save(message: Message) {
    this.message = message;
  }
}


export class UCPostMessageFixture {
  // Variables
  error: Error;
  repository: MessageRepository;
  providers: {  date: DateProvider };
  usecase: UCPostMessage;

  constructor() {
    this.providers = { date: new StubDateProvider() };
    this.repository = new InMemoryMessageRepository();
    this.usecase = new UCPostMessage(this.repository, this.providers.date);
  }

  given = {
    date: (date: Date) => {
      this.providers.date.now = date;
    }
  };

  when = {
    post: ($message: MessageInput) => {
      try {
        this.usecase.handle($message);
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
