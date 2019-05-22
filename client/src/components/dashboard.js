import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/bootstrap/main.css';


class Dashboard extends Component {

    test = (info) => {
        alert('Clicked on: ' + info.dateStr)
    }

    render() {
        const logs = this.props.logs;
        console.log(logs);
        return (
            <FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin, bootstrapPlugin, interactionPlugin ]} themeSystem='bootstrap' selectable="true"  dateClick={this.test} />
          )

    }
}

export default Dashboard;