import React from 'react';

export default function Aside(props) {
   return (
      <aside className="border rounded" style={{ width: '22%' }}>
         <div className="col-sm p-0 d-flex justify-content-between px-2">
            <p className="m-0 p-0">Total Items</p>
            <p className="m-0 p-0"><strong>{props.total}</strong></p>
         </div>
      </aside>
   )
}