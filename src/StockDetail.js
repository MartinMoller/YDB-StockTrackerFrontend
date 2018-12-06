import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { Redirect } from 'react-router';

class StockDetail extends Component {

    constructor(props) {
        super(props);
        this.state = { user: props.username, stock: "empty", userList: [], stockAdded: "" };
    }

    componentDidMount = async () => {

        //Get the users symbollist if they are logged in.
        if (this.props.LoggedIn) {
            const userList = await this.props.ApiFacade.fetchData("/api/user/" + this.props.username + "/list/", true);
            let symbols = userList.map((stock) => {
                return stock.symbol
            });
            this.setState({ userList: symbols });
            console.log("symbollist" + symbols);

        }

        let fetchRes = await this.props.ApiFacade.fetchData("/api/stocks/single/" + this.props.match.params.symbol, false);
        this.setState({ stock: fetchRes });


        this.timerID = setInterval(() => this.tick(),
            5000
        );

        console.log(this.state.stock);
        console.log(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({stockAdded: nextProps.stockAdded});
      }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick = async () => {
        let fetchRes = await this.props.ApiFacade.fetchData("/api/stocks/single/" + this.props.match.params.symbol, false);
        this.setState({
            list: fetchRes
        })
        console.log("HEJ")
    }

    checkIfUserFollow = () => {
        if (this.props.LoggedIn) {
            return !this.state.userList.includes(this.props.match.params.symbol);
        }


        console.log(this.state.username)
        return false;
    }

    addStockToFav = () => {
        this.props.addStockToFav(this.props.match.params.symbol);
    }

    removeStockFromFav = () => {
        this.props.removeStockFromFav(this.props.match.params.symbol);
    }

    followButton = () => {
        if (this.props.LoggedIn && this.checkIfUserFollow()) {
            return <button className="form-submit hoverEffect" onClick={this.addStockToFav}>Follow</button>
        }
        else if (this.props.LoggedIn && !this.checkIfUserFollow()) {
            return <button className="form-submit hoverEffect" onClick={this.removeStockFromFav}>Unfollow</button>
        }
        else return null;
    }


    render() {
        if (this.state.stock === "empty") {
            return (
                <div>
                    <h2>Loading...</h2>
                </div>
            )
        }

        const stock = this.state.stock;
        return (

            < div >
                <h1>{stock.companyName}</h1>
                <h3>{stock.symbol}</h3>




                <img src={process.env.PUBLIC_URL + '/images/stock.jpg'} alt="StockImage" style={{ width: 500, height: 300 }} />

                <table className="table">
                    <thead>
                        <tr>
                            <th className="symbol">Symbol</th>
                            <th className="latestPrice">Price</th>
                            <th className="change">+/-</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr className="hoverEffect" key={stock.name}>
                            <td className="symbol">{stock.symbol}</td>
                            <td className="latestPrice">{stock.latestPrice}</td>
                            <td className="change">{stock.change}</td>

                        </tr>
                    </tbody>
                </table>
                <this.followButton />
                <h4>{this.props.stockAdded}</h4>

                {console.log(this.state.stock)}
            </div >
        )

    }

}

export default StockDetail;