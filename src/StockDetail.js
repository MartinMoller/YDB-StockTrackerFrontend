import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { Redirect } from 'react-router';
import { Line } from 'react-chartjs-2';

class StockDetail extends Component {

    constructor(props) {
        super(props);
        this.state = { user: props.username, stock: "empty", userList: [], chartHigh: [] };
    }

    componentDidMount = async () => {

        //Get the users symbollist if they are logged in.
        if (this.props.LoggedIn) {
            const userList = await this.props.ApiFacade.fetchData("/api/user/" + this.props.username + "/symList/", true);
            this.setState({ userList: userList });
        }
        let fetchRes = await this.props.ApiFacade.fetchData("/api/stocks/single/" + this.props.match.params.symbol, false);
        this.setState({ stock: fetchRes });
        let dataFetch = await fetch("https://api.iextrading.com/1.0/stock/" + this.props.match.params.symbol + "/chart");
        let dataJson = await dataFetch.json();
        let highArr = [];
        dataJson.forEach(element => {
            highArr.push(element.high);
        });
        let labels = [];
        dataJson.forEach(el => {
            labels.push(el.date);
        })
        var data = {
            labels: labels,
            datasets: [
                {
                    label: "High",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: highArr
                }
            ]
        };
        this.setState({ chartHigh: data });
        console.log(this.state.chartHigh);
        this.timerID = setInterval(() => this.tick(),
            5000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick = async () => {
        let fetchRes = await this.props.ApiFacade.fetchData("/api/stocks/single/" + this.props.match.params.symbol, false);
        this.setState({
            list: fetchRes
        })
        //console.log("HEJ")
    }

    checkIfUserFollow = () => {
        if (this.props.LoggedIn) {
            return !this.state.userList.includes(this.props.match.params.symbol);
        }
        else {

        }


        //console.log(this.state.username)
        return false;
    }

    addStockToFav = () => {
        this.props.addStockToFav(this.props.match.params.symbol);
        alert("Stock added");
    }

    removeStockFromFav = () => {
        this.props.removeStockFromFav(this.props.match.params.symbol);
        alert("Stock removed");
    }

    truncate(s, truncLength) {
        let workString = JSON.stringify(s);
        if (workString.length >= truncLength)
            return workString.substring(0, truncLength);
        else
            return workString;
    }

    render() {
        //console.log("USernmae" + this.props.username)
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
                <h1>{stock.companyName} ({stock.symbol})</h1>
                <div className="detailsBox">
                    <div className="graphPriceContainer">
                        <div className="graphPriceInfo">
                            < Line data={this.state.chartHigh} />
                            <table className="detailsTable">
                                <tbody>
                                    <tr>
                                        <td>Price</td>
                                        <td className="stockInfoNumber">${stock.latestPrice}</td>
                                    </tr>
                                    <tr>
                                        <td>+/-</td>
                                        <td className="stockInfoNumber">{stock.change}</td>
                                    </tr>
                                    <tr>
                                        <td>Percent Change</td>
                                        <td className="stockInfoNumber">{this.truncate(stock.changePercent * 100, 4)}%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="detailsTableContainer">
                        <table className="detailsTable">
                            <tbody>
                                <tr>
                                    <td>Low</td>
                                    <td className="stockInfoNumber">${stock.low}</td>
                                </tr>
                                <tr>
                                    <td>High</td>
                                    <td className="stockInfoNumber">${stock.high}</td>
                                </tr>
                                <tr>
                                    <td>Prev. Close</td>
                                    <td className="stockInfoNumber">${stock.previousClose}</td>
                                </tr>
                                <tr>
                                    <td>Open</td>
                                    <td className="stockInfoNumber">${stock.open}</td>
                                </tr>
                                <tr>
                                    <td>Volume</td>
                                    <td className="stockInfoNumber">{stock.latestVolume}</td>
                                </tr>
                            </tbody>
                        </table>

                        <table className="detailsTable">
                            <tbody>
                                <tr>
                                    <td>52wk Low</td>
                                    <td className="stockInfoNumber">${stock.week52Low}</td>
                                </tr>
                                <tr>
                                    <td>52wk High</td>
                                    <td className="stockInfoNumber">${stock.week52High}</td>
                                </tr>
                                <tr>
                                    <td>Mkt Cap</td>
                                    <td className="stockInfoNumber">{stock.marketCap}</td>
                                </tr>
                                <tr>
                                    <td>P/E</td>
                                    <td className="stockInfoNumber">{stock.peRatio === null ? "No info" : stock.peRatio}</td>
                                </tr>
                                <tr>
                                    <td>YTD</td>
                                    <td className="stockInfoNumber">{this.truncate(stock.ytdChange, 5)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                {this.checkIfUserFollow() === true && //If 
                    <button className="form-submit hoverEffect" onClick={this.addStockToFav}>Follow</button>
                }
                {this.checkIfUserFollow() === false && this.props.username !== "" &&  //If 
                    <button className="form-submit hoverEffect" onClick={this.removeStockFromFav}>Unfollow</button>
                }
            </div>
        )

    }

}

export default StockDetail;