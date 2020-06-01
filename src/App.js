/* eslint-disable no-lone-blocks */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from './workflow/Authenticate/auth';
import Home from './workflow/Search/home';
import Form from './workflow/Search/addForm';
import Details from './workflow/Details/details';
import Profile from './workflow/Profile/profile';
import './styles/body.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Auth} />
        <Route path="/home" component={Home} />        
        <Route path="/profile" component={Profile} />
        <Route path="/:id/details" component={Details} />
        <Route path="/add" component={Form} />
      </Switch>
    </Router>
  )
}

export default App;
