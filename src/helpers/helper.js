/**
 * 
 * @param {string} method - defines 'POST' or 'GET'
 * @param {string} url - defines url to which to send the request object
 * @param {object} data - defines the data to be sent to the server
 * @param {Function} func
 */
function postRequest(method, url, data, func) {
   let XHTTP = new XMLHttpRequest();
   XHTTP.open(method, url, true);
   XHTTP.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
   XHTTP.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
         /**
          * @param {object} XHTTP
          */
         func(XHTTP);
      }
   }
   XHTTP.send(JSON.stringify(data));
}

async function getRequest(url) {
   const response = await fetch(url);
   const body = await response.json();

   return body;
}

export { postRequest, getRequest };