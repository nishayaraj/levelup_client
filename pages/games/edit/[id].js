import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getGamesById } from '../../../utils/data/gameData';
import GameForm from '../../../components/game/GameForm';

export default function EditGame() {
  const [editGame, setEditGame] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getGamesById(id).then(setEditGame);
  }, [id]);

  return (
    <div className="editGameForm" style={{ height: '45rem', padding: '10%' }}>
      <GameForm obj={editGame} />
    </div>
  );
}
