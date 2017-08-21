import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/fish.png';

class Header extends Component {
    constructor() {
        super();

        this.handleLogOut = this.handleLogOut.bind(this);
    }

    handleLogOut(event) {
        event.preventDefault();

        fetch('http://localhost:3001/logout', {
            method: 'GET',
            credentials: 'include',
        }).then(function(response) {
            this.props.history.push(`/login`);
        }.bind(this))
    }

    render() {
        return (
            <header className="header">
                <div className="header-content">
                    <div className="logo">
                        <img src={logo} className="logoImage" alt="logo" height="50" width="50" />
                        <div className="logoText"><Link to='/dashboard'>DRAW GO</Link></div>
                    </div>

                    <a href="/login" className="log-out button" onClick={this.handleLogOut}>LOG OUT</a>
                </div>
            </header>
        );
    }
}

export default Header;