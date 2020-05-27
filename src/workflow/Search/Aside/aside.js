import React from 'react';
import TotalItems from './totalItems';
import SearchByName from './searchByName';

const Aside = (props) => {
   return (
      <aside className="d-flex justify-content-between">
         <TotalItems />
         <SearchByName getValue={props.getValueForSearch} />
      </aside>
   )
}

export default Aside;