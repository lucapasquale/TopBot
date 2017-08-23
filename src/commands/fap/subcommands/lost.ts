import * as fs from 'fs';
import * as Discord from 'discord.js';
import * as moment from 'moment';


export default async function(cmds: string[], message: Discord.Message) {
  const scores = require(`${__dirname}/scores.json`);
  const { author } = message;

  let userScore = scores[author.id];

  const currentDays = moment().diff(moment(userScore.current), 'days');
  const isNewHighscore = currentDays > userScore.highest;

  userScore = {
    name: author.username,
    current: moment(),
    highest: Math.max(currentDays, userScore.highest),
  };

  saveScores(scores);
  

  const content = isNewHighscore ?
    `Parabéns ${author.username}, seu novo recorde é de ${userScore.highest} dias` :
    `${author.username} você durou ${currentDays} dias. Seu recorde é de ${userScore.highest} dias`;

  await message.channel.send(content);
}

function saveScores(scores: Object) {
  fs.writeFileSync(`${__dirname}/scores.json`, JSON.stringify(scores, null, '\t'));
}
