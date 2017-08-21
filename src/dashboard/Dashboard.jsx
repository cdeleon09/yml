import React, { Component } from 'react';
import Layout from '../layout/Layout';
import Content from './Content';

class Dashboard extends Component {
    render() {
        return (
            <Layout>
                <Content />
            </Layout>
        );
    }
}

export default Dashboard;