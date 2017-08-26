import React, { Component } from 'react';
import Layout from 'pages/layout/Layout';
import Content from 'pages/dashboard/Content';

class Dashboard extends Component {
    render() {
        return (
            <Layout history={this.props.history}>
                <Content history={this.props.history} />
            </Layout>
        );
    }
}

export default Dashboard;