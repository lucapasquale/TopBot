import * as Discord from 'discord.js';
import axios from 'axios';

import { Db } from '../../types';


export default async function (channel: Discord.TextChannel, db: Db) {
  try {
    const { data } = await redditApi.get('r/MemeEconomy/top.json', {
      params: {
        t: 'day',
        limit: 10,
      },
    });

    const topPosts = data.data.children;
    const randomPost = topPosts[Math.floor(Math.random() * 10)];

    const { content, embed } = generateMessage(randomPost);
    await channel.send(content, { embed });
  }
  catch (e) { }
}


const redditApi = axios.create({ baseURL: 'https://www.reddit.com' });

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
