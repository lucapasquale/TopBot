
export default function (positions: Position[], gameQueueConfigId: number) {
  const gameQueueType = queueType(gameQueueConfigId);

  const queuePosition = positions.filter(p => p.queueType === gameQueueType)[0];
  if (!queuePosition) {
    return {
      tier: 'Unranked',
      rank: '',
      queueType: gameQueueType,
      leaguePoints: 0,
    };
  }

  const tier = capitalizeFirstLetter(queuePosition.tier.toLowerCase());
  const rank = transformRank(queuePosition.rank);
  return {
    tier,
    rank,
    queueType: queuePosition.queueType,
    leaguePoints: queuePosition.leaguePoints,
    wins: queuePosition.wins,
    losses: queuePosition.losses,
  };
}

function queueType(gameQueueConfigId: number) {
  switch (gameQueueConfigId) {
    case 420: return 'RANKED_SOLO_5x5';
    case 440: return 'RANKED_FLEX_SR';
    default: return '';
  }
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function transformRank(rank: Position['rank']) {
  switch (rank) {
    case 'I':   return 1;
    case 'II':  return 2;
    case 'III': return 3;
    case 'IV':  return 4;
    case 'V':   return 5;
  }
}

export type Position = {
  leagueName: string,
  tier: string,
  rank: 'I' | 'II' | 'III' | 'IV' | 'V',
  queueType: 'RANKED_SOLO_5x5' | 'RANKED_FLEX_SR',
  playerOrTeamId: number,
  playerOrTeamName: string,
  leaguePoints: number,
  wins: number,
  losses: number,

  veteran: boolean,
  inactive: boolean,
  freshBlood: boolean,
  hotStreak: boolean,

  miniSeries: {
    target: number,
    wins: number,
    losses: number,
    progress: string,
  },
};
