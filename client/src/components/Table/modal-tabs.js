import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import WeightsAdd from './weight-components/table-body-add';
import CardioAdd from './cardio-components/table-body-add-cardio';
import BWAdd from './bodyweight-components/table-body-add-bw';
import ExVidsClassesAdd from './exercisevidsclasses-component/table-body-add-vidsclasses';
import GenerateTable from './generatetable';

class ModalTabs extends Component {

    state = {
        activeTab: '1',
        weightlogs: '',
        cardiologs: '',
        bwlogs: '',
        vidslogs: '',
        dataloaded: false
    };

    componentDidMount() {
        console.log("component mounted")
        const { weightlogs } = this.props;
        console.log(weightlogs);
        const newDate = this.createDate(this.props.date)
        var newArr = [];
        var exercise;
        exercise = weightlogs.filter((item) => item.date == newDate);
        exercise.forEach((data) => { data.collections.map((obj) => { newArr.push(obj)})});
        console.log(newArr);
  
        this.setState({
            weightlogs: newArr
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
        const { weightlogs, cardiologs, bwlogs, vidslogs } = this.state;
        console.log(weightlogs);
        const newDate = this.createDate(this.props.date)
        var newArr = [];
        var exercise;
        if (tab == 1) {
            console.log(weightlogs);

        }
        if (tab == 2) {
            exercise = this.props.cardiologs.filter((item) => item.date == newDate);
            exercise.forEach((data) => { data.collections.map((obj) => { newArr.push(obj)}) });
            this.setState({
                cardiologs: newArr
            })
        }
        if (tab == 3) {
            exercise = this.props.bwlogs.filter((item) => item.date == newDate);
            exercise.forEach((data) => { data.collections.map((obj) => { newArr.push(obj)}) });
            this.setState({
                bwlogs: newArr
            })
        }
        if (tab == 4) {
            exercise = this.props.vidslogs.filter((item) => item.date == newDate);
            exercise.forEach((data) => { data.collections.map((obj) => { newArr.push(obj)}) });
            this.setState({
                vidslogs: newArr
            })
        }
        console.log(newArr);

    }

    toggle = (tab) => {
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
        const { id, date, msgUpdate } = this.props;
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
                        <WeightsAdd id={id} updateData={this.updateLogs} date={date} msgUpdate={msgUpdate} tabIndex={this.state.activeTab} refreshUser={this.props.refreshUser} />
                    </TabPane>
                    <TabPane tabId="2">
                        <CardioAdd id={id} date={date} msgUpdate={msgUpdate} updateData={this.updateLogs} cardiologs={this.state.cardiologs} tabIndex={this.state.activeTab} refreshUser={this.props.refreshUser} />
                    </TabPane>
                    <TabPane tabId="3">
                        <BWAdd id={id} date={date} msgUpdate={msgUpdate} updateData={this.updateLogs} bwlogs={this.state.bwlogs} tabIndex={this.state.activeTab} refreshUser={this.props.refreshUser} />
                    </TabPane>
                    <TabPane tabId="4">
                        <ExVidsClassesAdd id={id} date={date} msgUpdate={msgUpdate} updateData={this.updateLogs} vidslogs={this.state.vidslogs} tabIndex={this.state.activeTab} refreshUser={this.props.refreshUser} />
                    </TabPane>
                    {activeTab == 1 && this.state.dataloaded && weightlogs.length > 0 && <GenerateTable id={this.props.id} date={this.props.date} msgUpdate={this.props.msgUpdate} logs={weightlogs} cardiologs={cardiologs} bwlogs={bwlogs} vidslogs={vidslogs} tabIndex={this.state.activeTab} />}
                    {activeTab == 2 && this.state.dataloaded && cardiologs.length > 0 && <GenerateTable id={this.props.id} date={this.props.date} msgUpdate={this.props.msgUpdate} logs={weightlogs} cardiologs={cardiologs} bwlogs={bwlogs} vidslogs={vidslogs} tabIndex={this.state.activeTab} />}
                    {activeTab == 3 && this.state.dataloaded && bwlogs.length > 0 && <GenerateTable id={this.props.id} date={this.props.date} msgUpdate={this.props.msgUpdate} logs={weightlogs} cardiologs={cardiologs} bwlogs={bwlogs} vidslogs={vidslogs} tabIndex={this.state.activeTab} />}
                    {activeTab == 4 && this.state.dataloaded && vidslogs.length > 0 && <GenerateTable id={this.props.id} date={this.props.date} msgUpdate={this.props.msgUpdate} logs={weightlogs} cardiologs={cardiologs} bwlogs={bwlogs} vidslogs={vidslogs} tabIndex={this.state.activeTab} />}
                </TabContent>
            </React.Fragment>
        )
    }
}

export default ModalTabs;