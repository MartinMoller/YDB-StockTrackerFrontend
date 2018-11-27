import React, { Component } from "react"
import {Redirect} from 'react-router'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password: "" }
    }
    login = (evt) => {
        evt.preventDefault();
        this.props.login(this.state.username, this.state.password);

    }
    onChange = (evt) => {
        this.setState({ [evt.target.id]: evt.target.value })
    }
    render() {
        if (this.props.redirect) {
            return <Redirect exact to="/" />
        }
        else {
            return (
                <div className="container">
                    <h2>Login</h2>
                    <form onSubmit={this.login} onChange={this.onChange} >
                        <input className="form-control" placeholder="User Name" id="username" />
                        <br></br>
                        <input className="form-control" placeholder="Password" id="password" />
                        <br></br>
                        <button className="btn btn-primary">Login</button>
                    </form>
                </div>
            )
        }
    }
}

export default Login;