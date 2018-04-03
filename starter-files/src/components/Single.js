import React, { Component } from 'react';

import Loader from './Loader';
import Header from './Header';

class Single extends Component {
    state = {
        beers: [],
        loading: true
    }    

    componentDidMount() {
        console.log(`searching for ${this.props.match.params.beerId}`);
        this.loadBeers(this.props.match.params.beerId);
    }

    loadBeers= (beerId) => {
        this.setState({loading: true});
        fetch(`http://api.react.beer/v2/beer/${beerId}`)
            .then(data => data.json())
            .then(res => {
                this.setState({ beer:res.data, loading:false })
            })
            .catch(err => console.log(err));
            
    };

    render() {
        if (this.state.loading) {
            return <Loader message="Pouring a cold one!" />;
        }
        const {beer} = this.state;

        return(
            <div>
                <Header siteName= "Beer Me!" />
                <div className="single-beer">
                    <div className="desc">
                        <h2>{beer.name}</h2>
                        <img className="label" src={beer.labels.large? beer.labels.large : beer.labels.medium} />
                        <p>{beer.description ? beer.description : beer.style.description}</p>
                    </div>            
                </div>                
            </div>
        );
    }
}

export default Single;