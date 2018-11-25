import React from 'react';


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

        return <div className="container">
            <h1>My list</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th>Ticker</th>
                        <th>Symbol</th>
                        <th>Last price</th>
                        <th>Change</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.myList.map((el, index) =>
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{el.companyName}</td>
                            <td>{el.symbol}</td>
                            <td>{el.latestPrice}</td>
                            <td>{el.change}</td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    }
}

export default MyList;