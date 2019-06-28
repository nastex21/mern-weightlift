import React, { Component } from 'react';
import { Button } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import axios from 'axios';

class TableEditer extends Component {
    state = {
        id: this.props.id,
        date: this.props.date,
        color: this.props.color,
        collection: [...this.props.exercise]
    }

 

    render() {
        const { collection } = this.state;
    
        const columns = [{
            dataField: 'name',
            text: 'Exercise Name'
        }, {
            dataField: 'hour',
            text: 'Product Name'
        }, {
            dataField: 'price',
            text: 'Product Price'
        }];
        console.log(collection);
        return (
            <div>
                <BootstrapTable keyField='id' data={ collection } columns={ columns } />
                <Button onClick={this.submitThis}>Save Changes</Button>
            </div>
        )
    }
};

export default TableEditer;