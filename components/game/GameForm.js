import { useRouter } from 'next/router';
import PropTypes, { number, string } from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createGame, getGameTypes } from '../../utils/data/gameData';

const defaultGameObj = {
  id: '',
  maker: '',
  number_of_players: 0,
  skill_level: 0,
  title: '',
  game_type: {
    id: 0,
    label: '',
  },
  gamer: {
    id: 0,
    bio: '',
    uid: '',
  },
};

const GameForm = ({ gameObj } = defaultGameObj) => {
  const router = useRouter();
  const { user } = useAuth();
  const [gameTypes, setGameTypes] = useState([]);
  /*
  Since the input fields are bound to the values of
  the properties of this state variable, you need to
  provide some default values.
  */
  const [currentGame, setCurrentGame] = useState({
    skillLevel: defaultGameObj?.skill_level,
    numberOfPlayers: defaultGameObj?.number_of_players,
    title: defaultGameObj?.title,
    maker: defaultGameObj?.maker,
    gameTypeId: defaultGameObj?.game_type?.id,
  });

  useEffect(() => {
    setCurrentGame({
      skillLevel: gameObj?.skill_level,
      numberOfPlayers: gameObj?.number_of_players,
      title: gameObj?.title,
      maker: gameObj?.maker,
      gameTypeId: gameObj?.game_type?.id,
    });
  }, [gameObj]);

  useEffect(() => {
    getGameTypes().then((data) => setGameTypes(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.warn(currentGame);
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();

    const game = {
      maker: currentGame.maker,
      title: currentGame.title,
      number_of_players: Number(currentGame.numberOfPlayers),
      skill_level: Number(currentGame.skillLevel),
      game_type: Number(currentGame.gameTypeId),
      user_id: user.uid,
    };

    // Send POST request to your API
    createGame(game).then(() => router.push('/games'));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {/* <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Game</h2> */}
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            required
            value={currentGame.title}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Maker</Form.Label>
          <Form.Control
            name="maker"
            required
            value={currentGame.maker}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Number of Players</Form.Label>
          <Form.Control
            name="numberOfPlayers"
            required
            value={currentGame.numberOfPlayers}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Skill Level</Form.Label>
          <Form.Control
            name="skillLevel"
            required
            value={currentGame.skillLevel}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Select
            className="mb-3"
            onChange={handleChange}
            name="gameTypeId"
          >
            <option value="">Select a Category</option>
            {gameTypes?.map((gameType) => (
              <option key={gameType.id} value={gameType.id} selected={gameType.id === currentGame.gameTypeId}>
                {gameType.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

GameForm.propTypes = {
  gameObj: PropTypes.shape({
    id: string,
    maker: string,
    number_of_players: number,
    skill_level: number,
    title: string,
    game_type: PropTypes.shape({
      id: string,
      label: string,
    }),
    gamer: PropTypes.shape({
      id: number,
      bio: string,
      uid: string,
    }),
  }),
};

GameForm.defaultProps = {
  gameObj: PropTypes.shape({
    id: '',
    maker: '',
    number_of_players: 0,
    skill_level: 0,
    title: '',
    game_type: {
      id: 0,
      label: '',
    },
    gamer: {
      id: 0,
      bio: '',
      uid: '',
    },
  }),
};

export default GameForm;
