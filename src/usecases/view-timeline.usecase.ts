import { DateProvider } from "../providers";
import { MessageRepository } from "../repositories";
import { Timeline } from "../types";
import { getElapsed } from "../helpers/datetime.helper";

export class ViewTimelineUseCase {
  repository: MessageRepository;
  provider: DateProvider;

  constructor(repository: MessageRepository, provider: DateProvider) {
    this.repository = repository;
    this.provider = provider;
  }

  async handle({ author }: { author: string }): Promise<Timeline> {
    const messages = this.repository.messages.filter(message => message.author === author);
    return messages.sort((date$1, date$2) => date$2.date.getTime() - date$1.date.getTime()).map(message => {
      const elapsed = getElapsed(message.date, this.provider.now);
      return { message: message.message, author: message.author, elapsed };
    });
  }

}