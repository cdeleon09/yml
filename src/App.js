import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

//ROUTES
import Login from 'pages/login/Login';
import Register from 'pages/login/Register';
import Dashboard from 'pages/dashboard/Dashboard';
import DraftWizard from 'pages/draftWizard/DraftWizard';


class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/dashboard' component={Dashboard} />
                <Route exact path='/draftWizard' component={DraftWizard} />
            </Switch>
        );
    }
}

export default App;