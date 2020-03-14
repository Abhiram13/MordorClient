/* eslint-disable no-lone-blocks */
import React from 'react';

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
         default:
            return null;
      }
   }

   sendDate() {
      const { username, firstname, lastname, password } = this.state;
      
      if (username && firstname && lastname && password) {
         this.props.create(this.state);
      }
   }

   render() {
      return (
         <div className="container pt-5">
            <div className="col-sm-6 p-0 mx-auto rounded shadow">
               <div className="p-3">
                  <h4 className="pt-2">Sign Up</h4>
                  <hr className="" />
                  <input
                     type="text"
                     id="username"
                     placeholder="User Name"
                     className="d-block col-sm p-0 rounded border p-2 mb-3"
                     value={this.state.username}
                     onChange={this.handleChange} />
                  <input
                     type="text"
                     id="firstname"
                     placeholder="First Name"
                     className="d-block col-sm p-0 rounded border p-2 mb-3"
                     value={this.state.firstname}
                     onChange={this.handleChange} />
                  <input
                     type="text"
                     id="lastname"
                     placeholder="Last Name"
                     className="d-block col-sm p-0 rounded border p-2 mb-3"
                     value={this.state.lastname}
                     onChange={this.handleChange} />
                  <input
                     type="text"
                     id="password"
                     placeholder="Password"
                     className="d-block col-sm p-0 rounded border p-2 mb-3"
                     value={this.state.password}
                     onChange={this.handleChange} />
                  <button
                     type="button"
                     className="btn btn-info d-block mx-auto col-sm-3 py-1"
                     onClick={() => this.sendDate()}>Submit</button>
               </div>
               <p className="text-info text-center m-0 p-0 pointer"><small onClick={() => this.props.exist(true)}>Existing User?</small></p>
            </div>
         </div>
      );
   }
}

export default SignUp;
