import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

class GenerateTable extends Component {
    state = {
        id: this.props.id,
        date: this.props.date,
        color: this.props.color,
        collection: this.props.weightlogs,
        msgUpdate: this.props.msgUpdate,
        rowData: '',
        selectAll: false,
        selected: [],
        edit: false
    }

    render() {
        console.log(this.props)
        const { collection } = this.state;
        var columns;
        const { id, date, msgUpdate, weightlogs, color } = this.props;
        console.log(id);
        console.log(weightlogs);

        columns = [{
            dataField: 'exercise',
            text: 'Exercise Name',
            editable: false
        }, {
            dataField: 'reps',
            text: 'Reps',
            editable: false
        }, {
            dataField: 'sets',
            text: 'Sets',
            editable: false
        }, {
            dataField: 'weight',
            text: "Weight",
            editable: false
        }];

        if (color == "#0275d8") {
            columns = [{
                dataField: 'exercise',
                text: 'Exercise Name',
                editable: false
            }, {
                dataField: 'distance',
                text: 'Distance',
                editable: false
            }, {
                dataField: 'hours',
                text: 'Hours',
                editable: false
            }, {
                dataField: 'minutes',
                text: "Minutes",
                editable: false
            }];
        }

        if (color == "#f0ad4e") {
            columns = [{
                dataField: 'exercise',
                text: 'Exercise Name',
                editable: false
            }, {
                dataField: 'hours',
                text: 'Hours',
                editable: false
            }, {
                dataField: 'minutes',
                text: "Minutes",
                editable: false
            }, {
                dataField: "completed",
                text: "Completed",
                editable: false
            }];
        }

        if (color == "#5cb85c") {
            columns = [{
                dataField: 'exercise',
                text: 'Exercise Name',
                editable: false
            }, {
                dataField: 'reps',
                text: 'Reps',
                editable: false
            }, {
                dataField: 'sets',
                text: 'Sets',
                editable: false
            }];
        }

        return (
            <BootstrapTable keyField='_id' bootstrap4 data={weightlogs} columns={columns} />
        )
    }
};
export default GenerateTable;