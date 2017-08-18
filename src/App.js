import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './login/login';
import Register from './login/register';

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={Login} />    
                <Route exact path='/register' component={Register} />
            </Switch>
        );
    }
}

export default App;