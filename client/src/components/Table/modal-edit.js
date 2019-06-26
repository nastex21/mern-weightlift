import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Button } from 'reactstrap'
import 'react-table/react-table.css';
import axios from 'axios';

class TableEditer extends Component {
    state = {
        id: this.props.id,
        date: this.props.date,
        color: this.props.color,
        collection: [...this.props.exercise]
    }

    componentDidUpdate() {
        console.log(this.state.collection)
    }

    chooseTable = () => {
        const { color } = this.state;

        if (color == "red") {
            return [{
                Header: 'Name',
                accessor: 'exercise',
                Cell: this.renderEditable
            }, {
                Header: 'Reps',
                accessor: 'reps',
                Cell: this.renderEditable
            },
            {
                Header: 'Sets',
                accessor: 'sets',
                Cell: this.renderEditable
            },
            {
                Header: 'Weight',
                accessor: 'weight',
                Cell: this.renderEditable
            }];
        }

        if (color == 'blue') {
            return [{
                Header: 'Name',
                accessor: 'exercise',
                Cell: this.renderEditable
            }, {
                Header: 'Distance',
                accessor: 'distance',
                Cell: this.renderEditable
            },
            {
                Header: 'Hours',
                accessor: 'hours',
                Cell: this.renderEditable
            },
            {
                Header: 'Minutes',
                accessor: 'minutes',
                Cell: this.renderEditable
            }];
        }

        if (color == 'green') {
            return [{
                Header: 'Name',
                accessor: 'exercise',
                Cell: this.renderEditable
            }, {
                Header: 'Sets',
                accessor: 'sets',
                Cell: this.renderEditable
            },
            {
                Header: 'Reps',
                accessor: 'reps',
                Cell: this.renderEditable
            }];
        }

        if (color == 'black') {
            return [{
                Header: 'Name',
                accessor: 'exercise',
                Cell: this.renderEditable
            },
            {
                Header: 'Hours',
                accessor: 'hours',
                Cell: this.renderEditable
            },
            {
                Header: 'Minutes',
                accessor: 'minutes',
                Cell: this.renderEditable
            },
            {
                Header: 'Completed',
                accessor: 'completed',
                Cell: this.renderEditable
            }
            ];
        }
    }

    renderEditable = (cellInfo) => {
        console.log(cellInfo);
        return (
            <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const collection = [...this.state.collection];
                    collection[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    this.setState({ collection });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.collection[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    }

    submitThis = () => {
        console.log("works")
        console.log(this.state.collection);
        axios.post('/api/edit-items', { id: this.state.id, date: this.state.date, color: this.state.color, collection: this.state.collection })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log("post /api/edit-items error: ");
                console.log(error);
            });
    }

    render() {
        const { collection } = this.state;
        console.log(collection);
        return (
            <div>
                <ReactTable data={collection} columns={this.chooseTable()} defaultPageSize={5} className="-striped -highlight" />
                <Button onClick={this.submitThis}>Save Changes</Button>
            </div>
        )
    }
};

export default TableEditer;