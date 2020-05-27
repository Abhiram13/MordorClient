import React, { useState } from 'react';
import Input from '../../helpers/input';

function sendData(userName, firstName, lastName, passWord, checkBox, props) {
   if (userName && firstName && lastName && passWord) {
      props.create({
         userName: userName,
         firstName: firstName,
         lastName: lastName,
         passWord: passWord,
         checkBox: checkBox,
      });
   }

   return;
}

const SignIn = (props) => {
   const [userName, setUserName] = useState('');
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [passWord, setPassword] = useState('');
   const [checked, setCheckBox] = useState(false);

   const getUsername = (value) => {
      setUserName(value);
   }

   const getFirstName = (value) => {
      setFirstName(value);
   }

   const getLastName = (value) => {
      setLastName(value);
   }

   const getPassword = (value) => {
      setPassword(value);
   }

   return (
      <React.Fragment>
         <div className="p-3" style={{ marginTop: '61px' }}>
            <Input type="text" placeholder="Username" id="signin_username" value={getUsername} class="bg-transparent rounded p-2 mb-3 col-sm d-block border inputField" />
            <Input type="text" placeholder="First Name" id="signin_firstname" value={getFirstName} class="bg-transparent rounded p-2 mb-3 col-sm d-block border inputField" />
            <Input type="text" placeholder="Last Name" id="signin_lastname" value={getLastName} class="bg-transparent rounded p-2 mb-3 col-sm d-block border inputField" />
            <Input type="password" placeholder="Password" id="signin_password" value={getPassword} class="bg-transparent rounded p-2 mb-3 col-sm d-block border inputField" />
            <button
               type="button"
               className="btn d-block mx-auto col-sm-3 py-1 signinBlue text-white"
               onClick={() => sendData(userName, firstName, lastName, passWord, checked, props)}>Sign Up</button>
            <p className="text-center m-0 p-0 mt-4">
               <small>Already have an Account? </small>
               <small className="pointer loginColor" onClick={() => props.exist(true)}>Login!</small>
            </p>
         </div>         
      </React.Fragment>
   );
}

export default SignIn;
