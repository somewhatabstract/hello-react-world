import React from 'react';
import {Link, Route, Switch} from "react-router-dom";
import Router from "./Router.js";
import SpinningLogo from "./SpinningLogo.js";
import './App.css';

function App(props) {
  const {ssrLocation} = props;
  return (
    <Router ssrLocation={ssrLocation}>
      <div className="App">
        <header className="App-header">
          <SpinningLogo />
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
    </Router>
  );
}

export default App;
