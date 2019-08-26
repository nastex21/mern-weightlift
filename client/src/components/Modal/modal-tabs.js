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
    };


    toggle = (tab) => {
        console.log("tab");
        console.log(tab);
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            }
            )
        }
    };

    render() {
        const { activeTab } = this.state;
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
                    {activeTab == 1 && <GenerateTable msgUpdate={this.props.msgUpdate} tabIndex={this.state.activeTab} />}
                    {activeTab == 2 && <GenerateTable msgUpdate={this.props.msgUpdate} tabIndex={this.state.activeTab} />}
                    {activeTab == 3 && <GenerateTable msgUpdate={this.props.msgUpdate} tabIndex={this.state.activeTab} />}
                    {activeTab == 4 && <GenerateTable msgUpdate={this.props.msgUpdate} tabIndex={this.state.activeTab} />}
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
