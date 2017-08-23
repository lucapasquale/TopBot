import * as Discord from 'discord.js';


export default async function(cmds: string[], message: Discord.Message): Promise<void> {
  const { author } = message;

  const words = cmds.slice(1);
  const newPhrase = words.map(oLeTransform).join(' ');

  await message.channel.send({
    embed: {
      author: {
        name: author.username,
        icon_url: author.avatarURL,
      },

      title: newPhrase,
    },
  });
}

function oLeTransform(word: string): string {
  const length = word.length;

  if (length <= 2) {
    return word;
  }

  let lastSyllableStart = length === 3 ? 1 : length - 3;
  if (!isVowel(word.charAt(lastSyllableStart))) {
    lastSyllableStart -= 1;
  }

  const lastSyllable = word.substring(lastSyllableStart + 1);
  const restOfTheWord = word.substring(0, lastSyllableStart + 1);

  return `${lastSyllable}${restOfTheWord}`;
}

function isVowel(letter: string): boolean {
  const vowels = [
    'a', 'e', 'i', 'o', 'u',
    'á', 'à', 'ã',
    'é',
    'í',
    'ó', 'õ',
    'ú',
  ];

  const lowCaseLetter = letter.toLowerCase();
  return vowels.indexOf(lowCaseLetter) !== -1;
}
