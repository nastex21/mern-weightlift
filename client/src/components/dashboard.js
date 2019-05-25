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
        date: null,
        exercise: [],
        total: []
    }

    componentDidMount() {
        const logsArr = this.props.logs;

        logsArr.forEach((item) => {
            for (let key in item) {
                if (key == "date") {
                    let newDay = item[key];
                    let dateVal = new Date(newDay).toISOString().slice(0, 10);
                    item[key] = dateVal;
                }
            }
        })

        this.setState({
            events: [...this.state.events, ...logsArr],
        })
    }


    toggle = (info) => {
        console.log("triggered");

        const exerciseObj = {
            name: "",
            sets: "",
            reps: "",
            weight: ""
        }

        let val = info.event;
        const arr = [];
        let totalWeight = "";

        let dateVal = "";
        if (val) {
            dateVal = val.start;
            const exerciseItems = info.event.extendedProps;
            exerciseObj.name = exerciseItems.name;
            exerciseObj.sets = exerciseItems.sets;
            exerciseObj.reps = exerciseItems.reps;
            exerciseObj.weight = exerciseItems.weight;
            totalWeight = Number(exerciseItems.sets) * Number(exerciseItems.reps) * Number(exerciseItems.weight);
            arr.push(exerciseObj);
        }

        dateVal = new Date(dateVal);
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        this.setState(prevState => ({
            modal: !prevState.modal,
            date: dateVal.toLocaleString('en-US', options) == "Invalid Date" ? prevState.date : dateVal.toLocaleString('en-US', options),
            exercise: [...arr],
            total: [...this.state.total, totalWeight]
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
        console.log(this.state.exercise);
        return (
            <div className="calendar-body">
                <FullCalendar defaultView="dayGridMonth" height="auto" plugins={[dayGridPlugin, bootstrapPlugin, interactionPlugin]} themeSystem='bootstrap' selectable="true" dateClick={this.dateClickInfo} events={this.state.events} eventClick={this.toggle} />
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>{<p>{this.state.date}</p>}</ModalHeader>
                    <ModalBody>
                        <p className="headerInfo">Total = Sets * Reps * Weight</p>
                        <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Exercise</th>
                                <th scope="col">Sets</th>
                                <th scope="col">Reps</th>
                                <th scope="col">Weight</th>
                                <th scope="col">Total</th> 
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.exercise.map(item => 
                                <tr className="table-active">
                                    <th scope="row">{item.name}</th>
                                        <td>{item.sets}</td>
                                        <td>{item.reps}</td>
                                        <td>{item.weight}</td>
                                        <td>{Number(item.sets) * Number(item.reps) * Number(item.weight)}</td>
                                </tr>
                            )}
                        </tbody>
                        </table>
                    </ModalBody>
                </Modal>
            </div>

                    )
                }
            }
            
export default Dashboard;