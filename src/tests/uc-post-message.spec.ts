import { MessageLengthError, MessageEmptyError } from "../errors";
import { UCMessageFixture } from "./uc-message.fixture";
import { builders } from "./builders";

describe("Feature: Posting a message", () => {
  let fixture: UCMessageFixture;

  beforeEach(() => {
    fixture = new UCMessageFixture();
  });

  describe("Rule: A message can contain a maximum of 280 characters", () => {

    test("Alice can post a message~", async () => {
      fixture.given.date(new Date("2024-02-15T10:00:00Z"));
      await fixture.when.post(builders.message({
        message: "I love the weather today~",
        author: "Alice"
      }));
      fixture.then.message.equals(builders.message({
        message: "I love the weather today~",
        author: "Alice",
        date: new Date("2024-02-15T10:00:00Z")
      }));
    });

    test("Alice can not post a message~", async () => {
      fixture.given.date(new Date("2024-02-15T10:00:00Z"));
      await fixture.when.post(builders.message({ message: "X".repeat(281), author: "Alice" }));
      fixture.then.error.is(MessageLengthError);
    });

  });
  describe("Rule: A message can not be empty", () => {

    test("Alice can not post message~", async () => {
      fixture.given.date(new Date("2024-02-15T10:00:00Z"));
      await fixture.when.post(builders.message({ message: String(), author: "Alice" }));
      fixture.then.error.is(MessageEmptyError);
    });

    test("Alice can not post message with blank spaces~", async () => {
      fixture.given.date(new Date("2024-02-15T10:00:00Z"));
      await fixture.when.post(builders.message({ message: "     ", author: "Alice" }));
      fixture.then.error.is(MessageEmptyError);
    });

  });
});
