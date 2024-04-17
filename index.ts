#!/usr/bin/env node

import { Command } from "commander";

import {  PostMessageUseCase } from "./src/usecases/post-message.usecase";
import { FileSystemMessageRepository } from "./src/repositories";
import { DateProvider } from "./src/providers";
import { Message } from "./src/types";

class RealDateProvider implements DateProvider {
  _now: Date;

  constructor() {
    this._now = new Date();
  }

  get now(): Date {
    return this._now;
  }
}

const repository = new FileSystemMessageRepository();
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
          console.table([repository.messages]);
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