import React from 'react';
import { ItemConsumer } from '../../../context/context';

export default function TotalItems(props) {
   return (
      <div className="col-sm-2 p-0 d-flex justify-content-between">
         <p className="m-0 p-0 align-self-center">Total Items</p>
         <ItemConsumer>
            {
               (item) => {
                  return <p className="m-0 p-0 align-self-center"><strong>{item.total}</strong></p>
               }
            }
         </ItemConsumer>         
      </div>
   )
}