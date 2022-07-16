const sendReq = (method, url, callback, body = '') => {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', (event) => callback(xhr));
  xhr.open(method, url);
  xhr.send(body);
};

const getGameId = (xhr) => {
  if (xhr.status !== 200) {
    alert('Failed to host the game.');
    return;
  }
  const { gameId } = JSON.parse(xhr.response);
  const gameIdElement = document.querySelector('#game-id');
  gameIdElement.innerText = `Your Game Id is ${gameId}`;
  document.querySelector('#buttons').remove();
};

const main = () => {
  const hostBtn = document.querySelector('#host');
  hostBtn.addEventListener('click', () => {
    sendReq('GET', '/host', getGameId);
  });
};

window.onload = main;
