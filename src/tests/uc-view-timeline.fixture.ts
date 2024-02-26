import { DateProvider, StubDateProvider } from "../providers";
import { InMemoryMessageRepository, MessageRepository } from "../repositories";
import { Timeline, Message } from "../types";
import { ViewTimelineUseCase } from "../usecases";

export class UcViewTimelineFixture {
  timeline:  Timeline;
  repository: MessageRepository;
  providers: {  date: DateProvider };
  usecase: ViewTimelineUseCase;

  constructor() {
    this.repository = new InMemoryMessageRepository();
    this.providers = { date: new StubDateProvider() };
    this.usecase = new ViewTimelineUseCase(this.repository, this.providers.date);
  }

  given = {
    messages: (messages: Message[]) => {
      this.repository.messages = messages;
    },
    date: (date: Date) => {
      this.providers.date.now = date;
    }
  }

  when = {
    view: async (author: string) => {
      this.timeline = await this.usecase.handle({ author });
    }
  }

  then = {
    timeline: {
      equals: (timeline: Timeline) => {
        expect(timeline).toEqual(this.timeline);
      }
    }
  }
}