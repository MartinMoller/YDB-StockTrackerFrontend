import React, { Component } from 'react';

class StockDetail extends Component {

    constructor(props) {
        super(props);
        this.state = { user: props.username, stock: "empty", userList: [] };
    }

    componentDidMount = async () => {

        //Get the users symbollist if they are logged in.
        if (this.props.LoggedIn) {
            const userList = await this.props.ApiFacade.fetchData("/api/user/" + this.props.username + "/symList/", true);
            if (Array.isArray(userList)) {
                let symbols = userList.map((stock) => {
                    return stock.symbol
                });
                this.setState({ userList: symbols });
            }

        }

        let fetchRes = await this.props.ApiFacade.fetchData("/api/stocks/single/" + this.props.match.params.symbol, false);
        this.setState({ stock: fetchRes });


        this.timerID = setInterval(() => this.tick(),
            5000
        );

        //console.log(this.state.stock);
        //console.log(this.props);
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
                            <img className="graph" src={process.env.PUBLIC_URL + '/images/stock.jpg'} alt="StockImage" />
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
                                    <td className="stockInfoNumber">{this.truncate(stock.changePercent*100,4)}%</td>
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
                    <h1>Follow this stock</h1>
                }
                {this.checkIfUserFollow() === false && this.props.username !== "" &&  //If 

                    <h1>Unfollow this stock</h1>
                }
            </div>
        )

    }

}

export default StockDetail;