import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

class Draft extends Component {
    constructor() {
        super();

        this.setDraftName = this.setDraftName.bind(this);
        this.onNextClick = this.onNextClick.bind(this);

        this.state = {
            name: ''
        }
    }

    setDraftName(event) {
        this.setState({ name: event.target.value })
    }

    onNextClick() {
        this.props.addDraft({name: this.state.name});
        this.props.nextStep();
    }

    render() {
        return (
            <div className="content">
                <div className="panel">
                    <div className="section-header">Step 1: Create Draft</div>

                    <TextField className="m-t-md" onChange={this.setDraftName} label="Draft Name" />
                    
                    <div className="button">
                        <Button raised className="m-t-md" onClick={this.onNextClick}>Next</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Draft;