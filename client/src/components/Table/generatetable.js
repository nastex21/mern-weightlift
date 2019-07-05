import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

class GenerateTable extends Component {
    state = {
        id: this.props.id,
        date: this.props.date,
        tabIndex: this.props.tabIndex,
        msgUpdate: this.props.msgUpdate,
        rowData: '',
        selectAll: false,
        selected: [],
        edit: false
    }

    componentDidMount() {
        if (this.props.tabIndex == 1) {
            this.setState({
                collection: this.props.logs
            })
        }

        if (this.props.tabIndex == 2) {
            this.setState({
                collection: this.props.cardiologs
            })
        }

        if (this.props.tabIndex == 3) {
            this.setState({
                collection: this.props.bwlogs
            })
        }

        if (this.props.tabIndex == 4) {
            this.setState({
                collection: this.props.vidslogs
            })
        }
    }

    render() {
        console.log(this.props)
        var collection;
        var columns;
        const { id,  logs, cardiologs, bwlogs, vidslogs, tabIndex } = this.props;
        console.log(id);
        console.log(logs);
        console.log(tabIndex);
        if (tabIndex == 1) {
            collection = logs;
            columns = [{
                dataField: 'exercise',
                text: 'Exercise Name',
                editable: false
            }, {
                dataField: 'sets',
                text: 'Sets',
                editable: false
            }, {
                dataField: 'reps',
                text: 'Reps',
                editable: false
            }, {
                dataField: 'weight',
                text: "Weight",
                editable: false
            }];
        }
        if (tabIndex == 2) {
            collection = cardiologs;
            console.log('tabindex 2')
            columns = [{
                dataField: 'exercise',
                text: 'Exercise Name',
                editable: false
            }, {
                dataField: 'distance',
                text: 'Distance',
                editable: false
            }, {
                dataField: 'hours',
                text: 'Hours',
                editable: false
            }, {
                dataField: 'minutes',
                text: "Minutes",
                editable: false
            }];
        }

        if (tabIndex == 3) {
            collection = bwlogs;
            columns = [{
                dataField: 'exercise',
                text: 'Exercise Name',
                editable: false
            },{
                dataField: 'sets',
                text: 'Sets',
                editable: false
            }, {
                dataField: 'reps',
                text: 'Reps',
                editable: false
            }];
        }

        if (tabIndex == 4) {
            console.log(vidslogs);
            collection = vidslogs;
            columns = [{
                dataField: 'exercise',
                text: 'Exercise Name',
                editable: false
            }, {
                dataField: 'hours',
                text: 'Hours',
                editable: false
            }, {
                dataField: 'minutes',
                text: "Minutes",
                editable: false
            }, {
                dataField: "completed",
                text: "Completed",
                editable: false
            }];
        }

        return (
            <BootstrapTable keyField='_id' bootstrap4 data={collection} columns={columns} />
        )
    }
};
export default GenerateTable;