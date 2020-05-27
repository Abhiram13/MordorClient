let request = (function () {
   return {
      post: function (url, data, func) {
         let XHTTP = new XMLHttpRequest();
         XHTTP.open('post', `/${url}`, true);
         XHTTP.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
         XHTTP.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
               func(XHTTP);
            }
         }
         XHTTP.send(JSON.stringify(data));
      },

      get: async function (url) {
         const response = await fetch(`/${url}`);
         const body = await response.json();

         if (response.status !== 200) alert(body.message);
         return body;
      }
   }
})();

export default request;