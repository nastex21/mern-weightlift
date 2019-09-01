import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import { setDate, filterEvent } from '../actions/items_actions';
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
        modal: false,
        date: "",
        id: this.props.dataModifier.id,
        total: [],
        showError: false,
        color: "",
        msg: '',
        oldDate: "",
        updatedInfo: "",
        modalVer: ''
    }

    componentDidMount() {
        var user = JSON.parse(localStorage.getItem('user'));
        var newId;
        if (user.data && !this.props.dataModifier.events.length) {
            newId = user.data.data._id;
            this.props.dispatch(userActions.getAll(newId ? newId : this.state.id));
        }
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

    modalToggle = () => {
        console.log("modalToggle");

        this.setState(prevState => ({
            modal: !prevState.modal
        })
        )
    }


    addToggleLP = (date) => {
        console.log(date);
    }

    toggle = (info) => {
        console.log('event');
        let val = info.event;

        let dateVal = "";

        let color = "";

        if (val) {
            dateVal = val.start;
            color = val.backgroundColor;
        }

        var now = new Date(dateVal);
        var y = now.getFullYear();
        var m = now.getMonth() + 1;
        var d = now.getDate();
        var hyphenDate = '' + y + "-" + (m < 10 ? '0' : '') + m + "-" + (d < 10 ? '0' : '') + d;

        this.setState(prevState => ({
            color: color,
            modalVer: 'false',
            modal: !prevState.modal
        }), () => this.state.modal == true ? this.props.dispatch(filterEvent(hyphenDate, dateVal, color)) : null
        )
    }


    dateClickInfo = (info) => {
        console.log("dateClickInfo");
        let dateVal = new Date(info.date);
        this.setState(prevState => ({
            modalVer: 'true',
            modal: !prevState.modal
        })
            , () => this.props.dispatch(setDate(dateVal, info.dateStr))
        )

    }

    closeErr = () => {
        this.setState({
            showError: false
        })
    }


    render() {
        const { color } = this.state;
        console.log("this.props.modalisOpen");
        console.log(this.props.dataModifier);
        const { weightFilterFlag, cardioFilterFlag, bwFilterFlag, vidsFilterFlag } = this.props.dataModifier;

        return (
            <div className="calendar-body">
                <LeftPane date={this.state.oldDate} exercise={this.state.updatedInfo} toggle={this.addToggleLP} />
                <FullCalendar className="fcDiv bg-dark text-white" defaultView="dayGridMonth" timeZone='local' height="auto" displayEventTime="false" eventOrder='display' plugins={[dayGridPlugin, bootstrapPlugin, interactionPlugin]} themeSystem='bootstrap' selectable="true" dateClick={this.dateClickInfo} events={weightFilterFlag || cardioFilterFlag || bwFilterFlag || vidsFilterFlag ? this.props.dataModifier.eventsFiltered : this.props.dataModifier.events} eventClick={this.toggle} />
                <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg" style={{ maxWidth: '1600px', width: '80%' }} color={color} onClosed={this.showErrorMsg}>
                    <ModalHeader toggle={this.toggle}>
                        <p className="exerciseTitle">{color == "#f0ad4e" ? "Exercise classes and/or videos" : color == "#d9534f" ? "Weightlifting Exercises" : color == "#0275d8" ? "Cardio Exercises" : color == "#5cb85c" ? "Bodyweight Exercises" : null}</p>
                        <p className="dateTitle">{this.props.dataModifier.dateText}</p>
                    </ModalHeader>
                    <ModalBody >
                        {this.state.showError && <div class="alert alert-danger">
                            <button type="button" class="close" data-dismiss="alert" onClick={this.closeErr}>&times;</button> <span>{this.state.msg}</span>
                        </div>}
                        {this.state.modalVer == "true" ? <ModalTabs msgUpdate={this.showErrorMsg} color={color} /> : null}
                        {this.state.modalVer == "false" && this.state.modal ? <ModalEditDel title={this.state.title} msgUpdate={this.showErrorMsg} /> : null}
                    </ModalBody>
                </Modal>
            </div>

        )
    }
}

function mapStateToProps(state) {
    console.log('state');
    console.log(state);
    const { alert, dataModifier } = state;
    return {
        alert,
        dataModifier
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);