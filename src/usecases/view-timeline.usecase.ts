import { DateProvider } from "../providers";
import { MessageRepository } from "../repositories";
import { Timeline } from "../types";

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
      const elapsed = this.getElapsed(message.date);
      return { message: message.message, author: message.author, elapsed };
    });
  }

  private getElapsed(from: Date, to: Date = this.provider.now) {
    const elapsed = to.getTime() - from.getTime();
    const seconds = Math.floor(elapsed / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    return days ? `${days} day(s) ago` : hours ? `${hours} hour(s) ago` : minutes ? `${minutes} minute(s) ago` : `Less than a minute ago`;
  }
}