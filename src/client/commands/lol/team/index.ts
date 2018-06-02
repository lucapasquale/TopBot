import { Command } from '../../../../types';
import handler from './handler';

const cmd: Command = {
  handler,
  tag: ['lol', 'team'],
  doc: {
    args: ['(required_players)'],
    description: 'Notifies everyone from the list of LoL players that are not in'
      + ' your voice channel. You can also pass the number of *required_players*',
  },
};

export default cmd;
