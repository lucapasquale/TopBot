//  /* tslint:disable:max-line-length */
// import * as Discord from 'discord.js';
// import getVersion from './helpers/get-version';


// export default async function (cmds: string[], message: Discord.Message) {
//   const { major, minor } = await getVersion();

//   const embed = generateEmbed(major, minor);
//   return message.channel.send({ embed });
// }


// function generateEmbed(major: string, minor: string) {
//   const baseUrl = 'http://br.leagueoflegends.com/pt/news/game-updates/patch/notas-da-atualizacao-';

//   return {
//     title: '__**League of Legends Patch Notes**__',
//     description: `Current Version: ${major}.${minor}`,
//     url: `http://br.leagueoflegends.com/pt/news/game-updates/patch/notas-da-atualizacao-${major}${minor}`,
//     color: 16777215,
//     thumbnail: {
//       url: 'http://2.bp.blogspot.com/-HqSOKIIV59A/U8WP4WFW28I/AAAAAAAAT5U/qTSiV9UgvUY/s1600/icon.png',
//     },
//   };
// }
