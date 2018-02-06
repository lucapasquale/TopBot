import { Context } from '../../../types';
import { LolPlayer } from '../../../models/LolPlayer';


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

  const mentions = playersNotInChat.map(p => (`<@${p.userId}>`));
  const playersNeeded = args[0] ? `${args[0]} people` : 'People';

  await ctx.message.channel.send(`${playersNeeded} are needed for LoL\n${mentions.join(' ')}`);
}


async function getPlayersNotInChat(ctx: Context) {
  const allPlayers = await ctx.db.LolPlayer.findAll();

  const voiceMembers = ctx.message.member.voiceChannel.members;
  const voiceIds = voiceMembers.map(vm => vm.id);

  return allPlayers.reduce((all: LolPlayer[], player) => {
    if (!voiceIds.includes(player.userId)) {
      all.push(player);
    }
    return all;
  }, []);
}
