import * as Discord from 'discord.js';
import db, { LolPlayer } from '../../common/db';


export default async function (cmds: string[], message: Discord.Message) {
  const playersNotInChat = getPlayersNotInChat(message);
  if (playersNotInChat.length === 0) {
    return message.channel.send('No one available to play');
  }

  const mentions = playersNotInChat.map((p: LolPlayer) => (`<@${p.id}>`));
  return message.channel.send(`Precisa-se pro LoL\n${mentions.join(' ')}`);
}


function getPlayersNotInChat(message: Discord.Message) {
  const allPlayers = db.get('lolPlayers').value();

  const voiceMembers = message.member.voiceChannel.members;
  const voiceIds = voiceMembers.map((vm: Discord.GuildMember) => vm.id);

  return allPlayers.reduce((all: LolPlayer[], player: LolPlayer) => {
    if (!voiceIds.includes(player.id)) {
      all.push(player);
    }
    return all;
  }, []);
}
