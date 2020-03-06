/* eslint-disable no-lone-blocks */
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignUp from './workflow/Authenticate/signup'
import Home from './workflow/Search/home'
import Form from './workflow/Search/addForm'
import Details from './workflow/Details/details'
import './styles/body.css'

function App() {
  return (
    <Router>      
      <Route exact path="/" component={SignUp} />
      <Route path="/home" component={Home} />
      <Route path="/add" component={Form} />
      <Route path="/details" component={Details} />
    </Router>
  )
}

export default App;
