const sendReq = (method, url, callback, body = '') => {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', (event) => callback(xhr));
  xhr.open(method, url);
  xhr.send(body);
};

const handlerRegisterMoveRes = (xhr) => {
  if (xhr.status !== 200) {
    alert('It is not your move');
    return;
  }
};

const sendRegisterMoveReq = (event) => {
  const cellId = event.target.id;
  sendReq('POST', '/register-move', handlerRegisterMoveRes, cellId);
};

const main = () => {
  const board = document.querySelector('.board');
  board.addEventListener('click', sendRegisterMoveReq);
};

window.onload = main;
