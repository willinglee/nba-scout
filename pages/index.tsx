import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { getSchedule, getBoxScore } from '../lib/nba';
import { getTeamLogo } from '../lib/team';
import {
  AK_PLAYERS,
  EC_PLAYERS,
  WL_PLAYERS,
} from './constants/selected-players';

interface Player {
  [key: string]: string;
}

interface Game {
  startTimeUTC: Date;
}

type Games = Array<Game>;

interface HomeProps {
  games: Games;
}

export default function Home({ games }: HomeProps) {
  games.forEach((item) => {
    const homePlayers = Array.isArray(
      item?.sports_content?.game?.home?.players?.player
    )
      ? item?.sports_content?.game?.home?.players?.player
      : [];
    const visitorPlayers = Array.isArray(
      item?.sports_content?.game?.visitor?.players?.player
    )
      ? item?.sports_content?.game?.visitor?.players?.player
      : [];

    const homePlayer = homePlayers.filter(
      (player) => !!elliotPlayers[player.person_id]
    );
    const visitorPlayer = visitorPlayers.filter(
      (player) => !!elliotPlayers[player.person_id]
    );

    if (homePlayer.length > 0) {
      homePlayer.forEach((player) => {
        const currentStats = elliotPlayers[player.person_id];
        elliotPlayers[player.person_id] = {
          teamKey: item?.sports_content?.game?.home?.team_key,
          teamCity: item?.sports_content?.game?.home?.city,
          teamId: item?.sports_content?.game?.home?.id,
          teamNickname: item?.sports_content?.game?.home?.nickname,
          points: currentStats.points + parseInt(player.points),
          threePointersMade:
            currentStats.threePointersMade +
            parseInt(player.three_pointers_made),
          rebounds:
            currentStats.rebounds +
            parseInt(player.rebounds_defensive) +
            parseInt(player.rebounds_offensive),
          assists: currentStats.assists + parseInt(player.assists),
          steals: currentStats.steals + parseInt(player.steals),
          blocks: currentStats.blocks + parseInt(player.blocks),
          turnovers: currentStats.turnovers + parseInt(player.turnovers),
          firstName: player.first_name,
          lastName: player.last_name,
        };
      });
    }

    if (visitorPlayer.length > 0) {
      visitorPlayer.forEach((player) => {
        const currentStats = elliotPlayers[player.person_id];
        elliotPlayers[player.person_id] = {
          teamKey: item?.sports_content?.game?.visitor?.team_key,
          teamCity: item?.sports_content?.game?.visitor?.city,
          teamId: item?.sports_content?.game?.visitor?.id,
          teamNickname: item?.sports_content?.game?.visitor?.nickname,
          points: currentStats.points + parseInt(player.points),
          threePointersMade:
            currentStats.threePointersMade +
            parseInt(player.three_pointers_made),
          rebounds:
            currentStats.rebounds +
            parseInt(player.rebounds_defensive) +
            parseInt(player.rebounds_offensive),
          assists: currentStats.assists + parseInt(player.assists),
          steals: currentStats.steals + parseInt(player.steals),
          blocks: currentStats.blocks + parseInt(player.blocks),
          turnovers: currentStats.turnovers + parseInt(player.turnovers),
          firstName: player.first_name,
          lastName: player.last_name,
        };
      });
    }
  });

  return (
    <div>
      <Head>
        <title>NBA Scout</title>
      </Head>
      <h1 className="text-6xl">NBA Scout</h1>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Points
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      3 Pointers
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Rebounds
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Assists
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Steals
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Blocks
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Turnovers
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Object.keys(elliotPlayers).map((playerId, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <Image
                              className="h-10 w-10 rounded-full"
                              src={getTeamLogo(
                                parseInt(elliotPlayers[playerId].teamId)
                              )}
                              alt={elliotPlayers[playerId].teamNickname}
                              width={40}
                              height={40}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {elliotPlayers[playerId].firstName}{' '}
                              {elliotPlayers[playerId].lastName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {elliotPlayers[playerId].teamCity}{' '}
                              {elliotPlayers[playerId].teamNickname}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {elliotPlayers[playerId].points}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {elliotPlayers[playerId].threePointersMade}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          {elliotPlayers[playerId].rebounds}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                          {elliotPlayers[playerId].assists}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                          {elliotPlayers[playerId].steals}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-400 text-gray-100">
                          {elliotPlayers[playerId].blocks}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          {elliotPlayers[playerId].turnovers}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    league: { vegas: schedule = [] },
  } = await getSchedule('2021');

  const GAME_MIN = 48;
  const MIN_TO_MIL = 60000;
  const gameDateInMil = (game: Game) => {
    return new Date(game.startTimeUTC).getTime() + GAME_MIN * MIN_TO_MIL;
  };
  const playedGames = schedule.filter(
    (game: Game) => gameDateInMil(game) - new Date().getTime() < 0
  );

  const games = [];
  for (const game of playedGames) {
    const { startDateEastern, gameId } = game;
    const gameData = await getBoxScore(startDateEastern, gameId);
    games.push(gameData);
  }

  return {
    props: { games },
  };
};
