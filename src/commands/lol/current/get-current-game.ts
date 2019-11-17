import axios from 'axios'
import config from '../../../config'

const lolRequest = axios.create({
  baseURL: config.LOL_URL,
  headers: {
    'X-Riot-Token': config.LOL_KEY,
  },
})

export interface CurrentGame {
  queue: string
  teams: Team[]
}
interface Team {
  teamId: number
  participants: Participants[]
}
export interface Participants {
  champion: { name: string }
  summoner: {
    name: string
    leagues: {
      solo: League
      flex: League
    }
  }
}
interface League {
  rank: string
  tier: string
}

export default async function(username: string): Promise<CurrentGame> {
  const { data } = await lolRequest.post('/graphql', {
    query: `{
      summoner(name: "${username}") {
        id
        currentGame {
          queue
          teams {
            teamId
            participants {
              summoner {
                name
                leagues {
                  solo {
                    rank
                    tier
                  }
                  flex {
                    rank
                    tier
                  }
                }
              }
              champion {
                name
              }
            }
          }
        }
      }
    }
    `,
  })

  return data.data.summoner.currentGame
}
