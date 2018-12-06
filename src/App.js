import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Home from './Home';
import facade from './apiFacade';
import Login from './Login';
import MyList from './MyList';
import CreateUser from './CreateUser';
import StockDetail from './StockDetail';

class App extends Component {
  constructor() {
    super();
    this.state = { LoggedIn: false, username: "", redirect: false, stockAdded: "" };
  }

  login = (user, pass) => {
    facade.login(user, pass)
      //facade.dummyLogin()
      .then(res => this.setState({ LoggedIn: true, username: user, redirect: true }))
      .catch(error => alert("Invalid username or password"));
  }

  logout = () => {
    facade.logout();
    this.setState({ LoggedIn: false, redirect: false });
  }


  addStockToFav = (symbol) => {
    facade.addStockToFav("/api/user/" + this.state.username + "/add/" + symbol, true)
      .then(res => this.setState({ stockAdded: "Stock added" }));

  }

  removeStockFromFav = (symbol) => {
    facade.removeStockFromFav("/api/user/" + this.state.username + "/remove/" + symbol, true)
      .then(res => this.setState({ stockAdded: "Stock removed" }));
  }

  createUser = (user, pass) => {
    facade.createUser(user, pass)
      .then(res => this.setState({ LoggedIn: true, username: user, redirect: true }))
      .catch(error => alert("Username already exists"));
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <nav className="header">
              <div className="nav-content">
                <div>
                  <NavLink className="nav-link navbar-brand" exact to="/">YDB Stock Tracker</NavLink>
                </div>
                <div className="header-nav">
                  <ul>
                    <li className="nav-item hoverEffect">
                      <NavLink className="nav-link" exact to="/">Home</NavLink>
                    </li>
                    <li className="nav-item hoverEffect">
                      {this.state.LoggedIn && <NavLink className="nav-link" to="/mylist">My list</NavLink>}
                    </li>
                    <li className="nav-item hoverEffect">
                      {!this.state.LoggedIn ? (<NavLink className="nav-link" to="/login">Log in</NavLink>) :
                        <button className="logout nav-link" onClick={this.logout}>Logout</button>}
                    </li>
                  </ul>
                </div>

              </div>
            </nav>
            <Route exact path="/" render={() => <Home username={this.state.username} LoggedIn={this.state.LoggedIn} ApiFacade={facade} />} />
            <Route path="/login" render={() => <Login redirect={this.state.redirect} login={this.login} />} />
            <Route path="/mylist" render={() => <MyList LoggedIn={this.state.LoggedIn} username={this.state.username} ApiFacade={facade} />} />
            <Route path="/createuser" render={() => <CreateUser redirect={this.state.redirect} createUser={this.createUser} />} />
            <Route path="/details/:symbol" render={(props) => <StockDetail {...props} addStockToFav={this.addStockToFav} stockAdded={this.state.stockAdded} removeStockFromFav={this.removeStockFromFav} LoggedIn={this.state.LoggedIn} username={this.state.username} ApiFacade={facade} />} />

          </div>
        </Router>
      </div>
    );
  }
}

export default App;
