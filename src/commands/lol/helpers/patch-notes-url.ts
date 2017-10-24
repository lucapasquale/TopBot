/* tslint:disable:max-line-length */

export default function getPatchUrl(regionName: string, major: number, minor: number) {
  const versionValue = `${major}${minor}`;

  switch (regionName) {
    case 'NA':
    case 'EUW':
    case 'EUNE':
    case 'OCE':
      return `http://${regionName}.leagueoflegends.com/en/news/game-updates/patch/patch-${versionValue}-notes`;

    case 'LAN':
    case 'LAS':
      return `http://${regionName}.leagueoflegends.com/es/news/game-updates/patch/notas-de-la-version-${versionValue}`;

    case 'BR':
      return `http://${regionName}.leagueoflegends.com/pt/news/game-updates/patch/notas-da-atualizacao-${versionValue}`;

    case 'JP':
      return `http://${regionName}.leagueoflegends.com/ja/news/game-updates/patch/patch-${versionValue}0-notes`;

    case 'RU':
      return `http://${regionName}.leagueoflegends.com/ru/news/game-updates/patch/izmeneniya-obnovleniya-${versionValue}`;

    case 'TR':
      return `http://${regionName}tr.leagueoflegends.com/tr/news/game-updates/patch/${versionValue}-yama-notlari`;

    default:
      return `http://na.leagueoflegends.com/en/news/game-updates/patch/patch-${versionValue}-notes`;
  }
}
