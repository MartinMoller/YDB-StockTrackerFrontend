import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

class StockDetail extends Component {

    constructor(props) {
        super(props);
        this.state = { user: props.username, stock: "empty", userList: [], following: false };
    }

    componentDidMount = async () => {

        //Get the users symbollist if they are logged in.
        if (this.props.LoggedIn) {
            const userList = await this.props.ApiFacade.fetchData("/api/user/" + this.props.username + "/list/", true);
            let symbols = userList.map((stock) => {
                return stock.symbol
            });
            this.setState({ userList: symbols });

        }

        let fetchRes = await this.props.ApiFacade.fetchData("/api/stocks/single/" + this.props.match.params.symbol, false);
        this.setState({ stock: fetchRes });


        this.timerID = setInterval(() => this.tick(),
            5000
        );

        console.log(this.state.stock);
        console.log(this.props);
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

    addStockToFav = async (evt) => {
        evt.preventDefault();
        await this.props.ApiFacade.addStockToFav("/api/user/" + this.props.username + "/add/" + this.props.match.params.symbol, true)
            .then(res => this.setState(this.state));
        console.log("follow state" + this.state.following);
    }

    removeStockFromFav = (evt) => {
        evt.preventDefault();
        this.props.ApiFacade.removeStockFromFav("/api/user/" + this.props.username + "/remove/" + this.props.match.params.symbol, true);
    }

    followButton = () => {
        if (this.props.LoggedIn && this.checkIfUserFollow()) {
            return <form onSubmit={this.addStockToFav}><button>Follow</button></form>
        }
        else if (this.props.LoggedIn && !this.checkIfUserFollow()) {
            return <form onSubmit={this.removeStockFromFav}><button>Unfollow</button></form>
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
            <div>
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

                {console.log(this.state.stock)}
            </div>
        )

    }

}

export default StockDetail;