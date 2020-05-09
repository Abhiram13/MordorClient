import React, { Fragment, createRef } from 'react'
import { withRouter } from 'react-router-dom';
import Login from './login';
import SignUp from './signin';
import { postRequest } from '../../helpers/helper';

/**
 * @class Auth 
 * Holds Login and Sign In Components
 * and access server to pass the credentials and push to new route
 */
class Auth extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         loginData: '',
         signData: '',
         userExist: true, // tells if user exists or not
         refDatafromChild: '',
      }
   }

   /**
    * @param {object} loginCredentials - state object of @function Login Component
    * @description - This function retrives data(Login Credentials) from Login Component(Child) and changes the state
    * and once the state is updated, it calls @function postRequest
    */
   getLoginCredentials(loginCredentials) {
      this.setState({ loginData: loginCredentials }, () => {
         postRequest('post', './login.js', this.state.loginData, (XHTTP) => {
            let response = JSON.parse(XHTTP.responseText);
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
         postRequest('post', './signIn.js', this.state.signData, (XHTTP) => {
            let response = JSON.parse(XHTTP.responseText);
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

   getRefData(a) {
      this.setState({
         refDatafromChild: a,
      });
   }

   render() {
      return (
         <Fragment>
            {
               this.state.userExist
                  ? <Login getData={this.getRefData.bind(this)} credentials={this.getLoginCredentials.bind(this)} newUser={this.createUser.bind(this)} />
                  : <SignUp create={this.getSignUpCredentials.bind(this)} exist={this.existingUser.bind(this)} />
            }
         </Fragment>
      );
   }
}

export default withRouter(Auth);