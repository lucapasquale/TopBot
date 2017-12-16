import * as Discord from 'discord.js';
import axios from 'axios';


const LIMIT = 10;

const redditApi = axios.create({
  baseURL: 'https://www.reddit.com',
});

export default async function (cmds: string[], message: Discord.Message) {
  const { data } = await redditApi.get('r/MemeEconomy/top.json', {
    params: {
      t: 'day',
      limit: LIMIT,
    },
  });

  const topPosts = data.data.children;
  const randomPost = topPosts[Math.floor(Math.random() * LIMIT)];

  console.log(randomPost);
  await message.channel.send('Investment opportunity of the day', {
    embed: generateEmbed(randomPost),
  });
}


function generateEmbed(post: any) {
  const { title, preview, author, permalink } = post.data;
  const url = `https://www.reddit.com${permalink}`;

  return {
    title,
    url,
    description: `**By user:** /u/${author}`,
    image: {
      url: preview.images[0].source.url,
    },
  };
}
