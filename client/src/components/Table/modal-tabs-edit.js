import React, { Component } from 'react';
import { Table } from 'reactstrap';

class ModalTabsEdit extends Component {

    /*    <Table>
           <thead>
             <tr>
               <th>#</th>
               <th>First Name</th>
               <th>Last Name</th>
               <th>Username</th>
             </tr>
           </thead>
           <tbody>
             <tr>
               <th scope="row">1</th>
               <td>Mark</td>
               <td>Otto</td>
               <td>@mdo</td>
             </tr>
           </tbody>
       </Table> */

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
            </Table>
        )
    }
}

export default ModalTabsEdit;