import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom';
import Login from './login';
import SignIn from './signin';
import request from '../../helpers/helper';

/**
 * @class Auth 
 * Holds Login and Sign In Components
 * and access server to pass the credentials and push to new route
 */

 /**
  * @typedef State
  * @property {string} loginData
  * @property {string} [signData]
  * @property {boolean} userExist  
  */
class Auth extends React.Component {
   constructor(props) {
      super(props);
      /**
       * @type {State}
       */
      this.state = {
         loginData: '',
         signData: '',
         userExist: true, // tells if user exists or not         
      }
   }

   /**
    * @param {object} loginCredentials - state object of @function Login Component
    * @description - This function retrives data(Login Credentials) from Login Component(Child) and changes the state.    
    */
   getLoginCredentials(loginCredentials) {
      this.setState({ loginData: loginCredentials }, () => {
         request.post('login.js', this.state.loginData, (XHTTP) => {
            const response = JSON.parse(XHTTP.responseText);
            if (response.access) {
               this.props.history.push(`${response.document[0]._id}/home`);
            } else {
               alert('Incorrect Username or Password');
            }
         });
      })
   }

   /**
    * @param {boolean} a - boolean value which switches User Existence or not
    * Used in Login Component
    */
   createUser(a) {
      this.setState({ userExist: a });
   }

   /**
    * @param {object} signInCredentials - state object of SignIn Component
    * @description - This function retrives data(SignUp Credentials) from SignIn Component(Child) and changes the state
    * and once the state is updated, it calls @function postSignInRequest
    */
   getSignUpCredentials(signInCredentials) {
      this.setState({ signData: signInCredentials }, () => {
         request.post('signIn.js', this.state.signData, (XHTTP) => {
            const response = JSON.parse(XHTTP.responseText);
            alert((response.status) ? 'User has been Registered Successfully' : 'User has already been Registered');
            this.setState({ userExist: true });
         });
      });
   }

   /**
    * @param {boolean} a - boolean value which switches User Existence or not
    * Used in SignIn Component
    */
   existingUser(a) {
      this.setState({ userExist: a })
   }

   /**
    * @returns {React.ReactNode}
    */
   render() {
      return (
         <Fragment>
            <div className="row" style={{ height: '-webkit-fill-available' }}>
               <section className="col-sm-6 p-0 m-0 position-relative">
                  <div className="col-sm-8 p-0 m-0 position-absolute" style={{ top: '40%', left: '10%' }}>
                     <h1 className="m-0" style={{ fontSize: '3.4rem' }}><strong className="text-white">Welcome User,</strong></h1>
                     <p className="m-0 p-0 text-white">
                        {this.state.userExist ? 'Please Login to your Account' : 'Please Create your Account'}
                     </p>
                  </div>
               </section>
               <section className="col-sm-6 p-0 m-0 position-relative">
                  <div className="col-sm-7 p-0 mx-auto position-absolute bg-white box_shadow" style={{ top: '17%', left: '25%', borderRadius: '18px', height: '450px' }}>
                     {
                        this.state.userExist
                           ? <Login credentials={this.getLoginCredentials.bind(this)} newUser={this.createUser.bind(this)} />
                           : <SignIn create={this.getSignUpCredentials.bind(this)} exist={this.existingUser.bind(this)} />
                     }
                  </div>
               </section>
            </div>
         </Fragment>
      );
   }
}

export default withRouter(Auth);