import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';

class Dashboard extends Component {

    render() {
        const logs = this.props.logs;
        console.log(logs);
        return (
            <FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin ]} />
          )

    }
}

export default Dashboard;