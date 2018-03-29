import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import App from './App';
import Single from './Single';
import NotFound from './NotFound';

const Router = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route  exact path="/" component={App} />
                <Route path="/search/:searchTerm" component={App} />
                <Route path="/beer/:beerId/:beerSlug" component={Single} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    );    
};

export default Router;