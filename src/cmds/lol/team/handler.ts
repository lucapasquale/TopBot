import { Context } from '../../../types';


export default async function (args: string[], ctx: Context) {
  if (!ctx.message.member.voiceChannel) {
    await ctx.message.channel.send('Please enter in a voice chat first!');
    return;
  }

  const playersNotInChat = await getPlayersNotInChat(ctx);
  if (playersNotInChat.length === 0) {
    await ctx.message.channel.send('No one available to play');
    return;
  }

  const mentions = playersNotInChat.map(p => (`<@${p.id}>`));
  const playersNeeded = args[0] ? args[0].toString() : '';

  await ctx.message.channel.send(`Precisa-se ${playersNeeded} pro LoL\n${mentions.join(' ')}`);
}


async function getPlayersNotInChat(ctx: Context) {
  const allPlayers = await ctx.db.LolPlayer.findAll();

  const voiceMembers = ctx.message.member.voiceChannel.members;
  const voiceIds = voiceMembers.map(vm => vm.id);

  return allPlayers.reduce((all, player) => {
    if (!voiceIds.includes(player.id)) {
      all.push(player);
    }
    return all;
  }, []);
}
