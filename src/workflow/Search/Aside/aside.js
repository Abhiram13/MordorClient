import React from 'react';
import TotalItems from './totalItems'
import SearchByName from './searchByName'

export default function Aside(props) {
   return (
      <aside className="border rounded" style={{ width: '22%' }}>
         <TotalItems />
         <SearchByName />
      </aside>
   )
}