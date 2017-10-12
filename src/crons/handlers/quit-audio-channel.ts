import db from '../../common/db';
import { audioConnection, disconnectAudioChannel } from '../../commands/youtube/helpers/play-next';

export default async function () {
  const musicStoppedTime: Date = db.get('server.musicStoppedTime').value();
  if (!musicStoppedTime || !audioConnection) {
    return;
  }

  const now = new Date();
  const diff = now.getTime() - musicStoppedTime.getTime();

  if (diff > 60 * 1000) {
    disconnectAudioChannel();
    db.set('server.musicStoppedTime', null).write();
  }
}
