import { Doc } from '../../../types';


const doc: Doc = {
  args: ['[stream_name]', '(twitch | mixer)'],

  description: 'Start receiving notifications when *stream_name* becomes' +
    ' online on *twitch* or *mixer*. Default is Twitch',
};

export default doc;
