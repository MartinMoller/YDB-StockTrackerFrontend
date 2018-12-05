import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class StockTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { list: [], url: props.url, userList: [] }
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
        if (Array.isArray(this.state.list)) {
            return <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="rowNumber" scope="col">#</th>
                            <th className="symbol">Symbol</th>
                            <th className="companyName">Name</th>
                            <th className="latestPrice">Price</th>
                            <th className="change">+/-</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.list.map((el, index) =>
                            <tr className="hoverEffect" key={index}>
                                <td className="rowNumber" scope="row">{index + 1}</td>
                                <td className="symbol">{el.symbol}</td>
                                <td className="companyName"><Link to={`/details/${el.symbol}`} className="link">{el.companyName}</Link></td>
                                <td className="latestPrice">{el.latestPrice}</td>
                                <td className="change">{el.change}</td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        }
        else {
            return <div>
                <h3>{this.state.list}</h3>
            </div>
        }
    }
}

export default StockTable;