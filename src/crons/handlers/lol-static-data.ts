import axios, { AxiosInstance } from 'axios';
import config from '../../config';

import db from '../../common/db';


const lolApi = axios.create({
  baseURL: 'https://br1.api.riotgames.com/lol/',
  headers: {
    'X-Riot-Token': config.LOL_KEY,
  },
});

export default async function () {
  const { data } = await lolApi.get('static-data/v3/champions?locale=en_US&dataById=true');
  db.set('lol.champions', data.data).write();
}
