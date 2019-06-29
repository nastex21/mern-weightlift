import React, { Component } from 'react';
import cellEditFactory from 'react-bootstrap-table2-editor';
import BootstrapTable from 'react-bootstrap-table-next';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { checkName, checkMinutes, checkWeight, wholeNumValidation } from '../Validation/validate';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

class ModalEditDel extends Component {
    state = {
        id: this.props.id,
        date: this.props.date,
        color: this.props.color,
        collection: this.props.exerciseArr,
        msgUpdate: this.props.msgUpdate,
        rowData: '',
        selectAll: false,
        selected: [],
        edit: false
    }

    edit = () => {
        this.setState((prevState) => ({
            edit: !prevState.edit
        }))
    }

    render() {
        const { color, edit, collection } = this.state;
        var columns;
        var dummy = {
            dataField: 'df2',
            editable: false,
            isDummyField: true,
            text: 'Delete',
            formatter: (cellContent, row) => {
                return (
                    console.log(cellContent),
                    console.log(row),
                    <FontAwesomeIcon icon={faTrashAlt} size="lg" onClick={() => this.edit(cellContent)} />
                );
            }
        };

        if (color == "#d9534f") {
            columns = [{
                dataField: 'exercise',
                text: 'Exercise Name',
                editable: () => {
                    return edit ? true : false;
                },
                validator: (newValue, row, column) => {
                    return checkName(newValue)
                }
            }, {
                dataField: 'reps',
                text: 'Reps',
                editable: () => {
                    return edit ? true : false;
                },
                validator: (newValue, row, column) => {
                   return wholeNumValidation(newValue)
                }
            }, {
                dataField: 'sets',
                text: 'Sets',
                editable: () => {
                    return edit ? true : false;
                },
                validator: (newValue, row, column) => {
                    return wholeNumValidation(newValue)
                }
            }, {
                dataField: 'weight',
                text: "Weight",
                editable: () => {
                    return edit ? true : false;
                },
                validator: (newValue, row, column) => {
                    return checkWeight(newValue);
                }
            }];

            if (this.state.edit) {
                columns.push(dummy);
            }
        }

        if (color == "#0275d8") {
            columns = [{
                dataField: 'exercise',
                text: 'Exercise Name',
                editable: (cell, row, rowIndex, colIndex) => {                     
                    return edit ? true : false;                 },
                validator: (newValue, row, column) => {
                    return checkName(newValue)
                }
            }, {
                dataField: 'distance',
                text: 'Distance',
                editable:  (cell, row, rowIndex, colIndex) => {                     
                    return edit ? true : false;                 },
                validator: (newValue, row, column) => {
                    return checkWeight(newValue);
                }
            }, {
                dataField: 'hours',
                text: 'Hours',
                editable:  (cell, row, rowIndex, colIndex) => {                     
                    return edit ? true : false;                 },
                validator: (newValue, row, column) => {
                    return  wholeNumValidation(newValue)
                }
            }, {
                dataField: 'minutes',
                text: "Minutes",
                editable:  (cell, row, rowIndex, colIndex) => {                    
                     return edit ? true : false;                 },
                validator: (newValue, row, column) => {
                    return checkMinutes(newValue)
                }
            }];

            if (this.state.edit) {
                columns.push(dummy);
            }
        }

        if (color == "#f0ad4e") {
            columns = [{
                dataField: 'exercise',
                text: 'Exercise Name',
                editable:  (cell, row, rowIndex, colIndex) => {                    
                     return edit ? true : false;                 },
                validator: (newValue, row, column) => {
                    return checkName(newValue)
                }
            }, {
                dataField: 'hours',
                text: 'Hours',
                editable: (cell, row, rowIndex, colIndex) => {
                    return row.minutes ? true : false;
                },
                validator: (newValue, row, column) => {
                    return wholeNumValidation(newValue)
                }
            }, {
                dataField: 'minutes',
                text: "Minutes",
                editable: (cell, row, rowIndex, colIndex) => {
                    return row.minutes ? true : false;
                },
                validator: (newValue, row, column) => {
                    return  checkMinutes(newValue)
                }
            }, {
                dataField: "completed",
                text: "Completed",
                editable: false
            }];

            if (this.state.edit) {
                columns.push(dummy);
            }
        }

        if (color == "#5cb85c") {
            columns = [{
                dataField: 'exercise',
                text: 'Exercise Name',
                editable:  (cell, row, rowIndex, colIndex) => {                     
                    return edit ? true : false;                 },
                validator: (newValue, row, column) => {
                    return checkName(newValue)
                }
            }, {
                dataField: 'reps',
                text: 'Reps',
                editable:  (cell, row, rowIndex, colIndex) => {                     
                    return edit ? true : false;                 },
                validator: (newValue, row, column) => {
                    return wholeNumValidation(newValue)
                }
            }, {
                dataField: 'sets',
                text: 'Sets',
                editable:  (cell, row, rowIndex, colIndex) => {                    
                     return edit ? true : false;                 },
                validator: (newValue, row, column) => {
                    return  wholeNumValidation(newValue)
                }
            }];

            if (this.state.edit) {
                columns.push(dummy);
            }
        }

        const cellEdit = cellEditFactory({
            mode: 'click',
            blurToSave: true
        });

        var style = {
            backgroundcolor: 'danger',
        }

        console.log(this.state.edit);
        return (
            <div>
                <BootstrapTable keyField='_id' bootstrap4 data={collection} columns={columns} cellEdit={cellEdit} />
                {this.state.edit ? <Button as="input" variant="secondary" type="button" value="SAVE CHANGES" size="sm" block /> : <Button as="input" type="button" style={style} value="EDIT" size="sm" block onClick={this.edit} />}
            </div>
        )
    }
};
export default ModalEditDel;