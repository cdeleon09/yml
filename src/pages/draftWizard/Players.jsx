import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

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

        this.handleAdd = this.handleAdd.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            checked: [],
        }
    }

    handleAdd() {
        this.props.onRequestClose(this.props.currentPod, this.state.checked);
    }

    handleClose() {
        this.setState({ checked: [] });
        this.props.onRequestClose(this.props.currentPod, this.state.checked);
    };

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

    render() {
        let open = this.props.open;

        return (
            <Dialog onRequestClose={this.handleClose} open={open}>
                <DialogTitle>Select Players</DialogTitle>
                <div>
                    <List dense>
                        {this.props.users.map(value => (
                            <ListItem divider onClick={event => this.handleToggle(event, value)} key={value.email}>
                                <Checkbox
                                    checked={this.state.checked.indexOf(value) !== -1}
                                    tabIndex="-1"
                                    disableRipple
                                />
                                <ListItemText primary={value.email} />
                            </ListItem>
                        ))}
                    </List>
                    <Button disableFocusRipple disableRipple color="primary" onClick={this.handleAdd}>Add</Button>
                    <Button disableFocusRipple disableRipple color="accent" onClick={this.handleClose}>Close</Button>
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

        this.state = {
            users: [],
            open: false,
            currentPod: {},
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

    handleOpenModal(pod) {
        this.setState({ 
            open: true, 
            currentPod: pod 
        });
    }

    handleCloseModal(pod, selectedUsers) {
        //REDUX ACTION TO ADD SELECTED VALUES TO STATE
        //Add the selected users to the table.
        this.props.addPlayers(pod, selectedUsers);

        this.setState({ 
            open: false 
        });
    };

    render() {
        let pods = this.props.draft.pods;
        let unselectedUsers = this.state.users; //Todo: Remove selected users.

        //Iterate on pods. Create one table per pod.
        //Each table will have just one column.
        //Button in each column to open User lookup.
        //Selecting the User will add them to the state prompting a table re-render.

        return (
            <section className="content">
                <div className="section-header">Step 3: Add Players</div>

                {pods.map(pod => {
                    return (
                        <Table key={pod.id}>
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
                                                {player.firstName}
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
                    );
                })}

                <UserModal
                    selectedValue={this.state.selectedValue}
                    open={this.state.open}
                    onRequestClose={this.handleCloseModal}
                    users={unselectedUsers}
                    currentPod={this.state.currentPod}
                />
            </section>
        );
    }
}

export default Players;