import React from 'react';
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="App-links">
            <Link className="App-link" to="/">Home</Link>
            <Link className="App-link" to="/about">About</Link>
            <Link className="App-link" to="/contact">Contact</Link>
          </div>
        </header>
        <section className="App-content">
          <Switch>
            <Route path="/about">
              This is the about page!
            </Route>
            <Route path="/contact">
              This is the contact page!
            </Route>
            <Route path="/">
              This is the home page!
            </Route>
          </Switch>
        </section>
      </div>
    </BrowserRouter>
  );
}

export default App;
