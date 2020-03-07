/* eslint-disable no-lone-blocks */
import React, { PureComponent } from 'react';

class Login extends PureComponent {
   constructor(props) {
      super(props);
      this.state = {
         login_username: '',
         login_password: '',
      }
      this.handleChange = this.handleChange.bind(this);
   }

   /**
    * @param {object} event - returns the element by id which triggered the Event
    */
   handleChange = event => {
      switch (event.target.id) {
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

   sendLoginCred() {
      const { login_username, login_password } = this.state;

      if (login_password && login_username) {
         this.props.credentials(this.state);
      }
   }

   render() {
      return (
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
               <p className="text-info text-center m-0 p-0 pointer"><small onClick={() => this.props.newUser(false)}>New User?</small></p>
            </div>
         </div>
      );
   }
}

export default Login;
