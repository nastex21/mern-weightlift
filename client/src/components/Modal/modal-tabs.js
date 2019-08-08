import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import classnames from 'classnames';
import WeightsAdd from '../Table/weight-components/table-body-add';
import CardioAdd from '../Table/cardio-components/table-body-add-cardio';
import BWAdd from '../Table/bodyweight-components/table-body-add-bw';
import ExVidsClassesAdd from '../Table/exercisevidsclasses-component/table-body-add-vidsclasses';
import GenerateTable from '../Table/generatetable';

class ModalTabs extends Component {

    state = {
        activeTab: '1',
        weightlogs: [],
        cardiologs: [],
        bwlogs: [],
        vidslogs: [],
        dataloaded: false
    };

     componentDidMount() {
        var newArr = [];
        var exercise;
        exercise = this.props.dataModifier.weightLogs;
        exercise = exercise.filter((item) => item.date == this.props.eventReducer.dateShortened);
        exercise.forEach((data) => { data.collections.map((obj) => { newArr.push(obj)})});
        this.setState({
            weightlogs: [...newArr]
        }, this.setState({
            dataloaded: true
        })
        )
    } 

    createDate = (date) => {
        let newDate = new Date(date);
        var y = newDate.getFullYear();
        var m = newDate.getMonth() + 1;
        var d = newDate.getDate();
        if (Number(d) < 10 && Number(d) > 0) {
            d = "0" + d;
        }

        if (Number(m) < 10 && Number(m) > 0) {
            m = "0" + m;
        }
        const nowDate = y + "-" + m + "-" + d;

        return nowDate;
    }

    loadedDataTrue = () => {
        this.setState({
            dataloaded: true
        })
    }

    updateLogs = (path, data) => {
        console.log("updateData trig");
        console.log("path: " + path);
        if (path == 1){
            this.setState({
                weightlogs: [...this.state.weightlogs, ...data]
            })
        }

        if (path == 2){
            this.setState({
                cardiologs: [...this.state.cardiologs, ...data]
            })
        }

        if (path == 3){
            this.setState({
                bwlogs: [...this.state.bwlogs, ...data]
            })
        }

        if (path == 4){
            this.setState({
                vidslogs: [...this.state.vidslogs, ...data]
            })
        }
    }

    getLogs = (tab) => {
        console.log("getLogs tab: " + tab);
        var dateFilter = this.props.eventReducer.dateShortened;
        var newArr = [];
        var exercise;
        
        if (tab == 2) {
            console.log("tab2 is running");
            exercise = this.props.dataModifier.cardioLogs;
            exercise = exercise.filter((item) => item.date == dateFilter);
            exercise.forEach((data) => { data.collections.map((obj) => { newArr.push(obj)}) });
            this.setState({
                cardiologs: [...newArr]
            }, this.setState({
                dataloaded: true
            }));
        } 
        if (tab == 3) {
            console.log("tab3 is running");
            exercise = this.props.dataModifier.bwLogs;
            exercise = exercise.filter((item) => item.date == dateFilter);
            exercise.forEach((data) => { data.collections.map((obj) => { newArr.push(obj)}) });
            this.setState({
                bwlogs: [...newArr]
            }, this.setState({
                dataloaded: true
            }));
        }
        if (tab == 4) {
            console.log("tab4 is running");
            exercise = this.props.dataModifier.vidsLogs;
            exercise = exercise.filter((item) => item.date == dateFilter);
            exercise.forEach((data) => { data.collections.map((obj) => { newArr.push(obj)}) });
            this.setState({
                vidslogs: [...newArr]
            }, this.setState({
                dataloaded: true
            }));
        }
    }

    toggle = (tab) => {
        console.log("tab");
        console.log(tab);
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            }, () => {
                this.getLogs(tab);
            }
            )
        }
    };

    render() {
        const { activeTab, weightlogs, cardiologs, bwlogs, vidslogs } = this.state;
        console.log(activeTab);
        return (
            <React.Fragment>
                <Nav tabs>
                    <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}> Weightlifting
                    </NavLink> </NavItem>
                    <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}> Cardio
                    </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === '3' })}
                            onClick={() => { this.toggle('3'); }}> Bodyweight
                    </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === '4' })}
                            onClick={() => { this.toggle('4'); }}> Classes/Videos
                    </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <WeightsAdd tabIndex={this.state.activeTab} />
                    </TabPane>
                    <TabPane tabId="2">
                        <CardioAdd tabIndex={this.state.activeTab} />
                    </TabPane>
                    <TabPane tabId="3">
                        <BWAdd tabIndex={this.state.activeTab} />
                    </TabPane>
                    <TabPane tabId="4">
                        <ExVidsClassesAdd tabIndex={this.state.activeTab} />
                    </TabPane>
                    {activeTab == 1 && this.state.dataloaded && weightlogs.length > 0 && <GenerateTable msgUpdate={this.props.msgUpdate} logs={weightlogs} tabIndex={this.state.activeTab} />}
                    {activeTab == 2 && this.state.dataloaded && cardiologs.length > 0 && <GenerateTable msgUpdate={this.props.msgUpdate} cardiologs={cardiologs} tabIndex={this.state.activeTab} />}
                    {activeTab == 3 && this.state.dataloaded && bwlogs.length > 0 && <GenerateTable msgUpdate={this.props.msgUpdate} bwlogs={bwlogs} tabIndex={this.state.activeTab} />}
                    {activeTab == 4 && this.state.dataloaded && vidslogs.length > 0 && <GenerateTable msgUpdate={this.props.msgUpdate} vidslogs={vidslogs} tabIndex={this.state.activeTab} />}
                </TabContent>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    console.log('state');
    console.log(state);
    const { eventReducer, dataModifier } = state;
    return {
      eventReducer,
      dataModifier
    };
  }
  
  export default connect(mapStateToProps)(ModalTabs);
