import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

class Home extends Component {
   constructor(props) {
      super(props);
      this.state = {
         data: '',
      }
   }

   componentDidMount() {
      this.callBackendAPI()
         .then(res => this.setState({data: res.documents}))
         .catch(err => console.log(err));
   }

   callBackendAPI = async () => {
      const response = await fetch('/getItem');
      const body = await response.json();

      if (response.status !== 200) {
         throw Error(body.message)
      }
      return body;
   };

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
      console.log(this.state.data);
      return (
         <Fragment>
            <div className="container p-0 mx-auto d-flex justify-content-between">
               <aside className="border rounded" style={{ width: '22%' }}>ASIDE</aside>
               <div className="border rounded d-flex flex-wrap" style={{ width: '75%' }}>
                  { (this.state.data === '')
                  ? null
                  : this.state.data.map((item, i) => {
                        return (
                           <Fragment>
                              <div className="col-sm-3 p-0 rounded border">
                                 {item.itemName}
                              </div>
                           </Fragment>
                        )
                     })
                  }
               </div>
            </div>
            <button onClick={() => this.formRedirection()}>Add</button>
         </Fragment>
      )
   }
}

export default withRouter(Home);