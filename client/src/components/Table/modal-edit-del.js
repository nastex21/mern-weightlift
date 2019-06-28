import React, { Component } from 'react';
import { Button } from 'reactstrap';
import cellEditFactory from 'react-bootstrap-table2-editor';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

class ModalEditDel extends Component {
    state = {
        id: this.props.id,
        date: this.props.date,
        color: this.props.color,
        collection: this.props.exerciseArr,
        msgUpdate: this.props.msgUpdate,
        selected: [0, 1]
    }

    /*     handleOnSelect = (row, isSelect, index) => {
            console.log(row);
            console.log(isSelect);
            if (isSelect) {
                this.setState(() => ({
                    selected: [...this.state.selected, index]
                }));
            } else {
                this.setState(() => ({
                    selected: this.state.selected.filter(x => x !== index)
                }));
            }
        }
    
        handleOnSelectAll = (isSelect, rows) => {
            const ids = rows.map(r => r.id);
            if (isSelect) {
                this.setState(() => ({
                    selected: ids
                }));
            } else {
                this.setState(() => ({
                    selected: []
                }));
            }
        } */

    handleOnSelect = (row, isSelect, index) => {
        console.log(isSelect);
        console.log(index);

        return true; // return true or dont return to approve current select action
    }

    render() {
        const { collection, color } = this.state;
        var columns;

        if (color == "red") {
            columns = [{
                dataField: 'exercise',
                text: 'Exercise Name',
                editable: true
            }, {
                dataField: 'reps',
                text: 'Reps',
                editable: true
            }, {
                dataField: 'sets',
                text: 'Sets',
                editable: true
            }, {
                dataField: 'weight',
                text: "Weight",
                editable: true
            }];
        }

        if (color == "blue") {
            columns = [{
                dataField: 'exercise',
                text: 'Exercise Name',
                editable: true
            }, {
                dataField: 'distance',
                text: 'Distance',
                editable: true
            }, {
                dataField: 'hours',
                text: 'Hours',
                editable: true
            }, {
                dataField: 'minutes',
                text: "Minutes",
                editable: true
            }];
        }

        if (color == "black") {
            columns = [{
                dataField: 'exercise',
                text: 'Exercise Name',
                editable: true
            }, {
                dataField: 'hours',
                text: 'Hours',
                editable: (cell, row, rowIndex, colIndex) => {
                    return row.minutes ? true : false;
                }
            }, {
                dataField: 'minutes',
                text: "Minutes",
                editable: (cell, row, rowIndex, colIndex) => {
                    return row.minutes ? true : false;
                }
            }, {
                dataField: "completed",
                text: "Completed",
                editable: false
            }];
        }

        if (color == "green") {
            columns = [{
                dataField: 'exercise',
                text: 'Exercise Name',
                editable: true
            }, {
                dataField: 'reps',
                text: 'Reps',
                editable: true
            }, {
                dataField: 'sets',
                text: 'Sets',
                editable: true
            }]
        }

        /*    const selectRow = {
               mode: 'checkbox',
               clickToSelect: true,
               selected: this.state.selected,
               onSelect: this.handleOnSelect,
               onSelectAll: this.handleOnSelectAll
           }; */

        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            onSelect: this.handleOnSelect,
            onSelectAll: this.handleOnSelectAll
        };

        return (
                <BootstrapTable keyField='_id' data={collection} columns={columns} selectRow={selectRow} />
        )
    }
};

export default ModalEditDel;