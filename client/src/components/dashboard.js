import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import { updateState, setDate } from '../actions/items_actions';
import { userActions } from '../actions/user_actions';
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
        id: this.props.id,
        exercise: this.props.events.events,
        total: [],
        showError: false,
        color: "",
        msg: '',
        oldDate: "",
        updatedInfo: ""
        }

     componentDidMount() {
        console.log('mounter');
        console.log(this.props.id);
        var user = JSON.parse(localStorage.getItem('user'));
        var newId; 
        if (user.data){
            newId = user.data.id;
        }
        this.props.dispatch(userActions.getAll(newId ? newId : this.state.id));
    }  

    closeModal = () => {
        this.props.closeModal();
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
                exerciseArr.push(item);
            })

        }
        console.log(exerciseArr);

        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        console.log(dateVal.toLocaleString('en-US', options));

        //this.props.dispatch(setDate(date));

        this.setState(prevState => ({
            date: dateVal.toLocaleString('en-US', options) == "Invalid Date" ? prevState.date : dateVal.toLocaleString('en-US', options),
            total: sum,
            color: color,
            oldDate: prevState.date,
        }), this.props.closeModal
        )
    }

    dateClickInfo = (info) => {

        let dateVal = new Date(info.date);

        this.props.dispatch(setDate(dateVal, info.dateStr));
        this.props.openModal();
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
                <FullCalendar className="fcDiv bg-dark text-white" defaultView="dayGridMonth" timeZone='local' height="auto" displayEventTime="false" plugins={[dayGridPlugin, bootstrapPlugin, interactionPlugin]} themeSystem='bootstrap' selectable="true" dateClick={this.dateClickInfo} events={this.props.dataModifier.events} eventClick={this.toggle} />
                <Modal isOpen={this.props.modalIsOpen} toggle={this.toggle} size="lg" style={{ maxWidth: '1600px', width: '80%' }} color={this.state.color} onClosed={this.showErrorMsg}>
                    <ModalHeader toggle={this.toggle}>
                        <p className="exerciseTitle">{this.state.color == "#f0ad4e" ? "Exercise videos and/or classes" : this.state.color == "#d9534f" ? "Weightlifting Exercises" : this.state.color == "#0275d8" ? "Cardio Exercises" : this.state.color == "#5cb85c" ? "Bodyweight Exercises" : null}</p>
                        <p className="dateTitle">{this.props.eventReducer.dateText}</p>
                    </ModalHeader>
                    <ModalBody >
                        {this.state.showError && <div class="alert alert-danger">
                            <button type="button" class="close" data-dismiss="alert" onClick={this.closeErr}>&times;</button> <span>{this.state.msg}</span>
                        </div>}
                        {this.state.exercise.length == 0 ? <ModalTabs msgUpdate={this.showErrorMsg} color={color} refreshUser={this.props.refreshUser} /> : <ModalEditDel title={this.state.title} date={date} msgUpdate={this.showErrorMsg} exerciseArr={exercise} color={color} refreshUser={this.props.refreshUser} />}
                    </ModalBody>
                </Modal>
            </div>

        )
    }
}

function mapStateToProps(state) {
    console.log('state');
    console.log(state);
    const { loggedIn, user, id } = state.authenticate;
    const { alert, dataModifier, eventReducer } = state;
    return {
        modalIsOpen: state.modal.modalIsOpen,
        loggedIn,
        user,
        alert,
        dataModifier,
        eventReducer,
        id
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);