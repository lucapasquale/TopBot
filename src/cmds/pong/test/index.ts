import { Command } from '../../../common/types';
import handler from './handler';

const cmd: Command = {
  handler,
  tag: ['pong', 'test'],
};

export default cmd;
