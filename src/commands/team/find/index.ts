import { Command } from '../../../types';
import handler from './handler';
import schema from './schema';

const cmd: Command = {
  tag: ['team', 'find'],
  handler,
  validation: {
    schema,
    args: ['game'],
  },
  doc: {
    args: ['[game]'],
    description: '',
  },
};

export default cmd;
