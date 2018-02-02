import { Command } from '../../../types';
import handler from './handler';

const cmd: Command = {
  handler,
  tag: ['lol1', 'add'],
};

export default cmd;
