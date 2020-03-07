import React from 'react';
import TotalItems from './totalItems'

export default function Aside(props) {
   return (
      <aside className="border rounded" style={{ width: '22%' }}>
         <TotalItems />
      </aside>
   )
}