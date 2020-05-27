import React, { Fragment, useState } from 'react';
import Header from '../Search/Header/header';
import UserProfile from './userProfile';
import UserDashboard from './userDashboard';
import ItemDashboard from './itemDashoard';

function tabContent(tab) {
   switch (tab) {      
      case 'User Dashboard':
         return <UserDashboard />
      case 'Item Dashboard':
         return <ItemDashboard />
      default:
         return <UserProfile />
   }
}

const Profile = () => {

   const [tab, setTab] = useState('');

   return (
      <Fragment>
         <Header />
         <div className="container p-0 m-0 mx-auto mt-5">
            <div className="d-flex justify-content-between col-sm-9 p-0 mx-auto">
               <h5 onClick={() => setTab()}><strong>Profile</strong></h5>
               <h5 onClick={() => setTab('User Dashboard')}><strong>User Dashboard</strong></h5>
               <h5 onClick={() => setTab('Item Dashboard')}><strong>Item Dashboard</strong></h5>
            </div>
            {tabContent(tab)}
         </div>
      </Fragment>
   )
};

export default Profile;