import { UcViewTimelineFixture } from "./uc-view-timeline.fixture";

describe("Feature: Viewing a personal timeline", () => {
  let fixture: UcViewTimelineFixture;

  beforeEach(() => {
    fixture = new UcViewTimelineFixture();
  });

  describe("Rule: Messages are show in reverse chronological order", () => {
    test("Alice can view the 3 messages she has published in her timeline~", async () => {
      fixture.given.messages([
        {
          message: "I love the weather today~",
          author: "Alice",
          date: new Date("2024-02-25T15:30:00Z")
        },
        {
          message: "Alice should check the forecast~",
          author: "Bob",
          date: new Date("2024-02-25T16:00:00Z")
        },
        {
          message: "I think the weather is getting bad. I talked too fast~",
          author: "Alice",
          date: new Date("2024-02-25T17:00:00Z")
        },
        {
          message: "Bob was right~",
          author: "Alice",
          date: new Date("2024-02-25T17:04:30Z")
        }
      ]);
      fixture.given.date(new Date("2024-02-25T17:05:00Z"));
      await fixture.when.view("Alice");
      fixture.then.timeline.equals([
        {
          message: "Bob was right~",
          author: "Alice",
          elapsed: "Less than a minute ago"
        },
        {
          message: "I think the weather is getting bad. I talked too fast~",
          author: "Alice",
          elapsed: "5 minute(s) ago"
        },
        {
          message: "I love the weather today~",
          author: "Alice",
          elapsed: "1 hour(s) ago"
        },
    ]);
    });
  });
});