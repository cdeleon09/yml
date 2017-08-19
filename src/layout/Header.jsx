import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/fish.png';

class Header extends Component {
    render() {
        return (
            <header className="header">
                <div className="header-content">
                    <div className="logo">
                        <img src={logo} className="logoImage" alt="logo" height="50" width="50" />
                        <div className="logoText">DRAW GO</div>
                    </div>
                    <Link to='/login' className="log-in button">LOG IN</Link>
                </div>
            </header>
        );
    }
}

export default Header;