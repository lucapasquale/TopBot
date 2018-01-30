import * as Discord from 'discord.js';
import db from '../../common/db';


export default async function (cmds: string[], message: Discord.Message) {
  const idsNotInChat = getPlayersNotInChat(message);
  if (idsNotInChat.length === 0) {
    return message.channel.send('no one available');
  }

  const mentions = idsNotInChat.map((id: string) => (`<@${id}>`));
  return message.channel.send(`Precisa-se pro LoL\n${mentions.join(' ')}`);
}


function getPlayersNotInChat(message: Discord.Message) {
  const allPlayers = db.get('lolPlayerIds').value();

  const voiceMembers = message.member.voiceChannel.members;
  const voiceIds = voiceMembers.map((vm: Discord.GuildMember) => vm.id);

  return allPlayers.reduce((all: string[], player: string) => {
    if (!voiceIds.includes(player)) {
      all.push(player);
    }
    return all;
  }, []);
}
