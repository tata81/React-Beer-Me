import React, { Component } from 'react';

import Header from './Header';
import Results from './Results';
import Search from './Search';

class App extends Component {
    state = {
        beers: [],
        loading: true
    }
    componentDidMount() {
        console.log('Mountingg');
        const params = this.props.match.params || {};
        const searchTerm = params.searchTerm || undefined;
        this.loadBeers(searchTerm);
    }

    componentWillReceiveProps(nextProps) {
        console.log('Will recieve props');
        this.loadBeers(nextProps.match.params.searchTerm);
    }

    incrementBeers = () => {
        const beerCount = this.state.numBeers + 1;
        this.setState({
            numBeers : beerCount 
        });
    };

    loadBeers = (searchTerm = "hops") => {
        this.setState({ loading: true });
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
                <Search />
                <Results beers={this.state.beers} isLoading = {this.state.loading} />
            </div>
        );
    }
}

export default App;
