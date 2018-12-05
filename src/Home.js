import React from 'react';
import StockTable from './StockTable';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { gainers: [], losers: [], stockAdded: '' };
    }

    componentDidMount = async () => {
        //const gainers = await this.props.ApiFacade.fetchData("/api/stocks/list/gainers", false);
        //this.setState({ gainers: gainers });
        const losers = await this.props.ApiFacade.fetchData("/api/stocks/list/losers", false);
        this.setState({ losers: losers });
    }

    addStockToFav = (stock) => {
        this.props.ApiFacade.addStockToFav("/api/user/" + this.props.username + "/add/" + stock, true)
            .then(json => this.setState({ stockAdded: json }))
    }

    render() {
        return <div className="content">
            <h4>{this.state.stockAdded}</h4>

            <h1 className="winner">Top gainers</h1>
            <StockTable ApiFacade={this.props.ApiFacade} fromHome={true} url="/api/stocks/list/gainers" LoggedIn={this.props.LoggedIn} username={this.state.username} />

            <h1 className="loser">Top losers</h1>
            <StockTable ApiFacade={this.props.ApiFacade} url="/api/stocks/list/losers" LoggedIn={this.props.LoggedIn} username={this.state.username} />
        </div>
    }
}

export default Home;