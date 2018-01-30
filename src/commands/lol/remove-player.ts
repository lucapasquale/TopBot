import * as Discord from 'discord.js';
import db, { LolPlayer } from '../../common/db';


export default async function (cmds: string[], message: Discord.Message) {
  const { id, username } = message.author;

  db.get('lolPlayers').remove({ id }).write();

  return message.channel.send(`Player **${username}** removed from the list of LoL players!`);
}
