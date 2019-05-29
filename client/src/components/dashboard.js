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
        date: "",
        exercise: [],
        total: []
    }

    componentDidMount() {
      let eventsArr = [];
      this.props.logs.map(item => eventsArr.push({
            "title": item.events[0].title,
            "date": item.events[0].date,
            "collections": item.events[0].collections
        }
    )
        ); 

        this.setState({
            events: [...eventsArr]   
        })
    }


    toggle = (info) => {
        console.log("triggered");
        console.log(info.event);

        let val = info.event;

        let dateVal = "";

        var exerciseArr = [];

        let totalWeight = [];

        let sum = "";

        if (val) {
            dateVal = val.start;

            const dataExObj = info.event.extendedProps.collections;

            dataExObj.forEach(function(item){
                 console.log(item);
                 var total = Number(item.sets) * Number(item.reps) * Number(item.weight);
                 console.log(total);
                 totalWeight.push(total);
                 exerciseArr.push(item);
                })

            sum = totalWeight.reduce((total, amount) => total + amount); 
            }


        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        this.setState(prevState => ({
            modal: !prevState.modal,
            date: dateVal.toLocaleString('en-US', options) == "Invalid Date" ? prevState.date : dateVal.toLocaleString('en-US', options),
            exercise: [...exerciseArr],
            total: sum
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
        console.log(this.state.events);
        console.log(this.state.exercise);
        console.log(this.state.date);
        return (
            <div className="calendar-body">
                <FullCalendar defaultView="dayGridMonth" timeZone='local' height="auto" displayEventTime="false" plugins={[dayGridPlugin, bootstrapPlugin, interactionPlugin]} themeSystem='bootstrap' selectable="true" dateClick={this.dateClickInfo} events={this.state.events} eventClick={this.toggle} />
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
                                    <th scope="row">{item.exercise}</th>
                                        <td>{item.sets}</td>
                                        <td>{item.reps}</td>
                                        <td>{item.weight}</td>
                                        <td>{Number(item.sets) * Number(item.reps) * Number(item.weight)}</td>
                                </tr>
                            )}
                            <tr className="table-active">
                                    <th scope="row">Day Total</th>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>{this.state.total}</td>
                                </tr>
                        </tbody>
                        </table>
                    </ModalBody>
                </Modal>
            </div>

                    )
                }
            }
            
export default Dashboard;