import * as bluebird from 'bluebird'
import axios from 'axios'

import { CronCtx } from '../types'
import config from '../config'

const twitchRequest = axios.create({
  baseURL: 'https://api.twitch.tv/helix',
  headers: { 'Client-ID': config.TWITCH_KEY },
})

export default async function handler(ctx: CronCtx) {
  const twitchStreams = await ctx.db.Stream.find({ service: 'twitch' })

  await bluebird.each(twitchStreams, async stream => {
    const { online, data } = await getStreamData(stream.name)

    if (stream.online !== online) {
      if (online) {
        const { content, embed } = await createMessage(stream.name, data)
        await ctx.channel.send(content, { embed })
      }

      await ctx.db.Stream.update(stream.id, { online })
    }
  })
}

async function getStreamData(name: string) {
  const { data } = await twitchRequest.get(`streams?user_login=${name}`)
  const streamData = data.data[0]

  return { data: streamData, online: !!streamData }
}

async function createMessage(name: string, streamData: any) {
  const { user_id, title, viewer_count } = streamData

  const { display_name, profile_image_url } = await getUserData(user_id)
  const url = `https://go.twitch.tv/${name}`

  return {
    content: `**${display_name}** is streaming!\n${url}`,
    embed: {
      url,
      title: display_name,
      description: `${title}\n**Viewers:** ${viewer_count}`,
      color: 0x6441a4,
      thumbnail: { url: profile_image_url },
    },
  }
}

async function getUserData(userId: number) {
  const { data } = await twitchRequest.get(`users?id=${userId}`)
  return data.data[0]
}
