import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './login/Login';
import Register from './login/Register';
import Dashboard from './dashboard/Dashboard';
import './App.css';

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/dashboard' component={Dashboard} />
            </Switch>
        );
    }
}

export default App;