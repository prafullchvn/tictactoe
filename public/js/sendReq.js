const sendReq = (reqDetails, callback) => {
  const { method, url, body, contentType } = reqDetails;

  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', (event) => callback(xhr));
  xhr.open(method, url);
  xhr.setRequestHeader('content-type', contentType);
  xhr.send(body);
};
