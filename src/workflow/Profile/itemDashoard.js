import React, { Fragment } from 'react';
import request from '../../helpers/helper';

export default class ItemDashboard extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         items: '',
      }
   }

   componentDidMount() {
      request.get('getItem').then((data) => {
         this.setState({
            items: data.documents,
         })
      })
   }

   render() {
      console.log(this.state.items);
      return (
         <Fragment>
            {
               (this.state.items) &&
               <table className="table table-striped">
                  <thead>
                     <tr>
                        <th scope="col">#</th>
                        <th scope="col">Item Name</th>
                        <th scope="col">Item Category</th>
                     </tr>
                  </thead>
                  <tbody>
                     {
                        this.state.items.map((item, index) => {
                           return (
                              <tr key={item.itemName}>
                                 <th scope="row">{index + 1}</th>
                                 <td>{item.itemName}</td>
                                 <td>{item.category}</td>
                              </tr>
                           )
                        })
                     }
                  </tbody>
               </table>
            }
         </Fragment>
      )
   }
}