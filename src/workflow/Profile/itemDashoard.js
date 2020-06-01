import React, { Fragment } from 'react';
import request, { getUser } from '../../helpers/helper';

export default class ItemDashboard extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         items: [],
         user: {},
         deletableItems: [],
      }
   }

   componentDidMount() {
      request.get('getItem').then((data) => {
         request.get(`${getUser()}/home`).then((response) => {
            this.setState({
               items: data.documents,
               user: response[0],
            })
         })
      })
   }

   selectItems(event) {
      event.persist();      
      var array = this.state.deletableItems;
      var id = event.target.getAttribute('data-id');

      if (event.target.nodeName !== 'DIV') return;

      if (event.target.getAttribute('data-selected') === 'false') {
         event.target.setAttribute('data-selected', 'true');
         event.target.className = 'd-flex justify-content-between col-sm p-0 bg-primary';
         array.push(id);
         this.setState({
            deletableItems: array,
         });
      } else {
         event.target.setAttribute('data-selected', 'false');
         event.target.className = 'd-flex justify-content-between col-sm p-0';
         let index = array.indexOf(id);
         array.splice(index, 1);
         this.setState({
            deletableItems: array,
         })
      }
   }

   delete() {
      request.post('deleteItem.js', this.state.deletableItems, (xhttp) => {
         if (xhttp.response === 'true') {
            request.get('getItem').then((data) => {
               this.setState({
                  items: data.documents,
               })
            })
            return;
         }

         alert('Error has Occured. Please try again later');
      })
   }

   render() {
      return (
         <Fragment>
            {
               (this.state.items) &&
               <Fragment>
                  {
                     this.state.user.isAdmin && 
                     <Fragment>
                        <button onClick={() => this.delete()}>Delete Item</button>
                        <button onClick={() => window.location.assign('/add')}>Add Item</button>                        
                     </Fragment>                     
                  }

                  <div className="row mb-4">
                     <div className="d-flex justify-content-between col-sm p-0">
                        <p className="p-0 m-0"><strong>#</strong></p>
                        <p className="p-0 m-0"><strong>Item Name</strong></p>
                        <p className="p-0 m-0"><strong>Item Category</strong></p>
                     </div>
                  </div>                  
                  {
                        this.state.items.map((item, index) => {
                           return (
                              <div className="row mb-3" key={item.itemName} onClick={(e) => this.selectItems(e)}>
                                 <div className="d-flex justify-content-between col-sm p-0" data-selected="false" data-id={item._id}>
                                    <p className="p-0 m-0">{index + 1}</p>
                                    <p className="p-0 m-0">{item.itemName}</p>
                                    <p className="p-0 m-0">{item.category}</p>
                                 </div>
                              </div>
                           )
                        })
                     }
               </Fragment>
            }
         </Fragment>
      )
   }
}