import React from 'react';
import StockTable from './StockTable';

class MyList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { myList: [] }
    }

    componentDidMount = async () => {
        if (this.props.LoggedIn) {
            const myList = await this.props.ApiFacade.fetchData("/api/user/" + this.props.username + "/list/", true);
            this.setState({ myList: myList });
            console.log(myList);
        }
    }

    render() {

        return <div className="content">
            <h1>My list</h1>
            <StockTable ApiFacade={this.props.ApiFacade} LoggedIn={this.state.LoggedIn} username={this.state.username}/>
        </div>
    }
}

export default MyList;