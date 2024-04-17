import { UCViewTimelineFixture } from "./uc-view-timeline.fixture";
import { getElapsed } from "../helpers/datetime.helper";

describe("Feature: Viewing a personal timeline", () => {
  let fixture: UCViewTimelineFixture;

  beforeEach(() => {
    fixture = new UCViewTimelineFixture();
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
        }
      ]);
    });
  });

  describe("(Helper) Rule: The elapsed time is calculated from the date of a message", () => {
    test(`The elapsed time should be "Less than a minute ago" when the publication time is less than a minute ago`, async () => {
      const now = new Date("2024-04-15T09:40:00Z");
      const date = new Date("2024-04-15T09:39:45Z");
      const text = getElapsed(date, now);
      expect(text).toBe("Less than a minute ago");
    });
    test(`The elapsed time should be "1 minute(s) ago" when the publication time is 1 minute ago`, async () => {
      const now = new Date("2024-04-15T09:40:00Z");
      const date = new Date("2024-04-15T09:39:00Z");
      const text = getElapsed(date, now);
      expect(text).toBe("1 minute(s) ago");
    });
    test(`The elapsed time should be "1 minute(s) ago" when the publication time is  less than 2 minutes ago`, async () => {
      const now = new Date("2024-04-15T09:40:00Z");
      const date = new Date("2024-04-15T09:38:30Z");
      const text = getElapsed(date, now);
      expect(text).toBe("1 minute(s) ago");
    });
    test(`The elapsed time should be "5 minute(s) ago" when the publication time is  more than 5 minutes ago but less than 6 minutes ago`, async () => {
      const now = new Date("2024-04-15T09:40:00Z");
      const date = new Date("2024-04-15T09:34:15Z");
      const text =getElapsed(date, now);
      expect(text).toBe("5 minute(s) ago");
    });
    test(`The elapsed time should be "1 hour(s) ago" when the publication time is 1 hour ago`, async () => {
      const now = new Date("2024-04-15T09:40:00Z");
      const date = new Date("2024-04-15T08:40:00Z");
      const text = getElapsed(date, now);
      expect(text).toBe("1 hour(s) ago");
    });
  });
});