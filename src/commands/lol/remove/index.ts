import { Command } from '../../../../types';
import handler from './handler';

const cmd: Command = {
  handler,
  tag: ['lol', 'remove'],
  doc: {
    args: [],
    description: 'Removes your user from the list of LoL players',
  },
};

export default cmd;
