import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

class GenerateTable extends Component {
    state = {
        exercise: this.props.exercise
    };

    render() {
        const { exercise } = this.state;
        console.log(this.props.exercise);

        var columns;
        //if (color == "#d9534f") {
        if (exercise !== undefined && exercise.length > 0) {
            columns = [{
                dataField: 'collections.exercise',
                text: 'Exercise Name',
                editable: false
            }, {
                dataField: 'collections.sets',
                text: 'Sets',
                editable: false
            }, {
                dataField: 'collections.reps',
                text: 'Reps',
                editable: false
            }, {
                dataField: 'collections.weight',
                text: "Weight",
                editable: false
            }];
        }

        return (
            <React.Fragment>
                <BootstrapTable keyField='_id' bootstrap4 data={exercise} columns={columns} />
            </React.Fragment>
        )
    }
}

export default GenerateTable;