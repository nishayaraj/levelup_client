import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
// import Link from 'next/link';
import { deleteThisGame } from '../../utils/data/gameData';

const GameCard = ({ gameObj }) => {
  const deleteGame = () => {
    if (window.confirm(`Delete ${gameObj.title}?`)) {
      deleteThisGame(gameObj.id).then(() => {
        window.location.reload();
      });
    }
  };

  return (
    <Card className="text-center">
      <Card.Header>{gameObj.title}</Card.Header>
      <Card.Body>
        <Card.Title>By: {gameObj.maker}</Card.Title>
        <Card.Text>{gameObj.numberOfPlayers} players needed</Card.Text>
        {/* <Link href={`/games/edit/${gameObj.id}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link> */}
        <Button variant="danger" onClick={deleteGame} className="m-2">
          DELETE
        </Button>
      </Card.Body>
      <Card.Footer className="text-muted">Skill Level: {gameObj.skillLevel}</Card.Footer>
    </Card>
  );
};

GameCard.propTypes = {
  gameObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    maker: PropTypes.string,
    numberOfPlayers: PropTypes.number,
    skillLevel: PropTypes.number,
  }).isRequired,
};

export default GameCard;
