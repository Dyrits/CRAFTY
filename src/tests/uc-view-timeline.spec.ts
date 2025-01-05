import { UcViewTimelineFixture } from "./uc-view-timeline.fixture";
import { builders } from "./builders";

describe("Feature: Viewing a personal timeline", () => {
  let fixture: UcViewTimelineFixture;

  beforeEach(() => {
    fixture = new UcViewTimelineFixture();
  });

  describe("Rule: Messages are show in reverse chronological order", () => {
    test("Alice can view the 2 messages she has published in her timeline~", async () => {
      fixture.given.messages([
        builders.message({
          message: "I love the weather today~",
          author: "Alice",
          date: new Date("2024-02-25T15:30:00Z")
        }),
        builders.message({
          message: "Alice should check the forecast~",
          author: "Bob",
          date: new Date("2024-02-25T16:00:00Z")
        }),
        builders.message({
          message: "I think the weather is getting bad. I talked too fast~",
          author: "Alice",
          date: new Date("2024-02-25T17:00:00Z")
        })
      ]);
      fixture.given.date(new Date("2024-02-25T17:05:00Z"));
      await fixture.when.view("Alice");
      fixture.then.timeline.equals([
        builders.timeline({
          message: "I think the weather is getting bad. I talked too fast~",
          author: "Alice",
          elapsed: "5 minute(s) ago"
        }),
        builders.timeline({
          message: "I love the weather today~",
          author: "Alice",
          elapsed: "1 hour(s) ago"
        })
    ]);
    });
  });
});