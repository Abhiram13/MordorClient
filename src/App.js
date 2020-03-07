/* eslint-disable no-lone-blocks */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './workflow/Authenticate/signup'
import Home from './workflow/Search/home'
import Form from './workflow/Search/addForm'
import Details from './workflow/Details/details'
import './styles/body.css'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SignUp} />
        <Route path="/home" component={Home} />
        <Route path="/add" component={Form} />
        <Route path="/details" component={Details} />
      </Switch>
    </Router>
  )
}

export default App;
