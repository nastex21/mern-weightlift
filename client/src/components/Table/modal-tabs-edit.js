import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons'
 
class ModalTabsEdit extends Component {

    tableHeaders = () => {
        let header = Object.keys(this.props.exerciseArr[0])
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    tableBody = () => {
        return this.props.exerciseArr.map((data, index) => {
            return (
                <tr>
                    {Object.entries(data).map((rowValue) => {
                        if (rowValue[0] == "exercise"){
                            return <th scope="row">{rowValue[1]}</th>
                        } else {
                            return <td>{rowValue[1]}</td>
                        }
                    })}
                </tr>
            )
        }
        )
    }

    render() {
        const { exerciseArr } = this.props;
        console.log(exerciseArr);
        return (
            <Table>
                <thead>
                    <tr>
                        {this.tableHeaders()}
                    </tr>
                </thead>
                <tbody>
                    {this.tableBody()}
                </tbody>
                <FontAwesomeIcon icon={faEdit} size="lg" />
            </Table> 
        )
    }
}

export default ModalTabsEdit;