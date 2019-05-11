import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

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