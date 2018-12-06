import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Redirect } from "react-router-dom";
import Home from './Home';
import facade from './apiFacade';
import Login from './Login';
import MyList from './MyList';
import CreateUser from './CreateUser';
import StockDetail from './StockDetail';

class App extends Component {
  constructor() {
    super();
    this.state = { LoggedIn: false, username: "", redirect: false, searchField: "", searchStock: "" };
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

  createUser = (user, pass) => {
    facade.createUser(user, pass)
      .then(res => this.setState({ LoggedIn: true, username: user, redirect: true }))
      .catch(error => alert("Username already exists"));
  }
  handleSearchInput = (event) => {
    this.setState({ searchField: event.target.value });
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    let searchVal = event.target.searchText.value;
    let stock = await facade.fetchData("/api/stocks/single/" + searchVal, false);
    if (stock.symbol === searchVal.toUpperCase()) {
      this.setState({ redirect: true, searchStock: searchVal });
      await this.props.history.push("/details/" + this.state.searchStock);
    } else {
      console.log("FU")
    }

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
                  <form onSubmit={this.handleSubmit}><input id="searchText" className="searchArea" type="text" value={this.state.searchField} onChange={this.handleSearchInput} /><input type="submit" value="Searchasd" /></form>
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
            <Route path="/details/:symbol" render={(props) => <StockDetail {...props} LoggedIn={this.state.LoggedIn} username={this.state.username} ApiFacade={facade} />} />

          </div>
        </Router>
      </div>
    );
  }
}

export default App;