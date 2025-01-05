import { UCMessageFixture } from "./uc-message.fixture";
import { builders } from "./builders";

describe("Feature: Editing a message", () => {
  let fixture: UCMessageFixture;

  beforeEach(() => {
    fixture = new UCMessageFixture();
  });

  describe("Rule: A message can contain a maximum of 280 characters", () => {
    test("Alice can edit a message~", async () => {
      await fixture.given.message(builders.message({
        id: "InMemory#Test",
        message: "I love the weather today~",
        author: "Alice"
      }));
      await fixture.when.edit({
        id: "InMemory#Test",
        message: "I do not love the weather today~",
      });
      fixture.then.message.equals(builders.message({
        id: "InMemory#Test",
        message: "I do not love the weather today~",
        author: "Alice"
      }));
    });
  });
});