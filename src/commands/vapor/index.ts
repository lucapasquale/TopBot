import * as Discord from 'discord.js';


export default async function (cmds: string[], message: Discord.Message) {
  const { author } = message;
  const vaporContent = cmds.map(stringToFullWidth).join(' ');

  return message.channel.send({
    embed: {
      author: {
        name: author.username,
        icon_url: author.avatarURL,
      },

      title: `\`${vaporContent}\``,
    },
  });
}


const charToFullWidth = (char: string) => {
  const c = char.charCodeAt(0);
  return c >= 33 && c <= 126
    ? String.fromCharCode((c - 33) + 65281)
    : char;
};

const stringToFullWidth = (string: string) => string.split('').map(charToFullWidth).join('');
