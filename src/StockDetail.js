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
        else {

        }


        console.log(this.state.username)
        return false;
    }


    render() {
        console.log("USernmae" + this.props.username)
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

                <div className="detailsBox">
                    <table className="detailsTable">
                    <tbody>
                        <tr>
                            <td>Low</td>
                            <td className="stockInfoNumber">{stock.low}</td>
                        </tr>
                        <tr>
                            <td>High</td>
                            <td className="stockInfoNumber">{stock.high}</td>
                        </tr>
                        <tr>
                            <td>Prev. Close</td>
                            <td className="stockInfoNumber">{stock.previousClose}</td>
                        </tr>
                        <tr>
                            <td>Open</td>
                            <td className="stockInfoNumber">{stock.open}</td>
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
                            <td>52 Week Low</td>
                            <td className="stockInfoNumber">{stock.week52Low}</td>
                        </tr>
                        <tr>
                            <td>52 Week High</td>
                            <td className="stockInfoNumber">{stock.week52High}</td>
                        </tr>
                        <tr>
                            <td>Marketcap</td>
                            <td className="stockInfoNumber">{stock.marketCap}</td>
                        </tr>
                        <tr>
                            <td>P/E</td>
                            <td className="stockInfoNumber">{stock.peRatio === null ? "No info" : stock.peRatio}</td>
                        </tr>
                        <tr>
                            <td>YTD</td>
                            <td className="stockInfoNumber">{stock.ytdChange}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                {this.checkIfUserFollow() === true && //If 
                    <h1>Follow this stock</h1>
                }
                {this.checkIfUserFollow() === false && this.props.username !== "" &&  //If 

                    <h1>Unfollow this stock</h1>
                }

                {console.log(this.state.stock)}
            </div>
        )

    }

}

export default StockDetail;