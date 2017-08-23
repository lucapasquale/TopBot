import * as Discord from 'discord.js';
import * as moment from 'moment';


export default async function(cmds: string[], message: Discord.Message) {
  const scores = require(`${__dirname}/scores.json`);

  const highscore = getHighScore(scores);

  await message.channel.send({
    embed: {
      fields: [highscore],
    },
  });
}

function getHighScore(scores: any): Object {
  const userIds = Object.keys(scores);

  const timedScores = userIds.map((userId) => {
    const userScore = scores[userId];
  
    const current = moment().diff(moment(userScore.current), 'days');
    const longest = Math.max(current, userScore.highest);
  
    return {
      longest,
      name: userScore.name,
    };
  });

  const orderedScores = timedScores.sort((a, b) => { return b.longest - a.longest; });
  const scoreTexts = orderedScores.map((score) => {
    return `**${score.name}**: ${score.longest} days`;
  });

  return {
    name: 'Highscores',
    value: scoreTexts.join('\n'),
    inline: true,
  };
}
