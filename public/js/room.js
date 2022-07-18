(function () {
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
      const reqDetails = {
        method: 'GET',
        url: '/is-game-ready',
        contentType: 'application/x-www-form-urlencoded',
        body: ''
      };
      sendReq(reqDetails, handleIsGameReadyRes);
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
      const reqDetails = {
        method: 'GET',
        url: '/host',
        contentType: 'application/x-www-form-urlencoded',
        body: ''
      };
      sendReq(reqDetails, getGameId);
    });
  };

  window.onload = main;
})();
