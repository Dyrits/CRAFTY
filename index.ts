#!/usr/bin/env node

import { Command } from "commander";

import { DateProvider } from "./src/providers";
import { PostMessageUseCase, ViewTimelineUseCase } from "./src/usecases";
import { FileSystemMessageRepository } from "./src/repositories";
import { NewMessage, UpdatedMessage } from "./src/types";
import { EditMessageUseCase } from "./src/usecases/edit-message.usecase";

class RealDateProvider implements DateProvider {
  _now: Date;

  constructor() {
    this._now = new Date();
  }

  get now(): Date {
    return this._now;
  }
}

const program = new Command();

async function main() {
  const repository = await FileSystemMessageRepository.AsyncNew();
  const provider = new RealDateProvider();
  const usecases = {
    post: new PostMessageUseCase(repository, provider),
    edit: new EditMessageUseCase(repository, provider),
    timeline: new ViewTimelineUseCase(repository, provider),
  }

  program.version("0.0.1")
    .description("Crafty CLI")
    .addCommand(
      new Command("post")
        .argument("<user>", "The user posting the message")
        .argument("<message>", "The message to post")
        .action(async (user, $message) => {
          const message: NewMessage = {
            author: user,
            message: $message
          };
          try {
            await usecases.post.handle(message);
            console.info("✅ Message posted!");
            console.table([repository.messages]);
          } catch (error) {
            console.error("❌", error.message);
          }
        })
    )
    .addCommand(
    new Command("edit")
      .argument("<user>", "The user editing the message")
      .argument("<id>", "The identifier of the message to edit")
      .argument("<message>", "The new message")
      .action(async (user, id, $message) => {
        const message: UpdatedMessage = {
          id: id,
          author: user,
          message: $message
        };
        try {
          await usecases.edit.handle(message);
          console.info("✅ Message edited!");
          console.table([repository.messages]);
        } catch (error) {
          console.error("❌", error.message);
        }
      })
  ).addCommand(
    new Command("view")
      .argument("<author>", "The author of the timeline to view")
      .action(async (author) => {
        try {
          const timeline = await usecases.timeline.handle({ author });
          console.info("✅ Timeline retrieved!");
          console.table(timeline);
        } catch (error) {
          console.error("❌", error.message);
        }
      })
  );


  await program.parseAsync();
}

main().then(() => {
  process.exit(0);
});