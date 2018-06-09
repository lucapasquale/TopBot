import { CommandCtx } from '../../../../types';

const services = ['twitch', 'mixer'];

export default async function (args: string[], ctx: CommandCtx) {
  const [token, service = 'twitch'] = args;

  if (!token) {
    return ctx.message.reply('please inform the stream name!');
  }

  if (!services.includes(service)) {
    return ctx.message.reply(`that is not a valid streaming site. Available: ${services.join()}`);
  }

  await ctx.db.Stream.findOrCreate({ token, service });

  return ctx.message.channel.send(`Stream **${token}** added to the list of streamers!`);
}
