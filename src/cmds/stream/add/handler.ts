import { Context } from '../../../types';


const availableServices = ['twitch', 'mixer'];

export default async function (args: string[], ctx: Context) {
  const [token, service] = args;

  if (!token && !service) {
    await ctx.message.channel.send('Please inform a user and stream service!');
    return;
  }

  await ctx.db.Streams.findCreateFind({
    where: {
      token,
      service: service || 'twitch',
    },
    defaults: { online: false },
  });

  await ctx.message.channel.send(`Stream **${token}** added to list of streamers!`);
}
