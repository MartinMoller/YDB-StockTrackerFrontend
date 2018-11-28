import React from 'react';


class StockTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { list: [], url: props.url, loggedin: props.loggedin, user: props.username }
    }

    componentDidMount = async () => {
        var list = null;
        if (this.props.username == null) {
             list = await this.props.ApiFacade.fetchData(this.state.url, false);
            this.setState({ list: list });
        } else {
            list = await this.props.ApiFacade.fetchData("/api/user/" + this.state.username + "/list/", true);
            this.setState({ list: list });
        }
    }

    render() {

        return <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>Price</th>
                        <th>+/-</th>
                        {
                            this.state.url && this.state.loggedin && <th>add</th>//this adds an "add" button if we're on home and if the user is logged in
                        }
                    </tr>
                </thead>
                <tbody>
                    {this.state.list.map((el, index) =>
                        <tr key={index}>
                            <td scope="row">{index + 1}</td>
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

export default StockTable;