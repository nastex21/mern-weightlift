import React, { Component, Fragment } from 'react';
import { Table } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import TableEditer from './modal-tabs-edit-delete';
import axios from 'axios';

class ModalTabsEdit extends Component {
    state = {
        editOn: false,
        nestedModal: false,
        index: "",
        collection: ""
    }

    componentDidMount() {
        this.setState({
            collection: this.props.exerciseArr
        })
    }

    toggleNested(index) {
        this.setState({
            nestedModal: !this.state.nestedModal,
            index: index
        });
    }

    editToggle = () => {
        this.setState(prevState => ({
            editOn: !prevState.editOn
        }))
    }

    deleteThis = () => {
        console.log("yes, here's the index: " + this.state.index);
        axios.post("/api/del-items/", { id: this.props.id, date: this.props.date, deleteItem: this.state.collection[this.state.index] })
            .then(response => {
                if (!response.data.errmsg) {
                    console.log("successful signup");
                    this.setState({
                        //redirect to login page
                        redirectTo: "/api/dashboard"
                    });
                } else {
                    console.log("username already taken");
                }
            })
            .catch(error => {
                console.log("signup error: ");
                console.log(error);
            });

    }

    tableHeaders = (items) => {
        let header = Object.keys(items[0])
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    tableBody = (items) => {
        return items.map((data, index) => {
            return (
                <tr>
                    <td><FontAwesomeIcon icon={faEdit} size="lg" onClick={this.toggle} /></td>
                    {Object.entries(data).map((rowValue) => {
                        if (rowValue[0] == "exercise") {
                            return <th scope="row">{rowValue[1]}</th>
                        } else {
                            return <td>{rowValue[1]}</td>
                        }
                    })}
                    <td><FontAwesomeIcon icon={faTrashAlt} size="lg" onClick={() => this.toggleNested(index)} /></td>
                </tr>
            )
        }
        )
    }

    tableRender = (data) => {
        return (
            <Table>
                <thead>
                    <tr>
                        <th>EDIT</th>
                        {this.tableHeaders(data)}
                        <th>DELETE</th>
                    </tr>
                </thead>
                <tbody>
                    {this.tableBody(data)}
                </tbody>
            </Table>
        )
    }

    toggle = () => {
        this.setState(prevState => ({
            editOn: !prevState.editOn
        }))
    }


    render() {
        console.log(this.props);
        const { id, exerciseArr, date, msgUpdate } = this.props;
        const { editOn, nestedModal, index } = this.state;
        console.log(index);
        return (
            <div>
                {editOn ? <TableEditer id={id} date={date} exercise={exerciseArr} msgUpdate={msgUpdate} /> : this.tableRender(exerciseArr)}
                {nestedModal ? <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
                    <ModalBody>Are you sure you want to delete this?</ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.deleteThis()}>Yes</Button>{' '}
                        <Button color="secondary" onClick={() => this.toggleNested()}>No</Button>
                    </ModalFooter>
                </Modal> : null}
            </div>

        )
    }
}

export default ModalTabsEdit;