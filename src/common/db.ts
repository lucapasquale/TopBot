const low = require('lowdb');
const fileSync = require('lowdb/adapters/FileSync');

const adapter = new fileSync(`${__dirname}/db.json`);
const db = low(adapter);


db.defaults({ streams: [], lolPlayerIds: [] }).write();
setStreamsDefault(db);
export default db;


export type Stream = {
  token: string,
  service: 'twitch' | 'mixer',
  online: boolean,
};

export type LolPlayer = {
  id: string,
  // username: string,
};

function setStreamsDefault(db: any) {
  const existingStreams = db.get('streams').value();

  const offlineStreams = existingStreams.map((st: Stream) => {
    return {
      ...st,
      online: false,
    };
  });

  db.set('streams', offlineStreams).write();
}
