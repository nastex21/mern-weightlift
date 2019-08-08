import React, { Component } from 'react';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

class GenerateTable extends Component {
    state = {
        tabIndex: this.props.tabIndex,
        msgUpdate: this.props.msgUpdate,
        rowData: '',
        selectAll: false,
        selected: [],
        edit: false,
        collection: ''
    }

    componentDidMount() {
        if (this.state.tabIndex == 1) {
            this.setState({
                collection: this.props.logs
            })
        }

        if (this.state.tabIndex == 2) {
            this.setState({
                collection: this.props.cardiologs
            })
        }

        if (this.state.tabIndex == 3) {
            this.setState({
                collection: this.props.bwlogs
            })
        }

        if (this.state.tabIndex == 4) {
            this.setState({
                collection: this.props.vidslogs
            })
        }
    }


    render() {
        console.log(this.props)
        var collection;
        var columns;
        const { tabIndex } = this.state;
        const { logs, cardioLogs, bwLogs, vidsLogs } = this.props;
        console.log(tabIndex);
        if (tabIndex == 1) {
            collection = this.state.collection;
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
            collection = this.state.collection;
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
            collection = this.state.collection;
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
            collection = this.state.collection;
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

function mapStateToProps(state) {
    console.log('state');
    console.log(state);
    const { loggedIn } = state.authenticate;
    const { alert, dataModifier, eventReducer } = state;
    return {
      loggedIn,
      alert,
      dataModifier,
      eventReducer
    };
  }
  
export default connect(mapStateToProps)(GenerateTable);