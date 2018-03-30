import React, { Component } from 'react';

import Header from './Header';
import Results from './Results';

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
        // Check for beers in local storage
        const localStorageBeers = localStorage.getItem(`search-${searchTerm}`);
        if(localStorageBeers) {
            const localBeers = JSON.parse(localStorageBeers);
            this.setState({ beers: localBeers, loading:false });
            return;
        }

        fetch(`http://api.react.beer/v2/search?q=${searchTerm}&type=beer`)
        .then(data => data.json())
        .then(beers => {
            // Filter for beers with images
            const filteredBeers = beers.data.filter(beer => !!beer.labels);
            this.setState({
                beers: filteredBeers,
                loading: false
            });
            localStorage.setItem(`searchTerm-${searchTerm}`, JSON.stringify(this.state.beers));
        })
        .catch(err => console.log(err));
    };


    render() {
        return (
            <div className="app_root">
                <Header />
                <button onClick={this.incrementBeers}>{this.state.numBeers}</button>
                <Results beers={this.state.beers} />
            </div>
        );
    }
}

export default App;
