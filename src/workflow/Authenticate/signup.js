/* eslint-disable no-lone-blocks */
import React from 'react';
import { withRouter } from 'react-router-dom';

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
         access: false,
      }
      this.handleChange = this.handleChange.bind(this);
   }

   /**
    * @param {object} event - returns the element by id which triggered the Event
    */
   handleChange = event => {
      switch (event.target.id) {
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

   postRequest(method, url, data) {
      let XHTTP = new XMLHttpRequest();
      XHTTP.open(method, url, true);
      XHTTP.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
      XHTTP.onreadystatechange = () => {
         if (XHTTP.readyState === 4 && XHTTP.status === 200) {
            let response = JSON.parse(XHTTP.responseText);
            if (response.access) {
               this.props.history.push('/home');
            }
         }
      }
      XHTTP.send(JSON.stringify(data));
   }

   sendDate() {
      const { username, firstname, lastname, password } = this.state;
      if (username && firstname && lastname && password) {
         return this.postRequest('post', '/signIn.js', this.state);
      }
   }

   sendLoginCred() {
      const { login_username, login_password } = this.state;
      let obj = {
         username: login_username,
         password: login_password,
      }
      if (login_password && login_username) {
         return this.postRequest('post', '/login.js', obj);
      }
   }

   render() {
      return (
         <div className="App">
            <div className="container pt-5">
               <div className="col-sm-6 p-0 mx-auto rounded shadow">
                  <div className="p-3">
                     <h4 className="pt-2">Login</h4>
                     <hr className="" />
                     <input
                        type="text"
                        id="loginusername"
                        className="d-block col-sm p-0 rounded border p-2 mb-3"
                        placeholder="User Name"
                        value={this.state.login_username}
                        onChange={this.handleChange} />
                     <input
                        type="text"
                        id="loginpassword"
                        className="d-block col-sm p-0 rounded border p-2 mb-3"
                        placeholder="Password"
                        value={this.state.login_password}
                        onChange={this.handleChange} />
                     <button
                        type="button"
                        className="btn btn-info d-block mx-auto col-sm-3 py-1"
                        onClick={() => this.sendLoginCred()}>Submit</button>
                  </div>
               </div>
               {/* <div className="d-flex col-sm-5 p-0 justify-content-between">
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
               </div> */}
            </div>
         </div>
      );
   }
}

export default withRouter(SignUp);
