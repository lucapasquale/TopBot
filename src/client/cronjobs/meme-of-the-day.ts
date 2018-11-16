import { CronCtx } from '../../types';
import axios from 'axios';

const redditApi = axios.create({ baseURL: 'https://www.reddit.com' });

export default async function(ctx: CronCtx) {
  const { data } = await redditApi.get('r/MemeEconomy/top.json', {
    params: { t: 'day', limit: 10 },
  });

  const topPosts = data.data.children;
  const randomPost = topPosts[Math.floor(Math.random() * 10)];

  const { content, embed } = generateMessage(randomPost);
  await ctx.channel.send(content, { embed });
}

function generateMessage(post: any) {
  const { title, preview, author, permalink } = post.data;
  const url = `https://www.reddit.com${permalink}`;

  return {
    content: 'Investment opportunity of the day',
    embed: {
      title,
      url,
      description: `**By user:** /u/${author}`,
      image: { url: preview.images[0].source.url },
    },
  };
}
