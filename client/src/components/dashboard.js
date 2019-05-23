import React, { Component, Fragment } from 'react';
import FullCalendar from '@fullcalendar/react';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/bootstrap/main.css';


class Dashboard extends Component {
    state = {
        events: [],
        modal: false
    }

    componentDidMount() {
        const titleConst = "Entry Added"
        const newEvents = [{ title: titleConst, date: '2019-05-01' },
        { title: titleConst, date: '2019-05-20' }];
        this.setState({
            events: [...this.state.events, ...newEvents]
        })
        console.log(this.state.events);
    }

    test = (info) => {
        alert('Clicked on: ' + info.dateStr)
    }

    toggle = () => {
        console.log("triggered")
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        const logs = this.props.logs;
        console.log(logs);
        console.log(this.state.events);
        return (
            <div>
                <FullCalendar defaultView="dayGridMonth" height="auto" plugins={[dayGridPlugin, bootstrapPlugin, interactionPlugin]} themeSystem='bootstrap' selectable="true" dateClick={this.test} events={this.state.events} eventClick={this.toggle} />  
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Test</ModalHeader>
                    <ModalBody>TEST</ModalBody>
                </Modal>
            </div>

        )
    }
}

export default Dashboard;