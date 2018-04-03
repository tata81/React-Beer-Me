import React, { Component } from 'react';

import Loader from './Loader';
import Beer from './Beer';

class Results extends Component {
    render() {
        if(this.props.isLoading) {
            return <Loader message="🍻 Beer run!" />
        }
        return(
            <div className="beers">
                {this.props.beers.map(details => 
                    <Beer 
                        details={details} 
                        key={details.id} 
                        beers={this.props.beers} 
                        isLoading = {this.props.isLoading}
                    />
                )}                
            </div>
        );
    }
}

export default Results;