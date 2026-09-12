import type { DateProvider } from "../application/date.provider";
import type { MessageRepository } from "../application/message.repository.interface";
import { ViewTimelineUseCase } from "../application/usecases";
import type { Message, Timeline } from "../domain/message";
import { StubDateProvider } from "../infrastructure/providers";
import { InMemoryMessageRepository } from "../infrastructure/repositories";

export class UcViewTimelineFixture {
  timeline: Timeline = [];
  repository: MessageRepository;
  providers: { date: DateProvider };
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
  };

  when = {
    view: async (author: string) => {
      this.timeline = await this.usecase.handle({ author });
    }
  };

  then = {
    timeline: {
      equals: (timeline: Timeline) => {
        expect(timeline).toEqual(this.timeline);
      }
    }
  };
}
