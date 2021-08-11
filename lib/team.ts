import { getTeam } from '../lib/nba';

export const teamLogoUrl = (teamId: number) => {
  const team = getTeam(teamId);
  if (team == null) return null;
  return `http://stats.nba.com/media/img/teams/logos/${team.abbreviation}_logo.svg`;
};
