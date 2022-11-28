import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { deleteThisEvent } from '../../utils/data/eventData';

const EventCard = ({ eventObj, onUpdate }) => {
  const deleteEvent = () => {
    if (window.confirm(`Delete ${eventObj.description}?`)) {
      deleteThisEvent(eventObj.id).then(() => {
        onUpdate();
        // window.location.reload();
      });
    }
  };
  // DELETE IS NOT FUNCTIONING
  return (
    <Card className="text-center">
      <Card.Header>Event</Card.Header>
      <Card.Body>
        <Card.Title>{eventObj.description}</Card.Title>
        <Card.Text>Date: {eventObj.date} </Card.Text>
        <Button variant="danger" onClick={deleteEvent} className="m-2">
          DELETE
        </Button>
      </Card.Body>
      <Card.Footer className="text-muted">Time: {eventObj.time}</Card.Footer>
    </Card>
  );
};

EventCard.propTypes = {
  eventObj: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EventCard;
