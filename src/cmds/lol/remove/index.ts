import { Command } from '../../../types';
import doc from './doc';
import handler from './handler';

const cmd: Command = {
  doc,
  handler,
  tag: ['lol', 'remove'],
};

export default cmd;
