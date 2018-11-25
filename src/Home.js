import React from 'react';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { gainers: [], losers: [], stockAdded: '' };
    }

    componentDidMount = async () => {
        const gainers = await this.props.ApiFacade.fetchData("/api/stocks/list/gainers", false);
        this.setState({ gainers: gainers });
        const losers = await this.props.ApiFacade.fetchData("/api/stocks/list/losers", false);
        this.setState({ losers: losers });
        console.log(gainers);
    }

    addStockToFav = (stock) => {
        this.props.ApiFacade.addStockToFav("/api/user/" + this.props.username + "/add/" + stock, true)
            .then(json => this.setState({ stockAdded: json }))
    }

    render() {
        return <div className="container">
            <h4>{this.state.stockAdded}</h4>
            <h1 className="text-center">Top gainers</h1>
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
                    {this.state.gainers.map((el, index) =>
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{el.companyName}</td>
                            <td>{el.symbol}</td>
                            <td>{el.latestPrice}</td>
                            <td>{el.change}</td>
                            {this.props.LoggedIn ? <td><button onClick={() => { this.addStockToFav(el.symbol) }} className="btn btn-primary">Add</button></td> : <td></td>}
                        </tr>)}
                </tbody>
            </table>
            <h1 className="text-center">Top losers</h1>
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
                    {this.state.losers.map((el, index) =>
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{el.companyName}</td>
                            <td>{el.symbol}</td>
                            <td>{el.latestPrice}</td>
                            <td>{el.change}</td>
                            {this.props.LoggedIn ? <td><button onClick={() => { this.addStockToFav(el.symbol) }} className="btn btn-primary">Add</button></td> : <td></td>}
                        </tr>)}
                </tbody>
            </table>
        </div>
    }
}

export default Home;