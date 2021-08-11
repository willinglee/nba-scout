import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { getSchedule, getBoxScore, getPlayerInfo } from '../lib/nba';

interface Player {
  [key: string]: string;
}

export default function Home({ schedule, boxScore, player, players }) {
  console.log(schedule);
  console.log(boxScore);
  console.log(player);
  console.log(players);

  return (
    <div>
      <Head>
        <title>NBA Scout</title>
      </Head>
      <h1>NBA Scout</h1>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    league: { vegas: schedule = [] },
  } = await getSchedule('2021');

  const [firstGame] = schedule;
  const { gameId } = firstGame;

  const boxScore = await getBoxScore(gameId);
  const { resultSets } = boxScore;
  const [playerStats] = resultSets;
  const { headers, rowSet: players } = playerStats;

  const playersMapped = players.map((player) => {
    let playerData: Player = {};
    player.forEach((item, index) => {
      playerData[headers[index]] = item;
    });
    return playerData;
  });

  const player = await getPlayerInfo(1630224);
  return {
    props: { schedule, boxScore: playerStats, player, players: playersMapped },
  };
};
