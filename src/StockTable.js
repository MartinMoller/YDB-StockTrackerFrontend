import React from 'react';
import { Link } from "react-router-dom";


class StockTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { list: [], url: props.url, user: props.username }
    }

    componentDidMount = async () => {
        var list = null;
        if (this.props.username == null) {
             list = await this.props.ApiFacade.fetchData(this.state.url, false);
            this.setState({ list: list });
        } else {
            list = await this.props.ApiFacade.fetchData("/api/user/" + this.props.username + "/list/", true);
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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.list.map((el, index) =>
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td><Link to={`/details/${el.symbol}`}>{el.companyName}</Link></td>
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