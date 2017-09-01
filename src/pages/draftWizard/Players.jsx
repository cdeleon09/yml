import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

class SimpleDialog extends React.Component {
    constructor() {
        super();

        this.state = {
            checked: [0],
        }
    }

    handleRequestClose = () => {
        this.props.onRequestClose(this.props.selectedValue);
    };

    handleListItemClick = value => {
        this.props.onRequestClose(value);
    };

    handleToggle = (event, value) => {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked,
        });
    };

    render() {
        let open = this.props.open;

        return (
            <Dialog onRequestClose={this.handleRequestClose} open={open}>
                <DialogTitle>Select Players</DialogTitle>
                <div>
                    <List>
                        {this.props.users.map(value => (
                            <ListItem button onClick={event => this.handleToggle(event, value)} key={value.email}>
                                <Checkbox
                                    checked={this.state.checked.indexOf(value) !== -1}
                                    tabIndex="-1"
                                    disableRipple
                                />
                                <ListItemText primary={value.email} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Dialog>
        );
    }
}

class Players extends Component {
    constructor() {
        super();

        this.state = {
            users: [],
            open: false,
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

    handleRequestClose = value => {
        this.setState({ 
            open: false 
        });
    };

    render() {
        let pods = this.props.draft.pods;

        //Iterate on pods. Create one table per pod.
        //Each table will have just one column.
        //Button in each column to open User lookup.
        //Selecting the User will add them to the state prompting a table re-render.

        return (
            <section className="content">
                <div className="section-header">Step 3: Add Players</div>

                {pods.map(n => {
                    return (
                        <Table key={n.id}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        {n.name}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Button raised onClick={() => this.setState({ open: true })}>Add Player</Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    );
                })}

                <SimpleDialog
                    selectedValue={this.state.selectedValue}
                    open={this.state.open}
                    onRequestClose={this.handleRequestClose}
                    users={this.state.users}
                />
            </section>
        );
    }
}

export default Players;