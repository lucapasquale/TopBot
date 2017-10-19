import db from '../../common/db';
import { getVersions, getChampions } from '../../commands/lol/helpers/lol-api';


export default async function () {
  const versions = await getVersions();
  const [major, minor, patch] = versions[0].split('.');
  db.set('lol.version', { major, minor, patch }).write();

  const champions = await getChampions();
  db.set('lol.champions', champions).write();
}
