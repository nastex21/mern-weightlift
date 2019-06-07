import React, { Component } from 'react';
import { Button, TabContent, TabPane, Nav, NavItem, NavLink, Col, Row, Card, CardTitle, CardText,  } from 'reactstrap';
import classnames from 'classnames';
import WeightsAdd from './weight-components/table-body-add';
import CardioAdd from './cardio-components/table-body-add-cardio';

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
        const { id, date, exerciseArr, msgUpdate } = this.props;
        return (
            <React.Fragment>
            <Nav tabs>
                <NavItem>
                    <NavLink className={classnames({ active: this.state.activeTab === '1' })}
                        onClick={() => { this.toggle('1'); }}> WeightLifting
                    </NavLink> </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: this.state.activeTab === '2' })}
                        onClick={() => { this.toggle('2'); }}> Cardio
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                    <WeightsAdd id={id} date={date} msgUpdate={msgUpdate} />
                </TabPane>
                <TabPane tabId="2">
                    <CardioAdd />
                </TabPane>
            </TabContent>
            </React.Fragment>
        )}
        }

export default ModalTabs;