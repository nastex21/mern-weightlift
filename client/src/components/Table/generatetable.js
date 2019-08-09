import React, { Component } from 'react';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

class GenerateTable extends Component {
    state = {
        tabIndex: this.props.tabIndex,
        msgUpdate: this.props.msgUpdate,
        rowData: '',
        selectAll: false,
        selected: [],
        edit: false,
        collection: ''
    }


    render() {
        console.log(this.props)
        var newArr = [];
        var exercise;

        var collection;
        var columns;
        const { tabIndex } = this.state;

        if (tabIndex == 1) {
            exercise = this.props.dataModifier.weightLogs;
            exercise = exercise.filter((item) => item.date == this.props.eventReducer.dateShortened);
            exercise.forEach((data) => { data.collections.map((obj) => { newArr.push(obj) }) });
            collection = newArr;
            columns = [{
                dataField: 'exercise',
                text: 'Exercise Name',
                editable: false
            }, {
                dataField: 'sets',
                text: 'Sets',
                editable: false
            }, {
                dataField: 'reps',
                text: 'Reps',
                editable: false
            }, {
                dataField: 'weight',
                text: "Weight",
                editable: false
            }];
        }
        if (tabIndex == 2) {
            exercise = this.props.dataModifier.cardioLogs;
            exercise = exercise.filter((item) => item.date == this.props.eventReducer.dateShortened);
            exercise.forEach((data) => { data.collections.map((obj) => { newArr.push(obj) }) });
            collection = newArr;
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

        if (tabIndex == 3) {
            exercise = this.props.dataModifier.bwLogs;
            exercise = exercise.filter((item) => item.date == this.props.eventReducer.dateShortened);
            exercise.forEach((data) => { data.collections.map((obj) => { newArr.push(obj) }) });
            collection = newArr;
            columns = [{
                dataField: 'exercise',
                text: 'Exercise Name',
                editable: false
            }, {
                dataField: 'sets',
                text: 'Sets',
                editable: false
            }, {
                dataField: 'reps',
                text: 'Reps',
                editable: false
            }];
        }

        if (tabIndex == 4) {
            exercise = this.props.dataModifier.vidsLogs;
            exercise = exercise.filter((item) => item.date == this.props.eventReducer.dateShortened);
            exercise.forEach((data) => { data.collections.map((obj) => { newArr.push(obj) }) });
            collection = newArr;
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

        return (
            <BootstrapTable keyField='_id' bootstrap4 data={collection} columns={columns} />
        )
    }
};

function mapStateToProps(state) {
    console.log('state');
    console.log(state);
    const { loggedIn } = state.authenticate;
    const { alert, dataModifier, eventReducer } = state;
    return {
        loggedIn,
        alert,
        dataModifier,
        eventReducer
    };
}

export default connect(mapStateToProps)(GenerateTable);