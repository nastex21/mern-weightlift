import React, { Component } from 'react';
import cellEditFactory from 'react-bootstrap-table2-editor';
import BootstrapTable from 'react-bootstrap-table-next';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { checkName, checkMinutes, checkWeight, wholeNumValidation } from '../Validation/validate';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import axios from 'axios';

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

    deleteItem = (value) => {
        let filterOut = this.state.collection.filter((item) => {
            return item._id !== value._id
        })

        this.setState({
            collection: [...filterOut]
        })
    }

    edit = () => {
        this.setState((prevState) => ({
            edit: !prevState.edit
        }))
    }

    saveChanges = () => {
        axios.post('/api/edit-items', { id: this.state.id, date: this.state.date, color: this.state.color, collection: this.state.collection })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });

    }

    render() {
        const { color, edit, collection } = this.state;
        var columns, minsColumn, hrsColumn;
        var dummy = {
            dataField: 'df2',
            editable: false,
            isDummyField: true,
            text: 'Delete',
            headerAlign: 'center',
            align: 'center',
            footerAlign: 'center',
            formatter: (cellContent, row) => {
                return (
                    <FontAwesomeIcon icon={faTrashAlt} size="lg" onClick={() => this.deleteItem(row)} />
                );
            }
        };


        if (color == "#d9534f") {
            columns = [{
                dataField: 'exercise',
                text: 'Exercise Name',
                headerAlign: 'center',
                align: 'center',
                footerAlign: 'center',
                editable: () => {
                    return edit ? true : false;
                },
                validator: (newValue, row, column) => {
                    return checkName(newValue)
                },
                footer: 'Total'
            }, {
                dataField: 'reps',
                text: 'Reps',
                headerAlign: 'center',
                align: 'center',
                editable: () => {
                    return edit ? true : false;
                },
                validator: (newValue, row, column) => {
                    return wholeNumValidation(newValue)
                },
                footer: ''
            }, {
                dataField: 'sets',
                text: 'Sets',
                headerAlign: 'center',
                align: 'center',
                footerAlign: 'center',
                editable: () => {
                    return edit ? true : false;
                },
                validator: (newValue, row, column) => {
                    return wholeNumValidation(newValue)
                },
                footer: ''
            }, {
                dataField: 'weight',
                text: "Weight",
                headerAlign: 'center',
                align: 'center',
                footerAlign: 'center',
                editable: () => {
                    return edit ? true : false;
                },
                validator: (newValue, row, column) => {
                    return checkWeight(newValue);
                },
                footer: columnData => columnData.reduce((acc, item) => +acc + +item)
            }];

            if (this.state.edit) {
                columns.push(dummy);
            }
        }

        if (color == "#0275d8") {
            var getTime = function () {
                var arrHr = [];
                var arrMin = [];

                collection.forEach(function (item) {
                    for (var key in item) {
                        if (key == "hours") {
                            arrHr.push(item[key]);
                        }

                        if (key == "minutes") {
                            arrMin.push(item[key]);
                        }
                    }
                }
                )

                var min = arrMin.reduce((acc, item) => +acc + +item);
                var hrs = arrHr.reduce((acc, item) => +acc + +item);

                hrs = hrs * 60;
                var total = hrs + min;

                hrsColumn = Math.floor(total / 60);
                minsColumn = total % 60;
            };
            getTime();

            columns = [{
                dataField: 'exercise',
                text: 'Exercise Name',
                headerAlign: 'center',
                align: 'center',
                footerAlign: 'center',
                editable: (cell, row, rowIndex, colIndex) => {
                    return edit ? true : false;
                },
                validator: (newValue, row, column) => {
                    return checkName(newValue)
                },
                footer: 'Total'
            }, {
                dataField: 'distance',
                text: 'Distance',
                headerAlign: 'center',
                align: 'center',
                footerAlign: 'center',
                editable: (cell, row, rowIndex, colIndex) => {
                    return edit ? true : false;
                },
                validator: (newValue, row, column) => {
                    return checkWeight(newValue);
                },
                footer: columnData => columnData.reduce((acc, item) => +acc + +item),

            }, {
                dataField: 'hours',
                text: 'Hours',
                headerAlign: 'center',
                align: 'center',
                footerAlign: 'center',
                editable: (cell, row, rowIndex, colIndex) => {
                    return edit ? true : false;
                },
                validator: (newValue, row, column) => {
                    return wholeNumValidation(newValue)
                },
                footer: columnData => columnData.reduce((acc, item) => hrsColumn)
            }, {
                dataField: 'minutes',
                text: "Minutes",
                headerAlign: 'center',
                align: 'center',
                footerAlign: 'center',
                editable: (cell, row, rowIndex, colIndex) => {
                    return edit ? true : false;
                },
                validator: (newValue, row, column) => {
                    return checkMinutes(newValue)
                },
                footer: columnData => columnData.reduce((acc, item) => minsColumn)
            }];

            if (this.state.edit) {
                columns.push(dummy);
            }
        }

        if (color == "#f0ad4e") {
            columns = [{
                dataField: 'exercise',
                text: 'Exercise Name',
                headerAlign: 'center',
                align: 'center',
                footerAlign: 'center',
                editable: (cell, row, rowIndex, colIndex) => {
                    return edit ? true : false;
                },
                validator: (newValue, row, column) => {
                    return checkName(newValue)
                }
            }, {
                dataField: 'hours',
                text: 'Hours',
                headerAlign: 'center',
                align: 'center',
                footerAlign: 'center',
                editable: (cell, row, rowIndex, colIndex) => {
                    return row.minutes ? true : false;
                },
                validator: (newValue, row, column) => {
                    return wholeNumValidation(newValue)
                }
            }, {
                dataField: 'minutes',
                text: "Minutes",
                headerAlign: 'center',
                align: 'center',
                footerAlign: 'center',
                editable: (cell, row, rowIndex, colIndex) => {
                    return row.minutes ? true : false;
                },
                validator: (newValue, row, column) => {
                    return checkMinutes(newValue)
                }
            }, {
                dataField: 'completed',
                text: "Completed",
                headerAlign: 'center',
                align: 'center',
                footerAlign: 'center',
                editable: false,
                formatter: (cellContent, row) => {
                    if (cellContent == "true") {
                        return <FontAwesomeIcon icon={faCheck} size="lg" />
                    } else {
                        return <FontAwesomeIcon icon={faTimes} size='lg' />
                    }
                }
            }];
            if (this.state.edit) {
                columns.push(dummy);
            }
        }

        if (color == "#5cb85c") {
            columns = [{
                dataField: 'exercise',
                text: 'Exercise Name',
                headerAlign: 'center',
                align: 'center',
                footerAlign: 'center',
                editable: (cell, row, rowIndex, colIndex) => {
                    return edit ? true : false;
                },
                validator: (newValue, row, column) => {
                    return checkName(newValue)
                }
            }, {
                dataField: 'reps',
                text: 'Reps',
                headerAlign: 'center',
                align: 'center',
                footerAlign: 'center',
                editable: (cell, row, rowIndex, colIndex) => {
                    return edit ? true : false;
                },
                validator: (newValue, row, column) => {
                    return wholeNumValidation(newValue)
                }
            }, {
                dataField: 'sets',
                text: 'Sets',
                headerAlign: 'center',
                align: 'center',
                footerAlign: 'center',
                editable: (cell, row, rowIndex, colIndex) => {
                    return edit ? true : false;
                },
                validator: (newValue, row, column) => {
                    return wholeNumValidation(newValue)
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

        return (
            <div>
                <BootstrapTable variant="dark" keyField='_id' bootstrap4={true} striped={true} data={collection} columns={columns} cellEdit={cellEdit} />
                {this.state.edit ? <Button as="input" variant="secondary" type="button" value="SAVE CHANGES" size="sm" block onClick={this.saveChanges} /> : <Button as="input" type="button" style={style} value="EDIT" size="sm" block onClick={this.edit} />}
            </div>
        )
    }
};
export default ModalEditDel;