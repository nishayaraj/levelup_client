import { useRouter } from 'next/router';
import PropTypes, { string, number } from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { getGames } from '../../utils/data/gameData';
import { createEvent, updateEvent } from '../../utils/data/eventData';
import { useAuth } from '../../utils/context/authContext';

const defaultEventObj = {
  id: 0,
  description: '',
  time: '',
  date: '',
  game: {
    id: 0,
    title: '',
    maker: '',
  },
  organizer: {
    id: 0,
    bio: '',
    uid: '',
  },
};

const EventForm = ({ eventObj = defaultEventObj }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [games, setGames] = useState([]);

  const [currentEvent, setCurrentEvent] = useState({
    description: defaultEventObj?.description,
    time: defaultEventObj?.time,
    date: defaultEventObj?.date,
    game: defaultEventObj?.game?.id,
    id: defaultEventObj?.id,
  });

  useEffect(() => {
    setCurrentEvent({
      description: eventObj?.description,
      time: eventObj?.time,
      date: eventObj?.date,
      game: eventObj?.game?.id,
      id: eventObj?.id,
    });
  }, [eventObj]);

  useEffect(() => {
    getGames().then((data) => setGames(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleGameChange = (e) => {
    if (e?.target?.value) {
      setCurrentEvent({ ...currentEvent, game: Number(e.target.value) });
    }
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();

    if (currentEvent.id !== 0) {
      updateEvent(currentEvent).then(() => router.push('/events'));
    } else {
      const newEvent = { ...currentEvent, organizer: user.uid };
      delete newEvent.id;
      createEvent(newEvent).then(() => router.push('/events'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            required
            value={currentEvent.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            name="date"
            required
            value={currentEvent.date}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Time</Form.Label>
          <Form.Control
            name="time"
            required
            value={currentEvent.time}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Select
            className="mb-3"
            onChange={handleGameChange}
            name="game"
          >
            <option value="">Select a Game</option>
            {games?.map((game) => (
              <option key={game.id} value={game.id} selected={game.id === currentEvent.game}>
                {game.title}
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

EventForm.propTypes = {
  eventObj: PropTypes.shape({
    id: number,
    description: string,
    time: string,
    date: string,
    game: PropTypes.shape({
      id: number,
      title: string,
      maker: string,
    }),
    organizer: PropTypes.shape({
      id: number,
      bio: string,
      uid: string,
    }),
  }).isRequired,
};

export default EventForm;
