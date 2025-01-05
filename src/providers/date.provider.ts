export interface DateProvider {
  _now: Date;

  get now(): Date;

  set now(date: Date);
}