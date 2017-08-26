import React, { Component } from 'react';
import Header from 'pages/layout/Header';

class Layout extends Component {
    render() {
        return (
            <section id="body-wrapper">
                <Header history={this.props.history} />
                {this.props.children}
            </section>
        );
    }
}

export default Layout;