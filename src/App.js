import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './landing/Landing';
import Login from './login/Login';
import Register from './login/Register';
import './App.css';

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={Landing} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
            </Switch>
        );
    }
}

export default App;