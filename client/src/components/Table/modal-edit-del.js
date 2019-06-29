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
        selected: []
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

    handleOnSelect = (row, isSelect, index) => {
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
    }

    onBeforeSaveCell = (rowIndex, fieldName, value, confirmEdit) => {
        console.log('rowIndex');
        console.log(rowIndex);
        console.log('fieldName');
        console.log(fieldName);
        console.log('value');
        console.log(value);
        console.log('confirmEdit');
        console.log(confirmEdit);
        let toSave = false;
        window.confirm('Are you sure you want to edit this value?').then(
            (result) => {
                // `proceed` callback
                console.log('proceed called');
                toSave = true;
            },
            (result) => {
                // `cancel` callback
                console.log('cancel called');
                toSave = false;
            }
        );
        // save change to database if toSave is true and update cell, otherwise return false and have cell reset or should this replace proceed callback line?
        this.confirmEdit(rowIndex, fieldName, value, toSave);
    }

    rankFormatter = (cell, row, rowIndex, formatExtraData) => {
        return (
            < div
                style={{
                    textAlign: "center",
                    cursor: "pointer",
                    lineHeight: "normal"
                }}>

                <FontAwesomeIcon icon={faEdit} size="lg" onClick={this.toggle} />
            </div>
        );
    }

    deleteAll = () => {
        console.log(this.state.rowData);
    }

    render() {
        const { collection, color, selectAll, rowData } = this.state;
        var columns;

        if (color == "#d9534f") {
            columns = [{
                dataField: 'exercise',
                text: 'Exercise Name',
                editable: true,
                validator: (newValue, row, column) => {
                    return this.checkName(newValue)
                }
            }, {
                dataField: 'reps',
                text: 'Reps',
                editable: true,
                validator: (newValue, row, column) => {
                    return this.wholeNumValidation(newValue)
                }
            }, {
                dataField: 'sets',
                text: 'Sets',
                editable: true,
                validator: (newValue, row, column) => {
                    return this.wholeNumValidation(newValue)
                }
            }, {
                dataField: 'weight',
                text: "Weight",
                editable: true,
                validator: (newValue, row, column) => {
                    return this.checkWeight(newValue);
                }
            }];
        }

        if (color == "#0275d8") {
            columns = [{
                dataField: 'exercise',
                text: 'Exercise Name',
                editable: true,
                validator: (newValue, row, column) => {
                    return this.checkName(newValue)
                }
            }, {
                dataField: 'distance',
                text: 'Distance',
                editable: true,
                validator: (newValue, row, column) => {
                    return this.checkWeight(newValue);
                }
            }, {
                dataField: 'hours',
                text: 'Hours',
                editable: true,
                validator: (newValue, row, column) => {
                    return this.wholeNumValidation(newValue)
                }
            }, {
                dataField: 'minutes',
                text: "Minutes",
                editable: true,
                validator: (newValue, row, column) => {
                    return this.checkMinutes(newValue)
                }
            }];
        }

        if (color == "#f0ad4e") {
            columns = [{
                dataField: 'exercise',
                text: 'Exercise Name',
                editable: true,
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
        }

        if (color == "#5cb85c") {
            columns = [{
                dataField: 'exercise',
                text: 'Exercise Name',
                editable: true,
                validator: (newValue, row, column) => {
                    return this.checkName(newValue)
                }
            }, {
                dataField: 'reps',
                text: 'Reps',
                editable: true,
                validator: (newValue, row, column) => {
                    return this.wholeNumValidation(newValue)
                }
            }, {
                dataField: 'sets',
                text: 'Sets',
                editable: true,
                validator: (newValue, row, column) => {
                    return this.wholeNumValidation(newValue)
                }
            }]
        }

        const selectRow = {
            mode: 'radio',
            clickToSelect: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                    this.setState(prevState => ({
                        selectAll: isSelect,
                        rowData: row
                    })
                    )
                console.log(row);
                console.log(isSelect);
                console.log(rowIndex);
                console.log(e);
            }
        };

        const cellEdit = cellEditFactory({
            mode: 'click',
            blurToSave: false,
            formatter: this.rankFormatter,
        });

        var style = {
            backgroundcolor: 'danger',

        }

        return (
            <div>
                <BootstrapTable keyField='_id' bootstrap4 data={collection} columns={columns} selectRow={selectRow} cellEdit={cellEdit} />
                {this.state.selectAll ? <Button as="input" type="button" style={style} value="DELETE ALL" size="sm" block onClick={this.deleteAll} /> : <Button as="input" variant="secondary" type="button" value="SAVE CHANGES" size="sm" block />}
            </div>
        )
    }
};
export default ModalEditDel;