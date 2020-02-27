/* eslint-disable no-lone-blocks */
import React from 'react';
import postRequest from '../../helpers/helper';

class SignUp extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         nameValue: '',
         secondNameValue: '',
      }
      this.handleChange = this.handleChange.bind(this);
   }

   /**
    * @param {object} event - returns the element by id which triggered the Event
    */
   handleChange = event => {
      if (event.target.id === 'name') {
         this.setState({ nameValue: event.target.value })
      } else {
         this.setState({ secondNameValue: event.target.value })
      }
   }

   sendDate() {
      if (this.state.nameValue && this.state.secondNameValue) {
         return postRequest('post', '/app.js', this.state);
      }
   }

   render() {
      return (
         <div className="App">
            <div className="container pt-5">
               <div className="d-flex col-sm-5 p-0 justify-content-between">
                  <input type="text" id="name" value={this.state.nameValue} onChange={this.handleChange} />
                  <input type="text" id="secondName" value={this.state.secondNameValue} onChange={this.handleChange} />
                  <button type="button" className="btn btn-info" onClick={() => this.sendDate()}>Submit</button>
               </div>
            </div>
         </div>
      );
   }
}

export default SignUp;
