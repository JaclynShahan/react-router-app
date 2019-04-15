import React from 'react';
import {Route, Switch} from 'react-router-dom';
// import App from './App';
import Login from './Login.js'
import Home from './Home'
// import the components you want to use here.

// define the routes below.
export default (
<Switch>
    <Route exact path="/" component= {Home}/>
    <Route path="/login" component={Login}/>
</Switch>
);