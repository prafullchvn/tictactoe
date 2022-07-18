(function () {
  const handlerRegisterMoveRes = (xhr) => {
    if (xhr.status !== 200) {
      alert('It is not your move');
      return;
    }
  };

  const sendRegisterMoveReq = (event) => {
    const cellId = event.target.id;
    const reqDetails = {
      method: 'POST',
      url: '/register-move',
      contentType: 'application/json',
      body: JSON.stringify({ cellId })
    };
    sendReq(reqDetails, handlerRegisterMoveRes);
  };

  const drawMoves = ({ moves, symbol }) => {
    moves.forEach((move) => {
      const cell = document.getElementById(move);
      cell.innerText = symbol;
    });
  };

  const displayMessage = (message) => {
    const msgElement = document.querySelector('#message');
    msgElement.innerText = message;
  };

  const draw = (gameStats, intervalId) => {
    const { players, currentPlayer: { name }, result } = gameStats;

    let message = `${name}'s move`;
    if (result) {
      const { winner, isDraw } = result;
      message = isDraw ? `It's a draw` : `${winner.name} won`;

      clearInterval(intervalId);
    }

    displayMessage(message);
    players.forEach(drawMoves);
  };

  const main = () => {
    const board = document.querySelector('.board');
    board.addEventListener('click', sendRegisterMoveReq);

    const reqDetails = {
      method: 'GET',
      url: '/get-stats',
      contentType: 'application/x-www-form-urlencoded',
      body: ''
    };

    const intervalId = setInterval(() => {
      sendReq(reqDetails, (xhr) => {
        if (xhr.status >= 500) {
          clearInterval(intervalId);
          alert('Oops! Something went wrong.');
          return;
        }
        if (xhr.status !== 200) {
          alert('Failed to get game stats');
        }
        const gameStats = JSON.parse(xhr.response);
        draw(gameStats, intervalId);
      });
    }, 100);
  };

  window.onload = main;
})();
