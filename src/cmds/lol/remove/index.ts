import { Command } from '../../../types';
import handler from './handler';

const cmd: Command = {
  handler,
  tag: ['lol', 'remove'],
};

export default cmd;
