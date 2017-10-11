import db from '../../common/db';
import { audioConnection } from '../../commands/youtube/helpers/play-next';

export default async function () {
  const lastSongTime: Date = db.get('server.lastSongTime').value();
  if (!lastSongTime || !audioConnection) {
    return;
  }

  const now = new Date();
  const diff = now.getTime() - lastSongTime.getTime();

  if (diff > 60 * 1000) {
    audioConnection.disconnect();
    db.set('server.lastSongTime', null).write();
  }
}
