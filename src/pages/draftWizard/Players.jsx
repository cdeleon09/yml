import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

const style = {
    width: '400px'
};

class AddButton extends Component {
    handleClick = () => {
        this.props.handleOpenModal(this.props.pod);
    }

    render() {
        return (
            <Button raised onClick={this.handleClick}>Add Player</Button>
        );
    }
}

class UserModal extends React.Component {
    constructor() {
        super();

        this.handleClose = this.handleClose.bind(this);
        this.handleSelectAndClose = this.handleSelectAndClose.bind(this);
    }

    handleClose() {
        this.props.handleCloseModal();
    };

    handleSelectAndClose() {
        this.props.handleSelectAndCloseModal();
    }

    render() {
        let open = this.props.open;

        return (
            <Dialog onRequestClose={this.handleClose} open={open}>
                <DialogTitle style={style}>Select Players</DialogTitle>
                <div>
                    <List dense disablePadding>
                        {this.props.users.map(user => (
                            <ListItem divider onClick={event => this.props.handleToggle(event, user)} key={user._id}>
                                <Checkbox
                                    checked={this.props.checked.indexOf(user) !== -1}
                                    tabIndex="-1"
                                    disableRipple
                                />
                                <ListItemText primary={user.firstName + ' ' + user.lastName} />
                            </ListItem>
                        ))}
                    </List>
                    <div className="flex-row flex-sb">
                        <Button disableFocusRipple disableRipple color="primary" className="m-t-md m-b-md m-l-md" onClick={this.handleSelectAndClose}>Select</Button>
                        <Button disableFocusRipple disableRipple color="accent" onClick={this.handleClose}>Close</Button>
                    </div>
                </div>
            </Dialog>
        );
    }
}

class Players extends Component {
    constructor() {
        super();

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleSelectAndCloseModal = this.handleSelectAndCloseModal.bind(this);

        this.state = {
            users: [],
            filteredUsers: [],
            open: false,
            currentPod: {},
            checked: [],
        }
    }

    componentWillMount() {
        fetch('http://localhost:3001/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(json => {
            this.setState({
                users: json
            });
        });
    }

    handleToggle = (event, value) => {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value); //ADD - Check.
        } else {
            newChecked.splice(currentIndex, 1); //REMOVE - Uncheck.
        }

        this.setState({
            checked: newChecked,
        });
    };

    handleOpenModal(pod) {
        let filteredUsers = this.state.users.slice(0);
        let pods = this.props.draft.pods;
        let selectedUsers = [];

        for (var i = 0; i < pods.length; i++) {
            //If user is selected in other pods, remove it from the list.
            //If user is selected in this pod, check it.
            if (pods[i] !== pod && pods[i].players !== undefined) {
                for (var j = 0; j < pods[i].players.length; j++) {
                    let index = filteredUsers.indexOf(pods[i].players[j]);
                    if (index !== -1) { filteredUsers.splice(index, 1); }
                }
            } else if (pods[i] === pod && pods[i].players !== undefined) {
                for (var k = 0; k < pods[i].players.length; k++) {
                    selectedUsers.push(pods[i].players[k]);
                }
            }
        }
        
        this.setState({ 
            open: true, 
            currentPod: pod,
            filteredUsers: filteredUsers,
            checked: selectedUsers
        });
    }

    handleCloseModal() {
        this.setState({ 
            open: false,
            checked: [] 
        });
    };

    handleSelectAndCloseModal() {
        this.props.addPlayers(this.state.currentPod, this.state.checked)
        
        this.setState({ 
            open: false,
            checked: [] 
        });
    }

    render() {
        let pods = this.props.draft.pods;

        return (
            <section className="content flex-center full-height">
                <div className="panel-wizard-main">
                    <div className="panel-wizard-header">
                        Select Players
                    </div>
                    <div className="panel-wizard-content flex-row">
                        {pods.map(pod => {
                            return (
                                <div className="datatable datatable-wizard m-r-lg m-b-lg" key={pod.id}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>
                                                    {pod.name}
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {pod.players !== undefined && pod.players.map(player => {
                                                return (
                                                    <TableRow key={player._id}>
                                                        <TableCell>   
                                                            {player.firstName} {player.lastName}
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                            <TableRow>
                                                <TableCell>   
                                                    <AddButton handleOpenModal={this.handleOpenModal} pod={pod} />
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                            );
                        })}
                    </div>
                    <div className="panel-wizard-footer">
                        <Button raised onClick={this.props.prevStep}>Back</Button>
                        <Button raised className="m-l-md" onClick={this.props.onSubmit}>Finish</Button>
                    </div>

                    <UserModal
                        addPlayers={this.props.addPlayers}
                        open={this.state.open}
                        users={this.state.filteredUsers}
                        currentPod={this.state.currentPod}
                        checked={this.state.checked}
                        handleToggle={this.handleToggle}
                        handleCloseModal={this.handleCloseModal}
                        handleSelectAndCloseModal={this.handleSelectAndCloseModal}
                    />
                </div>
            </section>
        );
    }
}

export default Players;