import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {

    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const searchTerm = this.q.value;
        this.context.router.history.push(`/search/${searchTerm}`);
    }

    render() {
        return(
            <div className="search">
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Hoppy, Mappy..." 
                        ref= {(q) => this.q = q}
                        required
                        />
                    <input type="submit" value="search" />
                </form>
            </div>
        );
    }
}

export default Search;