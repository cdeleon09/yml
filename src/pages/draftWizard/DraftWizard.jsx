import React, { Component } from 'react';
import Layout from 'pages/layout/Layout';
import Draft from 'pages/draftWizard/Draft';
import Players from 'pages/draftWizard/Players';
import { addDraft, addPlayers } from 'redux.js';
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
        
        fetch('http://localhost:3001/drafts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                draft: this.props.draft
            })
        }).then(function() {
            console.log('Draft created.');
        })
    }

    render() {
        return (
            <Layout history={this.props.history}>
                {this.state.currentStep === 1 && 
                    <Draft 
                        addDraft={this.props.addDraft} 
                        addPods={this.props.addPods}
                        nextStep={this.nextStep} 
                    />
                }
                {this.state.currentStep === 2 && 
                    <Players 
                        draft={this.props.draft} 
                        addPlayers={this.props.addPlayers} 
                        onSubmit={this.onSubmit} 
                        prevStep={this.previousStep} 
                    />
                }
            </Layout>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({  
  draft: state.draft,
});

const mapDispatchToProps = {  
  addDraft,
  addPlayers
};

const AppContainer = connect(  
  mapStateToProps,
  mapDispatchToProps
)(DraftWizard);

export default AppContainer;