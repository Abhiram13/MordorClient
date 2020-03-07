import React, { Component, Fragment } from 'react';

export default class Aside extends Component {
   constructor(props) {
      super(props);
   }

   render() {
      return (
         <aside className="border rounded" style={{ width: '22%' }}>
            <div className="col-sm p-0 d-flex justify-content-between px-2">
               <p className="m-0 p-0">Total Items</p>
               <p className="m-0 p-0"><strong>{this.props.total}</strong></p>
            </div>
         </aside>
      )
   }
}