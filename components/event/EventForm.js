import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { getGames } from '../../utils/data/gameData';
import { createEvent } from '../../utils/data/eventData';

const EventForm = ({ user }) => {
  const [games, setGames] = useState([]);
  /*
  Since the input fields are bound to the values of
  the properties of this state variable, you need to
  provide some default values.
  */
  const [currentEvent, setCurrentEvent] = useState({
    description: '',
    time: '',
    date: '',
    game: 0,
    organizer: 1,
  });
  const router = useRouter();

  useEffect(() => {
    getGames().then((data) => setGames(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.warn(name, value);
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();

    const event = {
      description: currentEvent.description,
      time: currentEvent.time,
      date: currentEvent.date,
      game: Number(currentEvent.game),
      organizer: user.uid,
    };

    // Send POST request to your API
    createEvent(event).then(() => router.push('/events'));
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
            onChange={handleChange}
            name="game"
          >
            <option value="">Select a Game</option>
            {games?.map((game) => (
              <option key={game.id} value={game.id}>
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
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventForm;
