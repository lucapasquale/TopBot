import * as Discord from 'discord.js';
import db, { LolPlayer } from '../../common/db';


export default async function (cmds: string[], message: Discord.Message) {
  const { id, username } = message.author;

  const existingStream = db.get('lolPlayers').find({ id }).value();
  if (!existingStream) {
    db.get('lolPlayers').push({ id, username }).write();
  }

  return message.channel.send(`Player **${username}** added to the list of LoL players!`);
}
