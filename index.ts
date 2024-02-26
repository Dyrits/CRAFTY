#!/usr/bin/env node

import { Command } from "commander";

import { DateProvider, Message, PostMessageUseCase } from "./src/usecases/post-message.usecase";
import { InMemoryMessageRepository } from "./src/repositories/message-in-memory.repository";

class RealDateProvider implements DateProvider {
  _now: Date;

  constructor() {
    this._now = new Date();
  }

  get now(): Date {
    return this._now;
  }
}

const repository = new InMemoryMessageRepository();
const provider = new RealDateProvider();
const usecase = new PostMessageUseCase(repository, provider);

const program = new Command();

program.version("0.0.1")
  .description("Crafty CLI")
  .addCommand(
    new Command("post")
      .argument("<user>", "The current user")
      .argument("<message>", "The message to post")
      .action(async (user, $message) => {
        const message: Message = {
          date: new Date(),
          author: user,
          message: $message
        };
        try {
          await usecase.handle(message);
          console.info("✅ Message posted!");
          console.table([repository.message]);
        } catch (error) {
          console.error("❌", error.message);
        }
      })
  );

async function main() {
  await program.parseAsync();
}

main().then(() => {
  process.exit(0);
});