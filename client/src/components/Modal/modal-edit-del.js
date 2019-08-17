import React, { Component } from 'react';
import cellEditFactory from 'react-bootstrap-table2-editor';
import BootstrapTable from 'react-bootstrap-table-next';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import { Button } from 'react-bootstrap';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { checkName, checkMinutes, checkWeight, wholeNumValidation } from '../Validation/validate';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { userService } from '../../services/user.services';
import { connect } from 'react-redux';

class ModalEditDel extends Component {
    state = {
        id: this.props.dataModifier.id,
        date: this.props.dataModifier.dateText,
        color: this.props.dataModifier.color,
        collection: this.props.dataModifier.eventsFiltered,
        msgUpdate: this.props.msgUpdate,
        rowData: '',
        selectAll: false,
        selected: [],
        edit: false,
        modal: false
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
        this.props.dispatch(userService.saveChanges(this.state.id, this.state.date, this.state.color, this.state.collection));
    }

    toggle = (info) => {

        this.setState(prevState => ({
            modal: !prevState.modal
        }))

    }

    render() {
        const { color, edit, collection } = this.state;
        console.log(collection);
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
                footer: (column, columnIndex) => {
                    return "Total";
                }
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
            },
            {
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
                footer: (column, columnIndex) => {
                    return column.reduce((acc, item) => +acc + +item)
                }
            }];

            if (this.state.edit) {
                columns.push(dummy);
            }
        }

        if (color == "#0275d8") {
            var getTime = function (path) {
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

                hrs = +hrs * 60;
                var total = +hrs + +min;

                if (path == 1) {
                    return hrsColumn = Math.floor(total / 60);
                } else if (path == 2) {
                    return minsColumn = total % 60;
                }
            };

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
                footer: (column, columnIndex) => {
                    return "Total";
                }
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
                footer: (column, columnIndex) => {
                    return column.reduce((acc, item) => +acc + +item);
                }
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
                footer: (column, columnIndex) => {
                    return getTime(1);
                }
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
                footer: (column, columnIndex) => {
                    return getTime(2);
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
                headerAlign: 'center',
                align: 'center',
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
                {this.state.collection.length > 0 ? <BootstrapTable keyField='_id' bootstrap4={true} striped={true} data={collection} columns={columns} cellEdit={cellEdit} /> : <p className="emptyWarning">It looks empty in here</p>}
                {this.state.edit ? <Button as="input" variant="secondary" type="button" value="SAVE CHANGES" size="sm" block onClick={this.toggle} /> : <Button as="input" type="button" style={style} value="EDIT" size="sm" block onClick={this.edit} />}

                <Modal isOpen={this.state.modal} toggle={this.toggle} color={this.state.color} onClosed={this.showErrorMsg} >
                    <ModalHeader toggle={this.toggle}>
                    </ModalHeader>
                    <ModalBody>
                        <p>Are you sure you want to save these changes?</p>
                        <button onClick={this.saveChanges}>Accept</button>
                        <button onClick={this.toggle}>Cancel</button>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
};

function mapStateToProps(state) {
    console.log('state');
    console.log(state);
    const { eventReducer, dataModifier } = state;
    return {
        eventReducer,
        dataModifier
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditDel);