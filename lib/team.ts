import { getTeam } from '../lib/nba';

export const getTeamLogo = (teamId: number) => {
  console.log(teamId);
  const team = getTeam(teamId);
  return `http://stats.nba.com/media/img/teams/logos/${team?.abbreviation}_logo.svg`;
};
