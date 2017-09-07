import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

class Content extends Component {
    constructor() {
        super();

        this.state = {
            drafts:[]
        };

        this.createDraft = this.createDraft.bind(this);
    }

    createDraft() {
        this.props.history.push(`/DraftWizard`);
    }

    componentWillMount() {
      fetch('http://localhost:3001/drafts', {
          method: 'GET',
          credentials: 'include'
      })
      .then(res => res.json())
      .then(json => {
        this.setState({drafts:json});
      });
    }

    renderDraftRows(d){
      return d.pods.map(p => {
        return (
          <TableRow key={p._id}>
            <TableCell>
              {d.name}
            </TableCell>
            <TableCell>
              {p.name}
            </TableCell>
            <TableCell numeric>
              {p.players.length}
            </TableCell>
            <TableCell numeric>
              0
            </TableCell>
          </TableRow>
        );
      });
    }

    render() {
        return (
            <main className="content">
                <div className="m-t-lg m-l-lg m-r-lg">
                    <div className="section-header">
                        <div>Drafts</div>
                        <div><Button raised color="primary" onClick={this.createDraft}>Create Draft</Button></div>
                    </div>
                    <div className="datatable m-t-md">
                        <Table>
                            <TableHead>
                            <TableRow>
                                <TableCell>Draft Name</TableCell>
                                <TableCell>Pod</TableCell>
                                <TableCell numeric># Players</TableCell>
                                <TableCell numeric>% Complete</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.drafts.map(d => { return this.renderDraftRows(d); })}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </main>
        );
    }
}

export default Content;
