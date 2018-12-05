import React from 'react';
import StockTable from './StockTable';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {stockAdded: '' };
    }

    addStockToFav = (stock) => {
        this.props.ApiFacade.addStockToFav("/api/user/" + this.props.username + "/add/" + stock, true)
            .then(json => this.setState({ stockAdded: json }))
    }

    render() {
        return <div className="content">
                <h4>{this.state.stockAdded}</h4>

                <h1>Stocks in Focus</h1>
                <StockTable ApiFacade={this.props.ApiFacade} url="/api/stocks/list/infocus" LoggedIn={this.state.LoggedIn} username={this.state.username}/>
        </div>
    }
}

export default Home;