import * as fs from "node:fs";
import * as path from "node:path";
import { FileSystemMessageRepository } from "../repositories";
import { builders } from "./builders";

const file = path.join(__dirname, "./messages.test.json");

describe("Repository: FileSystemMessageRepository", () => {
  beforeEach(async () => {
    await fs.promises.writeFile(file, JSON.stringify([]));
  });

  test("Method: .save() can save a message in the file system~", async () => {
    const repository = await FileSystemMessageRepository.AsyncNew(file);
    const message = builders.message({});

    await repository.save(message);

    const messages = await fs.promises.readFile(file);

    expect(JSON.parse(messages.toString())).toEqual([{ ...message, date: message.date.toISOString() }]);
  });

  test("Method: .update() can save a message in the file system~", async () => {
    const message = builders.message({});

    await fs.promises.writeFile(file, JSON.stringify([message]));

    const repository = await FileSystemMessageRepository.AsyncNew(file);
    const updated = { ...message, message: "Updated#Test-MESSAGE" };

    await repository.update(updated);

    const messages = await fs.promises.readFile(file);

    expect(JSON.parse(messages.toString())).toEqual([{ ...updated, date: message.date.toISOString() }]);
  });

  test("Method: .get() can get a message from the file system~", async () => {
    const message = builders.message({});

    await fs.promises.writeFile(file, JSON.stringify([message]));

    const repository = await FileSystemMessageRepository.AsyncNew(file);
    const $message = await repository.get(message.id);

    expect($message).toEqual(message);
  });

  test("Getter: .messages can get all messages from the file system~", async () => {
    const messages = Array.from({ length: 5 }).map((_, index) => builders.message({ id: `Test-ID#${index + 1}` }));
    await fs.promises.writeFile(file, JSON.stringify(messages));

    const repository = await FileSystemMessageRepository.AsyncNew(file);

    expect(messages).toEqual(repository.messages);
  });
});
