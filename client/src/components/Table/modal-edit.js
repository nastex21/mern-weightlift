import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class TableEditer extends Component {
    state = {
        id: this.propsid,
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

    render() {
        const { collection } = this.state;
        console.log(collection);
        return (
            <ReactTable data={ collection } columns={this.chooseTable()} defaultPageSize={5} className="-striped -highlight" />
        )
    }
};

export default TableEditer;