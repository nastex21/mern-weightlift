import React, { Component } from 'react';
import cellEditFactory from 'react-bootstrap-table2-editor';
import BootstrapTable from 'react-bootstrap-table-next';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
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

    checkName = (value) => {
        if (value == '') {
            return {
                valid: false,
                message: 'No empty strings'
            };
        }

        return true;
    }

    wholeNumValidation = (value) => {
        if (isNaN(value)) {
            return {
                valid: false,
                message: 'Only numbers '
            };
        }

        if (value < 0) {
            return {
                valid: false,
                message: "Number must be greater than zero"
            }
        }

        var checkResult = /^[0-9]+$/;

        if (!value.match(checkResult)) {
            return {
                valid: false,
                message: 'No symbols '
            }
        }

        return true;
    }

    checkWeight = (value) => {
        if (value.split('.').length > 2) {
            return {
                valid: false,
                message: 'Only one decimal point'
            }
        }

        if (isNaN(value)) {
            return {
                valid: false,
                message: 'Only numbers '
            };
        }

        if (value < 0) {
            return {
                valid: false,
                message: "Number must be greater than zero"
            }
        }

        return true;
    }

    checkMinutes = (value) => {
        if (isNaN(value)) {
            return {
                valid: false,
                message: 'Only numbers '
            };
        }

        if (value < 0) {
            return {
                valid: false,
                message: "Number must be greater than zero"
            }
        }

        if (value > 59) {
            return {
                valid: false,
                message: "Minutes must be less than 60"
            }
        }

        var checkResult = /^[0-9]+$/;

        if (!value.match(checkResult)) {
            return {
                valid: false,
                message: 'No decimals '
            }
        }

        return true;
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
                    return this.checkName(newValue)
                }
            }, {
                dataField: 'reps',
                text: 'Reps',
                editable: () => {
                    return edit ? true : false;
                },
                validator: (newValue, row, column) => {
                    return this.wholeNumValidation(newValue)
                }
            }, {
                dataField: 'sets',
                text: 'Sets',
                editable: () => {
                    return edit ? true : false;
                },
                validator: (newValue, row, column) => {
                    return this.wholeNumValidation(newValue)
                }
            }, {
                dataField: 'weight',
                text: "Weight",
                editable: () => {
                    return edit ? true : false;
                },
                validator: (newValue, row, column) => {
                    return this.checkWeight(newValue);
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
                    return this.checkName(newValue)
                }
            }, {
                dataField: 'distance',
                text: 'Distance',
                editable:  (cell, row, rowIndex, colIndex) => {                     
                    return edit ? true : false;                 },
                validator: (newValue, row, column) => {
                    return this.checkWeight(newValue);
                }
            }, {
                dataField: 'hours',
                text: 'Hours',
                editable:  (cell, row, rowIndex, colIndex) => {                     
                    return edit ? true : false;                 },
                validator: (newValue, row, column) => {
                    return this.wholeNumValidation(newValue)
                }
            }, {
                dataField: 'minutes',
                text: "Minutes",
                editable:  (cell, row, rowIndex, colIndex) => {                    
                     return edit ? true : false;                 },
                validator: (newValue, row, column) => {
                    return this.checkMinutes(newValue)
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
                    return this.checkName(newValue)
                }
            }, {
                dataField: 'hours',
                text: 'Hours',
                editable: (cell, row, rowIndex, colIndex) => {
                    return row.minutes ? true : false;
                },
                validator: (newValue, row, column) => {
                    return this.wholeNumValidation(newValue)
                }
            }, {
                dataField: 'minutes',
                text: "Minutes",
                editable: (cell, row, rowIndex, colIndex) => {
                    return row.minutes ? true : false;
                },
                validator: (newValue, row, column) => {
                    return this.checkMinutes(newValue)
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
                    return this.checkName(newValue)
                }
            }, {
                dataField: 'reps',
                text: 'Reps',
                editable:  (cell, row, rowIndex, colIndex) => {                     
                    return edit ? true : false;                 },
                validator: (newValue, row, column) => {
                    return this.wholeNumValidation(newValue)
                }
            }, {
                dataField: 'sets',
                text: 'Sets',
                editable:  (cell, row, rowIndex, colIndex) => {                    
                     return edit ? true : false;                 },
                validator: (newValue, row, column) => {
                    return this.wholeNumValidation(newValue)
                }
            }];

            if (this.state.edit) {
                columns.push(dummy);
            }
        }

        const cellEdit = cellEditFactory({
            mode: 'click',
            blurToSave: false
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