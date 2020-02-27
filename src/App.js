/* eslint-disable no-lone-blocks */
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Auth from './workflow/Authenticate/auth'

function App() {
  return (
    <Router>      
      <Route exact path="/" 
      // @ts-ignore
      component={Auth} />
    </Router>
  )
}

export default App;
