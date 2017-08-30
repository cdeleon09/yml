import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

class Players extends Component {
    constructor() {
        super();
    }

    render() {
        let draft = this.props.draft;
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
                                        <Button raised>Add Player</Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    );
                })}
            </section>
        );
    }
}

export default Players;