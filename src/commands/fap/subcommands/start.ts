import * as fs from 'fs';
import * as Discord from 'discord.js';
import * as moment from 'moment';


export default async function(cmds: string[], message: Discord.Message) {
  const scores = require(`${__dirname}/scores.json`);
  const { author } = message;
  
  const date = parseDate(cmds[2]);
  if (date === null) {
    return message.channel.send('Data inválida!');
  }

  scores[author.id] = {
    name: author.username,
    current: date,
    highest: scores[author.id] ? scores[author.id].highest : 0,
  };

  saveScores(scores);
  return message.channel.send(`${author.username} começou o no-fap em ${date.format('DD/MM/YY')}`);
}


function parseDate(date: string): moment.Moment {
  if (date === '' || date === undefined) {
    return moment();
  }

  const separateDate = date.split('/');
  if (separateDate.length !== 2) {
    return null;
  }

  const month = Number(separateDate[1]);
  const day = Number(separateDate[0]);

  if (!month || !day) {
    return null;
  }

  const parsedDate = moment([2017, month - 1, day]);

  return parsedDate.isValid() ? parsedDate : null;
}


function saveScores(scores: Object) {
  fs.writeFileSync(`${__dirname}/scores.json`, JSON.stringify(scores, null, '\t'));
}
