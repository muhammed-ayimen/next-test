export function formatDuration(duration: {
  minutes?: number | null;
  seconds?: number | null;
}): string {
  const min = duration.minutes ?? 0;
  const sec = duration.seconds ?? 0;
  return `${min}:${String(sec).padStart(2, '0')}`;
}

export function getImageSrc(url: string): string {
  if (url.startsWith('//')) return `https:${url}`;
  return url;
}

export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
