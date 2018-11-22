import React from 'react';

class Home extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <div className="container">
        <h1 className="text-center">Top stocks</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Ticker</th>
                        <th>Symbol</th>
                        <th>Last price</th>
                        <th>Change</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Google</td>
                        <td>GOOG</td>
                        <td>243,52</td>
                        <td>+5,02</td>
                    </tr>
                    <tr>
                        <td>Amazon</td>
                        <td>AMZN</td>
                        <td>1984,22</td>
                        <td>+39,64</td>
                    </tr>
                    <tr>
                        <td>Facebook</td>
                        <td>FB</td>
                        <td>364,43</td>
                        <td>-10,42</td>
                    </tr>
                    <tr>
                        <td>Hitachi</td>
                        <td>HTHIY</td>
                        <td>3577,52</td>
                        <td>+70,3</td>
                    </tr>
                    <tr>
                        <td>Microsoft</td>
                        <td>MSFT</td>
                        <td>4403,22</td>
                        <td>+1,44</td>
                    </tr>
                </tbody>
            </table>
        </div>
    }
}

export default Home;