import React, { useEffect, useState } from 'react';
import request, { getUser } from '../../../helpers/helper';

function redirect(url) {
   window.location.assign(url);
}

const Header = () => {
   const [user, get] = useState({});

   useEffect(() => {
      const id = window.location.pathname.split('/')[2] === 'details' ? window.location.pathname.split('/')[1].split('_')[0] : getUser();

      request.get(`${id}/home`).then((response) => {
         get(response[0]);
      })
   }, []);

   const logout = function() {
      document.cookie = "userid=null";
      window.location.assign('/');
   }

   try {
      return (
         <header>
            <div className="container mx-auto m-0 p-0">
               <div className="d-flex justify-content-between py-3">
                  <section>Welcome, {user.firstname} {user.lastname}</section>
                  <section className="d-flex justify-content-between col-sm-3 p-0">
                     <span className="pointer" onClick={() => redirect(`/home`)}>Home</span>
                     <span className="pointer" onClick={() => redirect(`/profile`)}>Profile</span>
                     <span className="pointer" onClick={() => logout()}>Log Out</span>
                  </section>
               </div>
            </div>
         </header>
      )
   } catch (e) {
      window.location.assign('/');
   }
}

export default Header;