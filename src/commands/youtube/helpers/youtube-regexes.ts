export function getVideoId(url: string) {
  const matches = url.match(/(?:\?v=|&v=|youtu\.be\/)(.*?)(?:\?|&|$)/);
  if (matches) {
    return matches[1];
  }

  return null;
}

export function getPlaylistId(url: string) {
  const matches = url.match(/^.*(youtu.be\/|list=)([^#\&\?]*).*/);
  if (matches) {
    return matches[2];
  }

  return null;
}
