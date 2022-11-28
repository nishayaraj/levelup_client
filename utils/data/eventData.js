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

const deleteThisEvent = (id) => fetch(`http://localhost:8000/events/${id}`)
  .then((response) => response.json());

// eslint-disable-next-line import/prefer-default-export
export { getEvents, createEvent, deleteThisEvent };
