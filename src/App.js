import './App.css';
import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import Register from './register_components/Register';
import Admin from './admin_components/Admin';
import Competition from './game_components/Competition';

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <BrowserRouter>
            <Route exact path='/skymath/register' component={Register}/>
            <Route exact path='/skymath/admin' component={Admin} />
            <Route exact path='/skymath/' component={Competition} />

        </BrowserRouter>
      </React.Fragment>
    )
  }
}
