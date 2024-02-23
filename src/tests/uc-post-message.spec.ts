import { MessageLengthError, MessageEmptyError } from "../usecases/post-message.usecase";
import { UCPostMessageFixture } from "./uc-post-message.fixture";

describe("Feature: Posting a message", () => {
  let fixture: UCPostMessageFixture;

  beforeEach(() => {
    fixture = new UCPostMessageFixture();
  });

  describe("Rule: A message can contain a maximum of 280 characters", () => {

    test("Alice can post a message~", () => {
      fixture.given.date(new Date("2024-02-15T10:00:00Z"));
      fixture.when.post({ message: "I love the weather today~", author: "Alice" });
      fixture.then.message.equals({
        message: "I love the weather today~",
        author: "Alice",
        date: new Date("2024-02-15T10:00:00Z")
      });
    });

    test("Alice can not post a message~", () => {
      fixture.given.date(new Date("2024-02-15T10:00:00Z"));
      fixture.when.post({ message: "X".repeat(281), author: "Alice" });
      fixture.then.error.is(MessageLengthError);
    });

  });
  describe("Rule: A message can not be empty", () => {

    test("Alice can not post message~", () => {
      fixture.given.date(new Date("2024-02-15T10:00:00Z"));
      fixture.when.post({ message: String(), author: "Alice" });
      fixture.then.error.is(MessageEmptyError);
    });

    test("Alice can not post message with blank spaces~", () => {
      fixture.given.date(new Date("2024-02-15T10:00:00Z"));
      fixture.when.post({ message: "     ", author: "Alice" });
      fixture.then.error.is(MessageEmptyError);
    });

  });
});
