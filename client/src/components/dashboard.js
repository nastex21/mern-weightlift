import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import ModalTabs from './Table/modal-tabs';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/bootstrap/main.css';


class Dashboard extends Component {
    state = {
        events: [],
        modal: false,
        date: "",
        exercise: [],
        total: [],
        showError: false
    }

    componentDidMount() {
        let eventsArr = [];
        this.props.logs.map(item =>
            eventsArr.push({
                "title": "Entry Added",
                "date": item.date,
                "collections": item.collections
            })
        );
        this.props.cardiologs.map(item =>
            eventsArr.push({
                "title": "Entry Added",
                "date": item.date,
                'color': 'purple',
                "collections": item.collections
            })
        );
        this.setState({
            events: [...eventsArr],
        })
    }

    showErrorMsg = (value) => {
        if (value == true) {
            this.setState({
                showError: true
            })
        } else {
            this.setState({
                showError: false
            })
        }
    }


    toggle = (info) => {
        console.log("triggered");

        let val = info.event;

        let dateVal = "";

        var exerciseArr = [];

        let totalWeight = [];

        let sum = "";

        if (val) {
            dateVal = val.start;

            const dataExObj = info.event.extendedProps.collections;

            dataExObj.forEach(function (item) {
                var total = Number(item.sets) * Number(item.reps) * Number(item.weight);
                totalWeight.push(total);
                exerciseArr.push(item);
            })

            sum = totalWeight.reduce((total, amount) => total + amount);
        }


        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        console.log(exerciseArr.length);

        this.setState(prevState => ({
            modal: !prevState.modal,
            date: dateVal.toLocaleString('en-US', options) == "Invalid Date" ? prevState.date : dateVal.toLocaleString('en-US', options),
            exercise: [...exerciseArr],
            total: sum,
        }))

    }

    dateClickInfo = (info) => {
        console.log('triggered2');
        let dateVal = new Date(info.date);
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        this.setState(prevState => ({
            modal: !prevState.modal,
            date: dateVal.toLocaleString('en-US', options),
        }))

    }

    closeErr = () => {
        this.setState({
            showError: false
        })
    }

    render() {
        const { exercise, modal, date, events, total } = this.state;
        const styleObj = {
            textAlign: 'center'
        }
        return (
            <div className="calendar-body">
                <FullCalendar defaultView="dayGridMonth" timeZone='local' height="auto" displayEventTime="false" plugins={[dayGridPlugin, bootstrapPlugin, interactionPlugin]} themeSystem='bootstrap' selectable="true" dateClick={this.dateClickInfo} events={events} eventClick={this.toggle} />
                <Modal isOpen={modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>              
                         <p style={styleObj}>{this.state.date}</p>
                    </ModalHeader>
                        <ModalBody>
                            {this.state.showError && <div class="alert alert-danger">
                                <button type="button" class="close" data-dismiss="alert" onClick={this.closeErr}>&times;</button> Uh-oh! Try changing a few things up and hit submit again.
                        </div>}
                             <ModalTabs id={this.props.id} date={this.state.date} msgUpdate={this.showErrorMsg} exerciseArr={exercise} />
                        </ModalBody>
                </Modal>
            </div>

                )
            }
        }
        
export default Dashboard;