import axios, { AxiosInstance } from 'axios';
import config from '../../../config';


const lolApi = axios.create({
  baseURL: 'https://br1.api.riotgames.com/lol/',
  headers: {
    'X-Riot-Token': config.LOL_KEY,
  },
});


export async function getSummoner(summonerName: string) {
  const { data } = await lolApi.get(`summoner/v3/summoners/by-name/${summonerName}`);
  return data;
}

export async function getPositions(summonerId: number) {
  const { data } = await lolApi.get(`league/v3/positions/by-summoner/${summonerId}`);
  return data;
}

export async function getActiveGame(summonerId: number) {
  try {
    const { data } = await lolApi.get(`spectator/v3/active-games/by-summoner/${summonerId}`);
    return data;
  } catch (err) {
    // Player not in game
    if (err.response && err.response.status === 404) {
      return null;
    }

    throw err;
  }
}

export async function getVersions() {
  const { data } = await lolApi.get('static-data/v3/versions');
  return data;
}

export async function getChampions() {
  const { data } = await lolApi.get('static-data/v3/champions?locale=en_US&dataById=true');
  return data.data;
}
