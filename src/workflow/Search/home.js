// @ts-nocheck
import React, { Component, Fragment } from 'react';
import Aside from './aside'
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

   pushDetails(data) {
      const string = `/details?${data._id}`;
      this.props.history.push({
         pathname: string,
         state: {
            data: data
         },
      });
      window.location.reload();
   }

   render() {
      console.log(this.state.data);
      return (
         <Fragment>
            <div className="container p-0 mx-auto d-flex justify-content-between mt-5">               
               <Aside total={this.state.data.length} />
               <div className="border rounded d-flex flex-wrap" style={{ width: '75%' }}>
                  {(this.state.data !== '') &&
                     this.state.data.map((item, i) => {
                        return (
                           <Fragment key={item._id}>
                              <div className="col-sm-3 p-2 rounded border mr-5 mb-4 pointer effect" onClick={() => this.pushDetails(item)}>
                                 <div className="rounded w-100" style={{ height: '170px' }}>
                                    {
                                       (item.imageURL === "")
                                          ? <div className="w-100 h-100" style={{ backgroundColor: 'red' }}></div>
                                          : <img src={item.imageURL} className="w-100 h-100" alt={item.itemName} />
                                    }
                                 </div>
                                 <h5 className="m-0 p-0 mt-2">{item.itemName}</h5>
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