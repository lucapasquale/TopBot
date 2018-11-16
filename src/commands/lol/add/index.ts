import { Command } from '../../../../types';
import handler from './handler';

const cmd: Command = {
  handler,
  tag: ['lol', 'add'],
  doc: {
    args: [],
    description: 'Adds your user to be notified when someone is needed to play LoL',
  },
};

export default cmd;
