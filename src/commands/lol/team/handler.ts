import { CommandCtx } from '../../../../types';
import { LolPlayer } from '../../../../database/entity/lol-player';

export default async function(args: string[], ctx: CommandCtx) {
  const [playersNeeded] = args;

  if (!ctx.message.member.voiceChannel) {
    return ctx.message.reply('please enter in a voice chat first!');
  }

  const players = await ctx.db.LolPlayer.find();
  const availablePlayers = await getAvailablePlayers(ctx, players);

  if (availablePlayers.length === 0) {
    return ctx.message.reply('no one is available to play!');
  }

  const prefix = playersNeeded ? `${playersNeeded} people` : 'People';
  const mentions = availablePlayers.map(p => `<@${p.userId}>`);

  return ctx.message.channel.send(
    `${prefix} are needed for LoL!\n${mentions.join(' ')}`
  );
}

async function getAvailablePlayers(ctx: CommandCtx, players: LolPlayer[]) {
  const allMembers = ctx.message.guild.members.array();
  const voiceMembers = ctx.message.member.voiceChannel.members.array();

  return players.filter(player => {
    const member = allMembers.find(member => member.id === player.userId);
    const isOnline = ['online', 'idle'].includes(member.user.presence.status);

    const inVoiceChat = voiceMembers.some(vm => vm.id === player.userId);

    return isOnline && !inVoiceChat;
  });
}
