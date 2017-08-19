import React, { Component } from 'react';
import Layout from '../layout/Layout';
import Content from './Content';

class Landing extends Component {
    render() {
        return (
            <Layout>
                <Content />
            </Layout>
        );
    }
}

export default Landing;