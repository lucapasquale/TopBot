import { CommandCtx } from '../../../types';
import Player from '../../../models/player';
import { Args } from './schema';

export default async function(args: Args, ctx: CommandCtx) {
  const game = await ctx.db.Game.findOne({ code: args.game });
  if (!game) {
    return ctx.message.channel.send('invalid game!');
  }

  if (!ctx.message.member.voiceChannel) {
    return ctx.message.reply('please enter in a voice chat first!');
  }

  const gamePlayers = await ctx.db.Player.find({ game });

  const available = getAvailablePlayers(ctx, gamePlayers);
  if (available.length === 0) {
    return ctx.message.reply('no one is available to play!');
  }

  const mentions = available.map(p => `<@${p.userId}>`);
  return ctx.message.channel.send(
    `People are needed for ${game.name}!\n${mentions.join(' ')}`
  );
}

function getAvailablePlayers(ctx: CommandCtx, players: Player[]) {
  const allMembers = ctx.message.guild.members.array();
  const voiceMembers = ctx.message.member.voiceChannel.members.array();

  return players.filter(player => {
    const member = allMembers.find(m => m.id === player.userId);

    const isOnline = ['online', 'idle'].includes(member.user.presence.status);
    const inVoiceChat = voiceMembers.some(vm => vm.id === player.userId);

    return isOnline && !inVoiceChat;
  });
}
