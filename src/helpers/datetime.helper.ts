function getElapsed(from: Date, to: Date) {
  const elapsed = to.getTime() - from.getTime();
  const seconds = Math.floor(elapsed / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  return days ? `${days} day(s) ago` : hours ? `${hours} hour(s) ago` : minutes ? `${minutes} minute(s) ago` : `Less than a minute ago`;
}

export { getElapsed };