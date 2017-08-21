import React, { Component } from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

class Content extends Component {
    render() {
        let data = [{id: 0, name: 'draft 1'}, {id: 1, name: 'draft 2'}];

        return (
            <main className="content">
                <div className="m-t-lg m-l-lg m-r-lg">
                    <div className="section-header">Drafts</div>
                    <div className="datatable m-t-lg">
                        <Table>
                            <TableHead>
                            <TableRow>
                                <TableCell>Draft Name</TableCell>
                                <TableCell numeric># Players</TableCell>
                                <TableCell numeric>% Complete</TableCell>
                                <TableCell numeric> </TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map(n => {
                                    return (
                                        <TableRow key={n.id}>
                                            <TableCell>
                                            {n.name}
                                            </TableCell>
                                            <TableCell numeric>
                                            0
                                            </TableCell>
                                            <TableCell numeric>
                                            0
                                            </TableCell>
                                            <TableCell numeric>
                                            0
                                            </TableCell>
                                        </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </main>
        );
    }
}

export default Content;