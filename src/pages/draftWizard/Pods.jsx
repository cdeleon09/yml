import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

class Pods extends Component {
    constructor() {
        super();

        this.handlePodNameChange = this.handlePodNameChange.bind(this);
        this.addPod = this.addPod.bind(this);
        this.onNextClick = this.onNextClick.bind(this);

        this.state = {
            podName: '',
            pods: []
        }
    }

    handlePodNameChange(event) {
        this.setState({ podName: event.target.value })
    }

    addPod(event) {
        let pods = this.state.pods;
        let pod = {id: pods.length, name: this.state.podName};
        pods.push(pod);
        this.setState({ pods: pods })
    }

    onNextClick() {
        this.props.addPods({pods: this.state.pods});
        this.props.nextStep();
    }

    render() {
        return (
            <div className="content">
                <div className="panel">
                    <div className="section-header">Step 2: Create Pods</div>

                    <TextField className="m-t-md" onChange={this.handlePodNameChange} label="Pod Name" />
                    <Button raised className="m-t-md" onClick={this.addPod}>Add Pod</Button>

                    <div className="datatable">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Pod Name</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.pods.map(n => {
                                    return (
                                        <TableRow key={n.id}>
                                            <TableCell>
                                                {n.name}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                    
                    <div className="button">
                        <Button raised className="m-t-md" onClick={this.props.prevStep}>Back</Button>
                        <Button raised className="m-t-md" onClick={this.onNextClick}>Next</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Pods;