import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import './App.css';
import Home from './Home';
import facade from './apiFacade';
import Login from './Login';
import MyList from './MyList';

class App extends Component {
  constructor() {
    super();
    this.state = { LoggedIn: false, username: "" };
  }

  login = (user, pass) => {
    //facade.login(user, pass)
    facade.dummyLogin()
      .then(res => this.setState({ LoggedIn: true, username: "martin" }));
  }

  logout = () => {
    console.log("logout")
    facade.logout();
    this.setState({ LoggedIn: false });
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
                      <NavLink className="nav-link" exact to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/mylist">My list</NavLink>
                    </li>
                    {!this.state.LoggedIn ? (<li><NavLink className="nav-link" to="/login">Log in</NavLink></li>) :
                      (<li>
                        <button className="btn btn-primary" onClick={this.logout}>Logout</button>
                      </li>)}
                  </ul>
                </div>
              </div>
            </nav>
            <Route exact path="/" render={() => <Home username={this.state.username} LoggedIn={this.state.LoggedIn} ApiFacade={facade} />} />
            <Route path="/login" render={() => <Login ApiFacade={facade} login={this.login} />} />
            <Route path="/mylist" render={() => <MyList LoggedIn={this.state.LoggedIn} username={this.state.username} ApiFacade={facade} />} />

          </div>
        </Router>
      </div>
    );
  }
}

export default App;
