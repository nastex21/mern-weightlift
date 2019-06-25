import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class TableEditer extends Component {
    state = {
        id: this.propsid,
        date: this.props.date,
        color: this.props.color,
        collection: [ ...this.props.exercise]
    }

    chooseTable = () => {
        const { color } = this.state;

        if (color == "red"){
           return [{
                Header: 'Name',
                accessor: 'exercise'
            }, {
                Header: 'Reps',
                accessor: 'reps'
            },
            {
                Header: 'Sets',
                accessor: 'sets'
            },
            {
                Header: 'Weight',
                accessor: 'weight'
            }];
        }

        if (color == 'blue'){
            return [{
                Header: 'Name',
                accessor: 'exercise'
            }, {
                Header: 'Distance',
                accessor: 'distance'
            },
            {
                Header: 'Hours',
                accessor: 'hours'
            },
            {
                Header: 'Minutes',
                accessor: 'minutes'
            }];
        }

        if (color == 'green'){
            return [{
                Header: 'Name',
                accessor: 'exercise'
            }, {
                Header: 'Sets',
                accessor: 'sets'
            },
            {
                Header: 'Reps',
                accessor: 'reps'
            }];
        }

        if (color == 'black'){
            return [{
                Header: 'Name',
                accessor: 'exercise'
            }, 
            {
                Header: 'Hours',
                accessor: 'hours'
            },
            {
                Header: 'Minutes',
                accessor: 'minutes'
            },
            {
                Header: 'Completed',
                accessor: 'completed'
            }
        ];
        }
    }

    render() {
        console.log(this.props);
        const { collection } = this.state;
        console.log(collection);
        const data = collection;

        return (
            <ReactTable data={data} columns={this.chooseTable()} />
        ) 
    }
};

export default TableEditer;