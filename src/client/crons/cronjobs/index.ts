import memeOfTheDay from './meme-of-the-day';
import mixerOnline from './mixer-online';
import twitchOnline from './twitch-online';

import { Cronjob } from '../../../types';

export default [
  { handler: memeOfTheDay, interval: 'at 22:00' },
  { handler: mixerOnline, interval: 'every 30 seconds' },
  { handler: twitchOnline, interval: 'every 1 minute' },
] as Cronjob[];
