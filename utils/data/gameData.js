import { clientCredentials } from '../client';

const getGames = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getGamesById = (id) => fetch(`http://localhost:8000/games/${id}`)
  .then((response) => response.json);

const createGame = (game) => new Promise((resolve, reject) => {
  fetch('http://localhost:8000/games', {
    method: 'POST',
    body: JSON.stringify(game),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const getGameTypes = () => new Promise((resolve, reject) => {
  fetch('http://localhost:8000/gametypes')
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteThisGame = (id) => fetch(`http://localhost:8000/games/${id}`, {
  method: 'DELETE',
});

// eslint-disable-next-line import/prefer-default-export
export {
  getGames, createGame, getGameTypes, deleteThisGame, getGamesById,
};
