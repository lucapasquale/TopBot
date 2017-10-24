import * as Discord from 'discord.js';
import * as bluebird from 'bluebird';
import axios from 'axios';

import { addToQueue, queue } from '../helpers/add-to-queue';
import { isPlaying, playNextVideo } from '../helpers/play-next';
import { getPlaylistId } from '../helpers/youtube-regexes';
import config from '../../../config';


const youtubeAPI = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    key: config.YOUTUBE_KEY,
  },
});

export default async function (playlistId: string, message: Discord.Message) {
  const { data } = await youtubeAPI.get('playlistItems', {
    params: {
      playlistId,
      maxResults: 15,
      part: 'contentDetails',
    },
  });

  const { data: playlistInfo } = await youtubeAPI.get('playlists', {
    params: {
      id: playlistId,
      part: 'snippet',
    },
  });

  data.items.forEach((playlistItem: any) => {
    queue.push({
      videoId: playlistItem.contentDetails.videoId,
      addedBy: message.author.username,
      title: playlistInfo.items[0].snippet.title,
    });
  });
}


