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

  const main = () => {
    const board = document.querySelector('.board');
    board.addEventListener('click', sendRegisterMoveReq);
  };

  window.onload = main;
})();
