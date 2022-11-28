import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import GameCard from '../../components/game/GameCard';
import { getGames } from '../../utils/data/gameData';

function Home() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getGames().then((data) => setGames(data));
  }, []);

  const router = useRouter();

  return (
    <article className="games">
      <h1>Games</h1>
      <h2>
        <Button
          onClick={() => {
            router.push('/games/new');
          }}
        >
          Register New Game
        </Button>
      </h2>
      {games.length > 0 && games.map((game) => (
        <section key={`game--${game.id}`} className="game">
          <GameCard gameObj={game} />
        </section>
      ))}
    </article>
  );
}

export default Home;
