import * as Discord from 'discord.js';
import * as redditApi from './reddit-api';


export default async function (cmds: string[], message: Discord.Message) {
  const comments = await redditApi.getBestComments('memeEconomy', '7jzdnj');
  console.log(comments);
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
