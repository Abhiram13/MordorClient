/* eslint-disable no-lone-blocks */
import React from 'react';
import postRequest from '../../helpers/helper';

class SignUp extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         username: '',
         firstname: '',
         lastname: '',
         password: '',
         login_username: '',
         login_password: '',
      }
      this.handleChange = this.handleChange.bind(this);
   }

   /**
    * @param {object} event - returns the element by id which triggered the Event
    */
   handleChange = event => {
      switch(event.target.id) {
         case 'username':
            this.setState({
               username: event.target.value,
            });
            break;
         case 'firstname':
            this.setState({
               firstname: event.target.value,
            });
            break;
         case 'lastname':
            this.setState({
               lastname: event.target.value,
            });
            break;
         case 'password':
            this.setState({
               password: event.target.value,
            });
            break;
         case 'loginusername':
            this.setState({
               login_username: event.target.value,
            });
            break;
         case 'loginpassword':
            this.setState({
               login_password: event.target.value,
            });
            break;
         default:
            return null;
      }
   }

   sendDate() {
      const { username, firstname, lastname, password } = this.state;
      if (username && firstname && lastname && password) {
         return postRequest('post', '/signIn.js', this.state);
      }
   }

   sendLoginCred() {
      const { login_username, login_password } = this.state;
      let obj = {
         username: login_username,
         password: login_password,
      }      
      if (login_password && login_username) {
         return postRequest('post', '/login.js', obj);
      }
   }

   render() {
      return (
         <div className="App">
            <div className="container pt-5">
               <div className="d-flex col-sm-5 p-0 justify-content-between">
                  <input
                     type="text"
                     id="username"
                     placeholder="User Name"
                     value={this.state.username}
                     onChange={this.handleChange} />
                  <input
                     type="text"
                     id="firstname"
                     placeholder="First Name"
                     value={this.state.firstname}
                     onChange={this.handleChange} />
                  <input
                     type="text"
                     id="lastname"
                     placeholder="Last Name"
                     value={this.state.lastname}
                     onChange={this.handleChange} />
                  <input
                     type="text"
                     id="password"
                     placeholder="Password"
                     value={this.state.password}
                     onChange={this.handleChange} />
                  <button
                     type="button"
                     className="btn btn-info"
                     onClick={() => this.sendDate()}>Submit</button>
               </div>

               <div className="d-flex col-sm-5 p-0 justify-content-between">
                  <input
                     type="text"
                     id="loginusername"
                     placeholder="User Name"
                     value={this.state.login_username}
                     onChange={this.handleChange} />
                  <input
                     type="text"
                     id="loginpassword"
                     placeholder="First Name"
                     value={this.state.login_password}
                     onChange={this.handleChange} />                  
                  <button
                     type="button"
                     className="btn btn-info"
                     onClick={() => this.sendLoginCred()}>Submit</button>
               </div>
            </div>
         </div>
      );
   }
}

export default SignUp;
