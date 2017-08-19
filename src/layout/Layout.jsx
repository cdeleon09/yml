import React, { Component } from 'react';
import Header from './Header';

class Layout extends Component {
    render() {
        return (
            <section id="body-wrapper">
                <Header />
                {this.props.children}
            </section>
        );
    }
}

export default Layout;