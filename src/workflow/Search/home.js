// @ts-nocheck
import React, { Fragment, useState, useEffect } from 'react';
import Aside from './Aside/aside'
import { ItemProvider } from '../../context/context'
import { withRouter } from 'react-router-dom';

async function callBackendAPI() {
   const response = await fetch('/getItem');
   const body = await response.json();

   if (response.status !== 200) {
      throw Error(body.message)
   }
   return body;
}

function pushDetails(data, props) {
   props.history.push(`/details?${data._id}`);
   window.location.reload();
}

function Home(props) {
   const [data, setData] = useState('');

   // will be called only in componentDidMount, but not on componentDidUpdate
   useEffect(function () {
      callBackendAPI()
         .then((res) => setData(res.documents))
         .catch((err) => console.log(err));
   }, []);

   return (
      <Fragment>
         <div className="container p-0 mx-auto d-flex justify-content-between mt-5">
            <ItemProvider value={{ total: data.length, data: data }}>
               <Aside />
            </ItemProvider>
            <div className="widthAuto border rounded d-flex flex-wrap" style={{ width: '75%' }}>
               {(data !== '') &&
                  data.map((item, i) => {
                     return (
                        <Fragment key={item._id}>
                           <div
                              className="col-sm-3 p-0 rounded border mr-5 mb-4 pointer effect position-relative"
                              title={`${item.itemName} | ${item.category}`}
                              onClick={() => pushDetails(item, props)}
                              style={{ height: '200px' }}>
                              <div className="rounded w-100 h-100">
                                 {
                                    (item.imageURL === "")
                                       ? <div className="w-100 h-100" style={{ backgroundColor: 'aliceblue' }}></div>
                                       : <img src={item.imageURL} className="w-100 h-100" alt={item.itemName} />
                                 }
                              </div>
                              <div className="d-flex justify-content-between position-absolute bg-white px-2 py-1 shadow" style={{ bottom: '10%', marginLeft: '25%', borderRadius: '20px' }}>
                                 <h5 className="m-0 p-0" style={{ fontSize: 'medium' }}>{item.itemName}</h5>
                                 <img src={item.categoryLogo} width="15" height="15" alt={item.category} className="align-self-center" />
                              </div>                              
                           </div>
                        </Fragment>
                     )
                  })
               }
            </div>
         </div>
         <button onClick={() => props.history.push('/add')}>Add</button>
      </Fragment>
   )
}

export default withRouter(Home);