import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Home from './Home';
import facade from './apiFacade';
import Login from './Login';
import MyList from './MyList';
import CreateUser from './CreateUser';

class App extends Component {
  constructor() {
    super();
    this.state = { LoggedIn: false, username: "", redirect: false };
  }

  login = (user, pass) => {
    facade.login(user, pass)
      //facade.dummyLogin()
      .then(res => this.setState({ LoggedIn: true, username: user, redirect: true }));
  }

  logout = () => {
    facade.logout();
    this.setState({ LoggedIn: false, redirect: false });
  }

  createUser = (user, pass) => {
    facade.createUser(user, pass)
      .then(res => this.setState({ LoggedIn: true, username: user, redirect: true }));
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <nav className="header">
              <div className="nav-content">
                <div className="nav-item">
                  <NavLink className="nav-link navbar-brand" exact to="/">YDB Stock Tracker</NavLink>
                </div>
                <ul>
                  <div className="header-nav">
                    <li className="nav-item">
                      <NavLink className="nav-link" exact to="/">Home</NavLink>
                    </li>
                    {this.state.LoggedIn ? (<li><NavLink className="nav-link" to="/mylist">My list</NavLink></li>) :
                      (<li></li>)}
                    {!this.state.LoggedIn ? (<li><NavLink className="nav-link" to="/login">Log in</NavLink></li>) :
                      (<li>
                        <button className="btn btn-primary" onClick={this.logout}>Logout</button>
                      </li>)}

                  </div>
                </ul>
              </div>
            </nav>
            <Route exact path="/" render={() => <Home username={this.state.username} LoggedIn={this.state.LoggedIn} ApiFacade={facade} />} />
            <Route path="/login" render={() => <Login redirect={this.state.redirect} login={this.login} />} />
            <Route path="/mylist" render={() => <MyList LoggedIn={this.state.LoggedIn} username={this.state.username} ApiFacade={facade} />} />
            <Route path="/createuser" render={() => <CreateUser redirect={this.state.redirect} createUser={this.createUser} />} />

          </div>
        </Router>
      </div>
    );
  }
}

export default App;
