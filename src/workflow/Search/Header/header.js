import React, { useEffect, useState } from 'react';
import request from '../../../helpers/helper';

function redirect(url) {
   window.location.assign(url);
}

const Header = () => {
   const [user, getUser] = useState('');

   useEffect(() => {
      const id = window.location.pathname.split('/')[2] === 'details' ? window.location.pathname.split('/')[1].split('_')[0] : window.location.pathname.split('/')[1];

      request.get(`${id}/home`).then((response) => {
         getUser(response[0]);
      })
   }, []);

   try {
      return (
         <header>
            <div className="container mx-auto m-0 p-0">
               <div className="d-flex justify-content-between py-3">
                  <section>Welcome, {user.firstname} {user.lastname}</section>
                  <section className="d-flex justify-content-between col-sm-3 p-0">
                     <span className="pointer" onClick={() => redirect(`/${user._id}/home`)}>Home</span>
                     <span className="pointer" onClick={() => redirect(`/${user._id}/profile`)}>Profile</span>
                     <span className="pointer">Log Out</span>
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