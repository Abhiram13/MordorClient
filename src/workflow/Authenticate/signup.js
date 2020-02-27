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
         default:
            return null;
      }
   }

   sendDate() {
      const { username, firstname, lastname, password } = this.state;
      if (username && firstname && lastname && password) {
         return postRequest('post', '/app.js', this.state);
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
            </div>
         </div>
      );
   }
}

export default SignUp;
