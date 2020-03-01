import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

class Home extends Component {
   constructor(props) {
      super(props);
      this.state = {
         data: '',
      }
   }

   componentWillMount() {
      //
   }

   postRequest(method, url, data) {
      let XHTTP = new XMLHttpRequest();
      XHTTP.open(method, url, true);
      XHTTP.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
      XHTTP.onreadystatechange = () => {
         if (XHTTP.readyState === 4 && XHTTP.status === 200) {
            // let response = JSON.parse(XHTTP);
         }
      }
      XHTTP.send(JSON.stringify(data));
   }

   formRedirection() {
      this.props.history.push('/add');
   }

   render() {
      return (
         <Fragment>
            <div>HOME PAGE</div>
            <button onClick={() => this.formRedirection()}>Add</button>
         </Fragment>
      )
   }
}

export default withRouter(Home);