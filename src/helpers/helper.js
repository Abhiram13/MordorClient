/**
 * @returns {Function}
 */
let request = (function () {
   return {
      /**       
       * @param {string} url 
       * @param {object} data 
       * @param {Function} [func] 
       * @returns {void}
       */
      post: function (url, data, func) {
         let XHTTP = new XMLHttpRequest();
         XHTTP.open('post', `/${url}`, true);
         XHTTP.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
         XHTTP.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
               /**
                * @param {XMLHttpRequest} XHTTP
                */
               func(XHTTP);
            }
         }
         XHTTP.send(JSON.stringify(data));
      },

      /**       
       * @async
       * @param {string} url 
       * @returns {Promise<object>}
       */
      get: async function (url) {
         const response = await fetch(`/${url}`);
         const body = await response.json();

         if (response.status !== 200) alert(body.message);
         return body;
      }
   }
})();

export function getUser() {
   return document.cookie.split('=')[1];
}

export default request;