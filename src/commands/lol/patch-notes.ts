import * as Discord from 'discord.js';

import db from '../../common/db';
import patchNotesUrl from './helpers/patch-notes-url';


export default async function (cmds: string[], message: Discord.Message) {
  const { major, minor } = db.get('lol.version').value();
  const url = patchNotesUrl('NA', major, minor);

  message.channel.send(`**Patch Notes for ${major}.${minor}:**\n${url}`);
}
