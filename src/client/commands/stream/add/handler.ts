import { Context } from '../../../../types';

const services = ['twitch', 'mixer'];

export default async function (args: string[], ctx: Context) {
  const [token, service] = args;

  if (!token) {
    return ctx.message.reply('please inform the stream name!');
  }

  if (service && !services.includes(service)) {
    return ctx.message.reply(`that is not a valid streaming site. Available: ${services.join()}`);
  }

  await upsertStream(ctx, { token, service });

  return ctx.message.channel.send(`Stream **${token}** added to the list of streamers!`);
}

async function upsertStream(ctx: Context, { token, service }: any) {
  const existing = await ctx.db.Stream.find({
    where: { token, service },
  });

  if (existing) {
    return;
  }

  await ctx.db.Stream.save({
    token, service,
  });
}
