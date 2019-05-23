import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/bootstrap/main.css';


class Dashboard extends Component {
    state = {
        events: []
    }

    componentDidMount(){
        const newEvents =  [{ title: 'event 1', date: '2019-05-01' },
        { title: 'event 2', date: '2019-05-20' }];
        this.setState ({
            events: [...this.state.events, ...newEvents]
        })        
        console.log(this.state.events);
    }

    test = (info) => {
        alert('Clicked on: ' + info.dateStr)
    }

    eventClicky = (info) => {
        alert('Event: ' + info.event.title);
    }

    render() {
        const logs = this.props.logs;
        console.log(logs);
        console.log(this.state.events);
        return (
            <FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin, bootstrapPlugin, interactionPlugin ]} themeSystem='bootstrap' selectable="true"  dateClick={this.test}   events={this.state.events} eventClick={this.eventClicky} />
          )

    }
}

export default Dashboard;