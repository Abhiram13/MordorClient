import React from 'react';
import { ItemConsumer } from '../../../context/context';

export default function TotalItems(props) {
   return (
      <div className="col-sm p-0 d-flex justify-content-between px-2">
         <p className="m-0 p-0">Total Items</p>
         <ItemConsumer>
            {
               (item) => {
                  return <p className="m-0 p-0"><strong>{item.total}</strong></p>
               }
            }
         </ItemConsumer>         
      </div>
   )
}