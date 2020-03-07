/**
 * 
 * @param {string} method - defines 'POST' or 'GET'
 * @param {string} url - defines url to which to send the request object
 * @param {object} data - defines the data to be sent to the server
 */
export default function postRequest(method, url, data) {
   let XHTTP = new XMLHttpRequest();
   XHTTP.open(method, url, true);
   XHTTP.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
   XHTTP.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
         console.log(XHTTP);
         return XHTTP;
      }
   }
   XHTTP.send(JSON.stringify(data));
}