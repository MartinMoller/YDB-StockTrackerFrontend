import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import './App.css';
import Home from './Home';
import facade from './apiFacade';

class App extends Component {
  constructor() {
    super();
    this.state = { LoggedIn: false };
  }
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <div className="container">
                <NavLink className="navbar-brand" exact to="/">YDB Stock Tracker</NavLink>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <NavLink className="nav-link" exact to="/">Hjem</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/mylist">Min liste</NavLink>
                    </li>
                    {!this.state.loggedIn ? (<li><NavLink className="nav-link" to="/logind">Log ind</NavLink></li>) :
                      (<li>
                        <button className="btn btn-primary" onClick={this.logout}>Logout</button>
                      </li>)}
                  </ul>
                </div>
              </div>
            </nav>
            <Route exact path="/" render={() => <Home ApiFacade={facade} />} />
            {//<Route path="/mylist" render={() => <MyList ApiFacade={facade} />} />
            }
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
