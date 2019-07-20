import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import { itemsConst } from '../actions/items_actions';
import store from '../store/configureStore';
/*Components*/
import FullCalendar from '@fullcalendar/react';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import LeftPane from './Calendar/leftpane';
import ModalTabs from './Modal/modal-tabs';
import ModalEditDel from './Modal/modal-edit-del';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/bootstrap/main.css';


class Dashboard extends Component {
    state = {
        date: "",
        exercise: [],
        total: [],
        showError: false,
        color: "",
        msg: '',
        oldDate: "",
        updatedInfo: ""
    }

    componentDidMount() {
        var data = JSON.parse(localStorage.getItem('user'));
        
        this.props.dispatch(itemsConst.updateState(data));
    }

    closeModal = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        })
        )
    }

    showErrorMsg = (value, msgSent) => {
        if (value == true) {
            this.setState({
                msg: msgSent,
                showError: true
            })
        } else {
            this.setState({
                msg: '',
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

        /*   this.setState(prevState => ({
              date: dateVal.toLocaleString('en-US', options) == "Invalid Date" ? prevState.date : dateVal.toLocaleString('en-US', options),
              exercise: [...exerciseArr],
              total: sum,
              color: color,
              oldDate: prevState.date,
              oldExercise: prevState.exerciseArr
          })) */

        this.props.actions.closeModal();

    }

    dateClickInfo = (info) => {
        console.log("dateclickinfo");
        console.log(info);
        let val = info.event;
        let dateVal = new Date(info.date);
        var exerciseArr = [];
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        this.props.actions.openModal();
        /*  this.setState(prevState => ({
             exercise: [...exerciseArr],
             date: dateVal.toLocaleString('en-US', options),
         })) */

    }

    closeErr = () => {
        this.setState({
            showError: false
        })
    }


    render() {
        const { exercise, date, color } = this.state;
        console.log("this.props.modalisOpen");
        console.log(this.props);

        return (
            <div className="calendar-body">
                <LeftPane date={this.state.oldDate} exercise={this.state.updatedInfo} filterButton={this.props.filterButton} />
                <FullCalendar className="fcDiv bg-dark text-white" defaultView="dayGridMonth" timeZone='local' height="auto" displayEventTime="false" plugins={[dayGridPlugin, bootstrapPlugin, interactionPlugin]} themeSystem='bootstrap' selectable="true" dateClick={this.dateClickInfo} events={this.props.events} eventClick={this.toggle} />
                <Modal isOpen={this.props.modalIsOpen} toggle={this.toggle} size="lg" style={{ maxWidth: '1600px', width: '80%' }} color={this.state.color} onClosed={this.showErrorMsg}>
                    <ModalHeader toggle={this.toggle}>
                        <p className="exerciseTitle">{this.state.color == "#f0ad4e" ? "Exercise videos and/or classes" : this.state.color == "#d9534f" ? "Weightlifting Exercises" : this.state.color == "#0275d8" ? "Cardio Exercises" : this.state.color == "#5cb85c" ? "Bodyweight Exercises" : null}</p>
                        <p className="dateTitle">{date}</p>
                    </ModalHeader>
                    <ModalBody >
                        {this.state.showError && <div class="alert alert-danger">
                            <button type="button" class="close" data-dismiss="alert" onClick={this.closeErr}>&times;</button> <span>{this.state.msg}</span>
                        </div>}
                        {this.state.exercise.length == 0 ? <ModalTabs id={this.props.id} date={date} msgUpdate={this.showErrorMsg} weightlogs={this.props.logs} cardiologs={this.props.cardiologs} bwlogs={this.props.bwlogs} vidslogs={this.props.vidslogs} color={color} refreshUser={this.props.refreshUser} /> : <ModalEditDel title={this.state.title} id={this.props.id} date={date} msgUpdate={this.showErrorMsg} exerciseArr={exercise} color={color} refreshUser={this.props.refreshUser} />}
                    </ModalBody>
                </Modal>
            </div>

        )
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        modalIsOpen: state.modal.modalIsOpen
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    ...bindActionCreators(Actions , dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);