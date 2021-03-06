import React from 'react';
import { BrowserRouter as Router, NavRouter, Link } from "react-router-dom";

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

    truncate(s, truncLength) {
        let workString = JSON.stringify(s);
        if (workString.length >= truncLength)
            return workString.substring(0, truncLength);
        else
            return workString;
    }
    render() {
        if (Array.isArray(this.state.list)) {
            return <div>
                <table className="stockTable">
                    <thead>
                        <tr>
                            <th className="rowNumber" scope="col">#</th>
                            <th className="symbol">Symbol</th>
                            <th className="companyName">Name</th>
                            <th className="latestPrice">Price</th>
                            <th className="change">+/-</th>
                            <th className="change">%</th>
                            {
                                this.state.url && this.props.LoggedIn && <th>add</th>//this adds an "add" header if we're on home and if the user is logged in
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.list.map((el, index) =>
                            <tr className="hoverEffect" key={index}>
                                <td className="rowNumber">{index + 1}</td>
                                <td className="symbol">{el.symbol}</td>
                                <td className="companyName"><Link to={`/details/${el.symbol}`} className="link">{el.companyName}</Link></td>
                                <td className="latestPrice">${el.latestPrice}</td>
                                <td className={el.change >= 0 ? "change winner" : "change loser"}>{el.change}</td>
                                <td className={el.change >= 0 ? "change winner" : "change loser"}>{this.truncate(el.changePercent*100, 4)}%</td>

                                {
                                    this.state.url && this.state.LoggedIn && <td><button>add</button></td>//this adds an "add" button if we're on home and if the user is logged in
                                }

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