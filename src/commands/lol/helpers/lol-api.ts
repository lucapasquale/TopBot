import axios, { AxiosInstance } from 'axios';
import config from '../../../config';


const lolApi = axios.create({
  baseURL: 'https://br1.api.riotgames.com/lol/',
  headers: {
    'X-Riot-Token': config.LOL_KEY,
  },
});


export async function summoner(summonerName: string) {
  const { data } = await lolApi.get(`summoner/v3/summoners/by-name/${summonerName}`);
  return data;
}

export async function positions(summonerId: number) {
  const { data } = await lolApi.get(`league/v3/positions/by-summoner/${summonerId}`);
  return data;
}

export async function activeGame(summonerId: number) {
  const { data } = await lolApi.get(`spectator/v3/active-games/by-summoner/${summonerId}`);
  return data;
}

export async function versions() {
  const { data } = await lolApi.get('static-data/v3/versions');
  return data;
}
