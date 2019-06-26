import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import WeightsAdd from './weight-components/table-body-add';
import CardioAdd from './cardio-components/table-body-add-cardio';
import BWAdd from './bodyweight-components/table-body-add-bw';
import ExVidsClassesAdd from './exercisevidsclasses-component/table-body-add-vidsclasses';

class ModalTabs extends Component {

    state = {
        activeTab: '1'
    };

    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        console.log(this.props);
        const { id, date, msgUpdate } = this.props;
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
                        <WeightsAdd id={id} date={date} msgUpdate={msgUpdate} />
                    </TabPane>
                    <TabPane tabId="2">
                        <CardioAdd id={id} date={date} msgUpdate={msgUpdate} />
                    </TabPane>
                    <TabPane tabId="3">
                        <BWAdd id={id} date={date} msgUpdate={msgUpdate} />
                    </TabPane>
                    <TabPane tabId="4">
                        <ExVidsClassesAdd id={id} date={date} msgUpdate={msgUpdate} />
                    </TabPane>
                </TabContent>
            </React.Fragment>
        )
    }
}

export default ModalTabs;