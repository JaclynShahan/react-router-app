import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch} from 'react-router-dom';
// import App from './App';
import {Provider} from 'react-redux';
import store from './store';
import Login from './components/Login/Login.js';
import Home from './components/Home/Home';
import Forum from './components/Forum/Header/ForumHeader';
import DrawerForm from './components/Login/DrawerForm';
// import the components you want to use here.

// define the routes below.
export default (
<Provider store={store}>
<Switch>
    <Route exact path="/" component= {Home}/>
    <Route path="/login" component={Login}/>
    <Route path="/forum" component={Forum}/>
</Switch>
</Provider>
);

