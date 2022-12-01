import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getEventsById } from '../../../utils/data/eventData';
import EventForm from '../../../components/event/EventForm';

export default function EditEvent() {
  const [editEvent, setEditEvent] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getEventsById(id).then(setEditEvent);
  }, [id]);

  return (
    <div className="editEventForm" style={{ height: '45rem', padding: '10%' }}>
      <EventForm eventObj={editEvent} />
    </div>
  );
}
