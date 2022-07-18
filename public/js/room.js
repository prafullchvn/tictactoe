(function () {
  const sendReq = (method, url, callback, body = '') => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', (event) => callback(xhr));
    xhr.open(method, url);
    xhr.send(body);
  };

  const handleIsGameReadyRes = (xhr) => {
    if (xhr.status !== 200) {
      alert('Failed to get the game stats');
      return;
    }

    const loadingElement = document.querySelector('#loading');
    loadingElement.innerText = `Waiting for other player to join...`;

    const { isSlotAvailable } = JSON.parse(xhr.response);
    if (!isSlotAvailable) {
      window.location.href = '/';
      return;
    }
  };

  const waitForOtherPlayer = () => {
    setInterval(() => {
      sendReq('GET', '/is-game-ready', handleIsGameReadyRes);
    }, 100);
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

    waitForOtherPlayer();
  };

  const main = () => {
    const hostBtn = document.querySelector('#host');
    hostBtn.addEventListener('click', () => {
      sendReq('GET', '/host', getGameId);
    });
  };

  window.onload = main;
})();
