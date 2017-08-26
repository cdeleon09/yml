import React, { Component } from 'react';
import Layout from 'pages/layout/Layout';
import Draft from 'pages/draftWizard/Draft';
import Pods from 'pages/draftWizard/Pods';
import Players from 'pages/draftWizard/Players';
import { addDraft, addPods } from 'redux.js';
import { connect } from 'react-redux';

//import TextField from 'material-ui/TextField';
//import Button from 'material-ui/Button';

class DraftWizard extends Component {
    constructor() {
        super();

        this.nextStep = this.nextStep.bind(this);
        this.previousStep = this.previousStep.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            currentStep: 1
        }
    }

    nextStep() { 
        this.setState({ currentStep: this.state.currentStep + 1 }) 
    }

    previousStep() { 
        this.setState({ currentStep: this.state.currentStep - 1 }) 
    }

    onSubmit() {
        console.log(this.props.draft);
        //SAVE CODE HERE
    }

    render() {
        return (
            <Layout history={this.props.history}>
                {this.state.currentStep === 1 && <Draft addDraft={this.props.addDraft} nextStep={this.nextStep} />}
                {this.state.currentStep === 2 && <Pods addPods={this.props.addPods} nextStep={this.nextStep} prevStep={this.previousStep} />}
                {this.state.currentStep === 3 && <Players onSubmit={this.onSubmit} />}
            </Layout>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({  
  draft: state.draft,
});

const mapDispatchToProps = {  
  addDraft,
  addPods
};

const AppContainer = connect(  
  mapStateToProps,
  mapDispatchToProps
)(DraftWizard);

export default AppContainer;