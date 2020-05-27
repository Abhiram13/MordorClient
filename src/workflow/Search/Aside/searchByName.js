import React, { Fragment } from 'react';
import Input from '../../../helpers/input';

class SearchByName extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         value: '',
         list: '',
         array: [],
      }
   }

   handleChange(value) {
      this.setState({
         value: value,
      }, () => this.props.getValue(this.state.value));
   }

   renderList() {
      return (
         <Fragment>
            {(this.state.value !== '') &&
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
      return <Input type="text" placeholder="Search" class="d-block col-sm-3 p-0 box_shadow border p-2 radius" value={this.handleChange.bind(this)} id="search" />
   }
}

export default SearchByName;