import React, { Component } from 'react';

import Header from './Header';

class App extends Component {
    state = {
        numBeers : 10,
        beers: []
    }
    componentDidMount() {
        this.loadBeers();
    }

    incrementBeers = () => {
        const beerCount = this.state.numBeers + 1;
        this.setState({
            numBeers : beerCount 
        });
    };

    loadBeers = (searchTerm = "hops") => {
        fetch(`http://api.react.beer/v2/search?q=${searchTerm}&type=beer`)
        .then(data => data.json())
        .then(beers => {
            // Filter for beers with images
            
            this.setState({
                beers: beers
            });
        })
    }


    render() {
        return (
            <div className="app_root">
                <button onClick={this.incrementBeers}>{this.state.numBeers}</button>
                <Header />
            </div>
        );
    }
}

export default App;
