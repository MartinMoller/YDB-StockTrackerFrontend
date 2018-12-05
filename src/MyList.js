import React from 'react';
import StockTable from './StockTable';
import { Redirect } from 'react-router'

class MyList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { myList: [] }
    }

    componentDidMount = async () => {
        if (this.props.LoggedIn) {
            const myList = await this.props.ApiFacade.fetchData("/api/user/" + this.props.username + "/list", true);
            this.setState({ myList: myList });
            console.log(myList);
        }
    }

    render() {
        if (this.props.LoggedIn === false) {
            return <Redirect exact to="/" />
        }

        return <div className="content">
            <h1>My list</h1>
            <StockTable ApiFacade={this.props.ApiFacade} LoggedIn={this.props.LoggedIn} username={this.props.username} />
        </div>
    }
}

export default MyList;