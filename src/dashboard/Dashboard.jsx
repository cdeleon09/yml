import React, { Component } from 'react';
import Layout from '../layout/Layout';
import Content from './Content';

class Dashboard extends Component {
    render() {
        return (
            <Layout history={this.props.history}>
                <Content />
            </Layout>
        );
    }
}

export default Dashboard;