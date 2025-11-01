import type { DateProvider } from "./date.provider";

export class StubDateProvider implements DateProvider {
  _now: Date = new Date();

  set now($now: Date) {
    this._now = $now;
  }

  get now() {
    return this._now;
  }
}
