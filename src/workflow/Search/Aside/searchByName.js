/* eslint-disable react/no-direct-mutation-state */
import React, { Fragment } from 'react';

//This is React Hooks Branch
export default class SearchByName extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         value: '',
         list: '',
         array: [],
      }
   }

   componentDidMount() {
      this.callBackendAPI()
         .then(res => this.setState({ list: res.documents }))
         .catch(err => err);
   }

   callBackendAPI = async () => {
      const response = await fetch('/getItem');
      const body = await response.json();

      if (response.status !== 200) {
         throw Error(body.message)
      }
      return body;
   }

   sortList(event) {
      this.state.array = [];

      for (let i = 0; i < this.state.list.length; i++) {
         if (this.state.list[i].itemName.toUpperCase().indexOf(event) === 0) {
            this.state.array.push(this.state.list[i]);
         }
      }
   }

   handleChange(event) {
      this.setState({ value: event.target.value }, () => this.sortList(this.state.value.toUpperCase()))
   }

   renderList() {
      return (
         <Fragment>
            {(this.state.value === '')
               ? null
               : this.state.array.map((item, i) => {
                  return (
                     <li key={item._id} style={{ listStyleType: 'none' }} className="p-2 border-bottom pointer effect">{item.itemName}</li>
                  )
               })
            }
         </Fragment>
      )
   }

   render() {
      console.log(this.state);
      return (
         <Fragment>
            <input
               type="text"
               placeholder="Search By Name"
               className="d-block col-sm p-0 rounded border p-2"
               value={this.state.value}
               onChange={this.handleChange.bind(this)}
            />
            <div className="px-2 shadow">
               {
                  (this.state.array === [])
                  ? null
                  : this.renderList()
               }
            </div>
         </Fragment>
      )
   }
}