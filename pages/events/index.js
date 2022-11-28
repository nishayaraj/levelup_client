import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import EventCard from '../../components/event/EventCard';
import { getEvents } from '../../utils/data/eventData';
import { useAuth } from '../../utils/context/authContext';

function Home() {
  const [events, setEvents] = useState([]);

  const { user } = useAuth();

  const getAllEvents = () => {
    getEvents(user.uid).then(setEvents);
  };

  useEffect(() => {
    getEvents().then((data) => setEvents(data));
  }, []);

  const router = useRouter();

  return (
    <article className="events">
      <h1>Events</h1>
      <h2>
        <Button
          onClick={() => {
            router.push('/events/new');
          }}
        >
          Register New Event
        </Button>
      </h2>
      {events.map((event) => (
        <section key={`event--${event.id}`} className="event">
          <EventCard description={event.description} date={event.date} time={event.time} eventObj={event} onUpdate={getAllEvents} />
        </section>
      ))}
    </article>
  );
}

export default Home;
