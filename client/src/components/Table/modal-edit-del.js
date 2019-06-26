import React, { Component, Fragment } from 'react';
import { Table } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import TableEditer from './modal-edit';
import axios from 'axios';

class ModalEditDel extends Component {
    state = {
        editOn: false,
        nestedModal: false,
        index: "",
        collection: "",
        color: ""
    }

    componentDidMount() {
        this.setState({
            color: this.props.color,
            collection: this.props.exerciseArr
        })
    }

    toggleNested(index) {
        this.setState({
            nestedModal: !this.state.nestedModal,
            index: index
        });
    }

    deleteThis = () => {
        //console.log("yes, here's the index: " + this.state.index);

        var userId = this.props.id;
        var itemId = this.state.collection[this.state.index]._id;
        console.log(userId);
        console.log(itemId);
        axios.delete("/api/del-items/" + this.state.color + "/itemid/" + itemId + "/user/" + userId)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log("post /api/add-items error: ");
                console.log(error);
            });

    }

    tableHeaders = (items) => {
        let header = Object.keys(items[0]);
        return header.map((key, index) => {
            console.log(key)
            if (key !== "_id") {
                return <th key={index}>{key.toUpperCase()}</th>
            }
        }
        )
    }

    tableBody = (items) => {
        return items.map((data, index) => {
            return (
                <tr>
                    <td><FontAwesomeIcon icon={faEdit} size="lg" onClick={this.toggle} /></td>
                    {Object.entries(data).map((rowValue) => {
                        if (rowValue[0] == "exercise") {
                            return <th scope="row">{rowValue[1]}</th>
                        } else if (rowValue[0] == "_id") {
                            return null;
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
        const { editOn, nestedModal, index, color } = this.state;
        console.log(index);
        console.log(this.props.exerciseArr);
        return (
            <div>
                {editOn ? <TableEditer id={id} date={date} exercise={exerciseArr} msgUpdate={msgUpdate} color={color} index={index} /> : this.tableRender(exerciseArr)}
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

export default ModalEditDel;