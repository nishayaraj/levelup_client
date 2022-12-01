import { clientCredentials } from '../client';

const getEvents = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createEvent = (event) => new Promise((resolve, reject) => {
  fetch('http://localhost:8000/events', {
    method: 'POST',
    body: JSON.stringify(event),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const deleteThisEvent = (id) => fetch(`http://localhost:8000/events/${id}`, {
  method: 'DELETE',
});

const getEventsById = (id) => fetch(`http://localhost:8000/events/${id}`)
  .then((response) => response.json());

const updateEvent = (event) => fetch(`http://localhost:8000/events/${event.id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(event),
})
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error:', error);
  });
// eslint-disable-next-line import/prefer-default-export
export {
  getEvents, createEvent, deleteThisEvent, getEventsById, updateEvent,
};
