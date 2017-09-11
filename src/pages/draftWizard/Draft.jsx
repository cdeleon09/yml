import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

const style = {
    full: {
        width: '100%'
    },
    half: {
        width: '50%'
    },
    tableHeader: {
        height: '40px',
        fontSize: '18px',
        fontWeight: '300',
        color: '#000000',
        backgroundColor: '#eeeeee'
    }
}

class Draft extends Component {
    constructor() {
        super();

        this.handleDraftNameChange = this.handleDraftNameChange.bind(this);
        this.handlePodNameChange = this.handlePodNameChange.bind(this);
        this.handleAddPodClick = this.handleAddPodClick.bind(this);
        this.handleNextClick = this.handleNextClick.bind(this);

        this.state = {
            name: '',
            podName: '',
            pods: [],
            errorMsg: ''
        }
    }

    handleDraftNameChange(event) {
        this.setState({ name: event.target.value });
    }

    handlePodNameChange(event) {
        this.setState({ podName: event.target.value })
    }

    handleAddPodClick(event) {
        if (this.state.podName !== '') {
            let pods = this.state.pods;
            let pod = {id: pods.length, name: this.state.podName};
            pods.push(pod);
            this.setState({ podName: '', pods: pods })
        } else {
            this.setState({ errorMsg: 'Invalid pod name.' });
        }
    }

    handleNextClick(event) {
        event.preventDefault();

        if (this.state.name === '') {
            this.setState({ errorMsg: 'Invalid draft name.' });
        } else if (this.state.pods.length === 0) {
            this.setState({ errorMsg: 'Draft must have at least one pod.' });
        } else {
            this.props.addDraft(this.state.name, this.state.pods);
            this.props.nextStep();
        }
    }

    render() {
        return (
            <div className="content flex-center full-height">
                <div className="panel-wizard-main">
                    <form className="panel-wizard-form" onSubmit={this.handleNextClick}>
                        <div className="panel-wizard-header">
                            Create Draft
                        </div>
                        <div className="panel-wizard-content">
                            {this.state.errorMsg !== '' && <div className="p-t-lg m-b-sm color-red">{this.state.errorMsg}</div>}
                            <div className="flex-row flex-sb p-t-lg">
                                <div className="flex-1">
                                    <TextField 
                                        autoFocus
                                        style={style.full}
                                        onChange={this.handleDraftNameChange} 
                                        label="Draft Name" 
                                    />
                                </div>
                                <div className="flex-col m-l-lg flex-1">
                                    <TextField
                                        style={style.full}
                                        value={this.state.podName} 
                                        onChange={this.handlePodNameChange} 
                                        label="Pod Name" 
                                    />
                                    <Button
                                        raised
                                        style={style.half}
                                        className="m-t-md"
                                        onClick={this.handleAddPodClick}>
                                        Add Pod
                                    </Button>
                                </div>
                                <div className="m-l-lg flex-1">
                                    <div className="datatable">
                                        <Table>
                                            <TableHead>
                                                <TableRow style={style.tableHeader}>
                                                    <TableCell>Pods</TableCell>
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
                                </div>
                            </div>
                        </div>
                        <div className="panel-wizard-footer">
                            <Button raised type="submit">Next</Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Draft;