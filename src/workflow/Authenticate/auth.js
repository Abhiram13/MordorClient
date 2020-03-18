import React, { Fragment, createRef } from 'react'
import { withRouter } from 'react-router-dom';
import Login from './login'
import SignUp from './signin'

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
      this.domRef = createRef();
   }

   /**
    * @param {object} loginCredentials - state object of @function Login Component
    * @description - This function retrives data(Login Credentials) from Login Component(Child) and changes the state
    * and once the state is updated, it calls @function postLoginRequest
    */
   getLoginCredentials(loginCredentials) {
      this.setState({ loginData: loginCredentials }, () => this.postLoginRequest('post', '/login.js', this.state.loginData));
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
      this.setState({ signData: signInCredentials }, () => this.postSignInRequest('post', '/signIn.js', this.state.signData));
   }

   /**
    * @param {boolean} a - boolean value which switches User Existence or not
    * Used in SignIn Component
    */
   existingUser(a) {
      this.setState({ userExist: a })
   }

   postLoginRequest(method, url, data) {
      let XHTTP = new XMLHttpRequest();
      XHTTP.open(method, url, true);
      XHTTP.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
      XHTTP.onreadystatechange = () => {
         if (XHTTP.readyState === 4 && XHTTP.status === 200) {
            let response = JSON.parse(XHTTP.responseText);
            if (response.access) {
               this.props.history.push('/home');
            } else {
               alert('Incorrect Username or Password');
            }            
         }
      }
      XHTTP.send(JSON.stringify(data));
   }

   postSignInRequest(method, url, data) {
      let XHTTP = new XMLHttpRequest();
      XHTTP.open(method, url, true);
      XHTTP.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
      XHTTP.onreadystatechange = () => {
         if (XHTTP.readyState === 4 && XHTTP.status === 200) {
            let response = JSON.parse(XHTTP.responseText);
            alert((response.status) ? 'User has been Registered Successfully' : 'User has already been Registered');
            this.setState({ userExist: true });      
         }
      }
      XHTTP.send(JSON.stringify(data));
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
               (this.state.userExist)
                  ? <Login ref={this.domRef} getData={this.getRefData.bind(this)} credentials={this.getLoginCredentials.bind(this)} newUser={this.createUser.bind(this)} />
                  : <SignUp create={this.getSignUpCredentials.bind(this)} exist={this.existingUser.bind(this)} />
            }
         </Fragment>
      );
   }   
}

export default withRouter(Auth);