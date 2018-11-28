import React, { Component } from 'react';
import ApiFacade from './apiFacade'

class StockDetail extends Component {

    constructor(props) {
        super(props);
        this.state = { user: props.username, stock: "Empty" };
    }

    componentDidMount = async() => {
        
        let fetchRes = await this.props.ApiFacade.fetchData("/api/user/" + this.props.username + "/list/", true);
        this.setState({ stock: fetchRes });
        console.log(this.state.stock);
    }


    render() {
        return(
            <div>
                
            </div>
        )
    }

}

export default StockDetail;