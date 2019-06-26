import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import ModalTabs from './Table/modal-tabs';
import ModalEditDel from './Table/modal-edit-del';
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
        showError: false,
        color: ""
    }

    componentDidMount() {
        console.log(this.props.logs)
        let eventsArr = [];
        this.props.logs.map(function(item){
            if (item.collections.length > 0) {
                eventsArr.push({
                "title": "Entry Added",
                "date": item.date,
                "color": "red",
                "collections": item.collections
                })
            }
        })
        this.props.cardiologs.map(function(item){
            if (item.collections.length > 0){
                eventsArr.push({
                "title": "Entry Added",
                "date": item.date,
                'color': 'blue',
                "collections": item.collections
            })
        }
        });

        this.props.bwlogs.map(function(item){
            if(item.collections.length > 0){
                eventsArr.push({
                "title": "Entry Added",
                "date": item.date,
                'color': 'green',
                "collections": item.collections
            })
        }
        });

        this.props.vidslogs.map(function(item){
            if(item.collections.length > 0){
                eventsArr.push({
                "title": "Entry Added",
                "date": item.date,
                'color': 'black',
                "collections": item.collections
                })
            }
        });

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
        console.log('event');
        let val = info.event;

        let dateVal = "";

        let color = "";

        var exerciseArr = [];

        let totalWeight = [];

        let sum = "";

        if (val) {
            dateVal = val.start;
            
            color = val.backgroundColor;

            const dataExObj = info.event.extendedProps.collections;
            console.log(info.event.extendedProps.collections);

            dataExObj.forEach(function (item) {
                var total = Number(item.sets) * Number(item.reps) * Number(item.weight);
                totalWeight.push(total);
                exerciseArr.push(item);
            })

        }
        console.log(exerciseArr);

        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        this.setState(prevState => ({
            modal: !prevState.modal,
            date: dateVal.toLocaleString('en-US', options) == "Invalid Date" ? prevState.date : dateVal.toLocaleString('en-US', options),
            exercise: [...exerciseArr],
            total: sum,
            color: color
        }))

    }

    dateClickInfo = (info) => {
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
        const { exercise, modal, date, events, total, color } = this.state;
        console.log(color);
        return (
            <div className="calendar-body">
                <FullCalendar defaultView="dayGridMonth" timeZone='local' height="auto" displayEventTime="false" plugins={[dayGridPlugin, bootstrapPlugin, interactionPlugin]} themeSystem='bootstrap' selectable="true" dateClick={this.dateClickInfo} events={events} eventClick={this.toggle} />
                <Modal isOpen={modal} toggle={this.toggle} size="lg"  style={{maxWidth: '1600px', width: '80%'}} color={this.state.color}>
                    <ModalHeader toggle={this.toggle}>             
                         <p className="exerciseTitle">{this.state.color == "black" ? "Exercise videos and/or classes" : this.state.color == "red" ? "Weightlifting Exercises" : this.state.color == "blue" ? "Cardio Exercises" : this.state.color == "green" ? "Bodyweight Exercises" : null }</p>
                         <p className="dateTitle">{date}</p>
                    </ModalHeader>
                        <ModalBody>
                            {this.state.showError && <div class="alert alert-danger">
                                <button type="button" class="close" data-dismiss="alert" onClick={this.closeErr}>&times;</button> Uh-oh! Try changing a few things up and hit submit again.
                             </div>}
                            {this.state.exercise.length == 0 ? <ModalTabs id={this.props.id} date={date} msgUpdate={this.showErrorMsg} exerciseArr={exercise} color={color} /> :<ModalEditDel title={this.state.title} id={this.props.id} date={date} msgUpdate={this.showErrorMsg} exerciseArr={exercise} color={color} />}
                        </ModalBody>
                </Modal>
            </div>

                )
            }                                 
        }
        
export default Dashboard;