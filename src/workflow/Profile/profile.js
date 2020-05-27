import React, { Fragment } from 'react';
import Header from '../Search/Header/header';
import UserProfile from './userProfile';

function tabContent(tab) {
   switch (tab) {
      case 'Profile':
         return <UserProfile />
   }
}

const Profile = () => {
   return (
      <Fragment>
         <Header />
         <div className="container p-0 m-0 mx-auto mt-5">
            <div className="d-flex justify-content-between col-sm-9 p-0 mx-auto">
               <h5 onClick={() => tabContent()}><strong>Profile</strong></h5>
               <h5 onClick={() => tabContent()}><strong>User Dashboard</strong></h5>
               <h5 onClick={() => tabContent()}><strong>Item Dashboard</strong></h5>
            </div>
         </div>
      </Fragment>
   )
};

export default Profile;