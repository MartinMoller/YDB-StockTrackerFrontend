import React from 'react';
import { Redirect } from 'react-router'

class CreateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password1: "", password2: "" };
    }

    createUser = (evt) => {
        evt.preventDefault();
        if (this.state.password1 !== this.state.password2) {
            alert("PASSWORDS DON'T MATCH");
        }
        else {
            this.props.createUser(this.state.username, this.state.password1);
        }
    }

    onChange = (evt) => {
        this.setState({ [evt.target.id]: evt.target.value })
    }

    render() {
        if (this.props.redirect) {
            return <Redirect exact to="/" />
        }
        else {
            return <div className="content">
                <form onSubmit={this.createUser} onChange={this.onChange}>
                    <label>Username</label>
                    <br />
                    <input type="text" id="username"></input>
                    <br />
                    <label>Password</label>
                    <br />
                    <input type="text" id="password1"></input>
                    <br />
                    <label>Repeat password</label>
                    <br />
                    <input type="text" id="password2"></input>
                    <br />
                    <button>Create user</button>
                </form>
            </div>
        }
    }
}

export default CreateUser;