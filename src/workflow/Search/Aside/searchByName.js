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

   handleChange(event) {
      this.setState({ 
         value: event.target.value
      }, function() {
         this.props.getValue(this.state.value)
      })
   }

   renderList() {
      return (
         <Fragment>
            {(this.state.value === '') &&
               this.state.array.map((item, i) => {
                  return (
                     <li key={item._id} style={{ listStyleType: 'none' }} className="p-2 border-bottom pointer effect">{item.itemName}</li>
                  )
               })
            }
         </Fragment>
      )
   }

   render() {
      return (
         <Fragment>
            <input
               type="text"
               placeholder="Search By Name"
               className="d-block col-sm-5 p-0 rounded border p-2"
               value={this.state.value}
               onChange={this.handleChange.bind(this)}
            />
            {/*<div className="px-2 shadow">
               {(this.state.array === []) && this.renderList()}
            </div>*/}
         </Fragment>
      )
   }
}