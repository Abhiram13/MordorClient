import React, { Component,Fragment } from 'react';

export default class Details extends Component {
   constructor(props) {
      super(props);
      this.state = {
         data: '',
      }
   }

   async componentWillMount() {
      let response = await fetch(`/details/${window.location.search.split('?')[1]}`);
      let body = await response.json();
      
      this.setState({
         data: body.documents[0],
      });
   }

   render() {
      const { data } = this.state;
      return (
         <Fragment>
            <div className="container mx-auto mt-5">
               <div className="col-sm d-flex justify-content-between p-0 inherit">
                  <div className="col-sm-4 p-0">
                     {
                        (data.imageURL !== "")
                        ? <img src={data.imageURL} alt={data.itemName} className="w-100" style={{  height: '350px' }} />
                        : <div className="w-100" style={{ height: '350px', backgroundColor: 'red' }}></div>
                     }                     
                  </div>
                  <div className="col-sm-7 p-0 text-left">
                     <h2 className="m-0"><strong>{data.itemName}<sup style={{ marginLeft: '6px', fontWeight: 500 }}>{data.rating}</sup></strong></h2>
                     <p className="m-0 mb-2 p-0 text-secondary">{data.category}</p>
                     <p className="m-0 p-0">{data.description}</p>
                  </div>
               </div>
            </div>
         </Fragment>
      )
   }
}