import NBA from 'nba';

export const findPlayerByName = (name: string) => {
  return NBA.findPlayer(name);
};

export const getPlayerInfo = async (playerId: number) => {
  return await NBA.stats.playerInfo({ PlayerID: playerId });
};

export const getBoxScore = async (gameId: string) => {
  return await NBA.stats.boxScore({ GameID: gameId });
};

export const getTeam = (teamId: number) => {
  return NBA.teams.find((t: { teamId: number }) => t.teamId === teamId);
};

export const getSchedule = async (year: string) => {
  return await NBA.data.schedule(year);
};
