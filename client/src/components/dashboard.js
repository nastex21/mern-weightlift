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
        modal: false,
        date: null
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

    toggle = (info) => {
        console.log("triggered");
  
        let val = info.event
        let dateVal = "";
        if (val) {
            dateVal = val.start;
        }

        dateVal = new Date(dateVal);
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        this.setState(prevState => ({
            modal: !prevState.modal,
            date: dateVal.toLocaleString('en-US', options)  == "Invalid Date" ? prevState.modal : dateVal.toLocaleString('en-US', options)
        }))

    }

    dateClickInfo = (info) => {
        let dateVal = new Date(info.date);
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        console.log(dateVal.toLocaleString('en-US', options));
        this.setState(prevState => ({
            modal: !prevState.modal,
            date: dateVal.toLocaleString('en-US', options)
        }))

    }

    render() {
        const logs = this.props.logs;
        console.log(logs);
        console.log(this.state.events);
        console.log(this.state.date);
        return (
            <div className="calendar-body">
                <FullCalendar defaultView="dayGridMonth" height="auto" plugins={[dayGridPlugin, bootstrapPlugin, interactionPlugin]} themeSystem='bootstrap' selectable="true" dateClick={this.dateClickInfo} events={this.state.events} eventClick={this.toggle} />
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>{<p>{this.state.date}</p>}</ModalHeader>
                    <ModalBody>TEST</ModalBody>
                </Modal>
            </div>

        )
    }
}

export default Dashboard;