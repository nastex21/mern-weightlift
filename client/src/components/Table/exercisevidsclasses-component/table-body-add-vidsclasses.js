import React, { Component } from 'react';
import { Form, FormGroup, Label, Row, Col, Input, Button, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { itemsConst } from '../../../actions/items_actions';

class ExVidsClassesAdd extends Component {
    state = {
        collection: [{
            exercise: '',
            hours: '',
            minutes: '',
            completed: 'false'
        }],
        completed: false,
        invalidEx: false,
        invalidHrs: false,
        invalidMins: false,
        msg: ''
    }

    //changes when keys are pressed
    handleChange = (e) => {
        console.log(e.target.checked);
        console.log('triggered handleChange');
        //get the className and remove the 'form-control' suffix at the end
        e.target.className = e.target.className.replace(' form-control', '');
        e.target.className = e.target.className.replace(' is-invalid', '');

        console.log(e.target.className);
        if (e.target.className == 'completed form-check-input') {
            e.target.className = "completed";
        }

        console.log(e.target.className);
        //if the className is in the array
        if (["exercise", "hours", "minutes", "completed"].includes(e.target.className)) {
            let collection = [...this.state.collection];

            console.log(e.target.className);
            //if the target.value is empty or it doesn't pass the test, then setState
            if (e.target.className == "hours") {
                if (e.target.value == '') {
                    if (!this.state.completed) {
                        console.log('2')
                        collection[e.target.dataset.id][e.target.className] = e.target.value;
                        collection[e.target.dataset.id].completed = "false";
                        this.setState({ collection }, () => console.log(this.state.collection));
                    } else {
                        console.log('3')                        
                        collection[e.target.dataset.id][e.target.className] = "";
                        collection[e.target.dataset.id].completed = "false";
                        this.setState({ collection }, () => console.log(this.state.collection));
                    }
                }
                console.log('4')
                collection[e.target.dataset.id][e.target.className] = e.target.value;
                collection[e.target.dataset.id].completed = "false";
                this.setState({ collection }, () => console.log(this.state.collection));
            } else if (e.target.className == "minutes") {
                if (e.target.value == '' || e.target.value >= 0 && e.target.value < 60) {
               
                   if (!this.state.completed) {
                        console.log('6')
                        collection[e.target.dataset.id][e.target.className] = e.target.value;
                        collection[e.target.dataset.id].completed = "false";
                        this.setState({ collection }, () => console.log(this.state.collection));
                    } else {
                        console.log('7')
                        collection[e.target.dataset.id][e.target.className] = "";
                        collection[e.target.dataset.id].completed = "false";
                        this.setState({ collection }, () => console.log(this.state.collection));
                    }
                } else {
                    console.log("Error: Minutes to be less than 60")
                }
            } else {
                console.log('8')
                if (["exercise"].includes(e.target.className)) {
                    collection[e.target.dataset.id].exercise = e.target.value;
                }
                if (['completed'].includes(e.target.className)) {
                    collection[e.target.dataset.id].completed = e.target.checked;
                }
                delete collection[e.target.dataset.id].hours;
                delete collection[e.target.dataset.id].minutes;
                this.setState({ collection }, () => console.log(this.state.collection));
            }
        }
    }

    submit = (e) => {
        e.preventDefault();

        console.log('table-body-vidsclasses');
        const { dispatch } = this.props;
        var options = { id: this.props.dataModifier.id, collection: this.state.collection, date: this.props.eventReducer.dateShortened, flag: 4 };

        dispatch(itemsConst.addItem(options));
  /*       axios.post("/api/add-items", { id: this.state.id, collection: this.state.collection, date: this.state.date, completed: this.state.completed, vidsFlag: 1 })
            .then(response => {
                console.log(response);
                this.props.updateData(4,this.state.collection); 
            })
            .then(() => { this.props.refreshUser(); })
            .then(() => {
                console.log("form reset in submit button promise")
                this.setState({
                    collection: [{
                        exercise: "",
                        hours: '',
                        minutes: '',
                        completed: ''
                    }]
                })
            })
            .catch((error) => {
                console.log(error);
                console.log(error.response);
                if (error.response.data.target == "name") {
                    this.setState({
                        invalidEx: true,
                        msg: error.response.data.msg
                    })
                } else if (error.response.data.target == "hrs") {
                    this.setState({
                        invalidHrs: true,
                        msg: error.response.data.msg
                    })
                } else if (error.response.data.target == "mins") {
                    this.setState({
                        invalidMins: true,
                        msg: error.response.data.msg
                    })
                } else {
                    this.setState({
                        msg: error.response.data.msg
                    })
                } 
            }); */
    }


    toggleCheckBox = () => {
        this.setState(prevState => ({ completed: !prevState.completed }))
    }


    render() {
        const { id, collection, completed } = this.state;

        return (
            <Form onSubmit={this.submit} onChange={this.handleChange}>
                  {this.state.msg ? (
                    <Alert color='danger'>{this.state.msg}</Alert>
                ) : null}
                {collection.map((val, idx) => {
                    let exId = `ex-${idx}`, hrId = `hr-${idx}`, minId = `min-${idx}`, completedId = `comp-${idx}`;
                    return (
                        <div key={id + idx}>
                            <Row form>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for={exId}>{`Exercise #${idx + 1}`}</Label>
                                        <Input invalid={this.state.invalidEx} type="text" data-id={idx} name={exId} id={exId} value={collection[idx].exercise} className="exercise" placeholder="Name" />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup disabled={completed}>
                                        <Row>
                                            <Col md={6}>
                                                <Label />
                                                <Input invalid={this.state.invalidHrs} type="tel" data-id={idx} name={hrId} id={hrId} value={isNaN(collection[idx].hours) ? '' : collection[idx].hours} className="hours" placeholder="Number" disabled={completed} />
                                                <span>HR</span>
                                            </Col>
                                            <Col md={6}>
                                                <Label />
                                                <Input invalid={this.state.invalidMins} type="tel" data-id={idx} name={minId} id={minId} value={isNaN(collection[idx].minutes) ? '' : collection[idx].minutes} className="minutes" placeholder="Number" disabled={completed} />
                                                <span>MIN</span>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup check>
                                        <Label check >
                                            <Input type="checkbox" data-id={idx} name={completedId} id={completedId} className="completed" value={!completed} onChange={this.handleChange} onClick={this.toggleCheckBox} />{' '}
                                            Completed
                                        </Label>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
                    )
                }
                )}
                <Button onClick={this.submit} block>Add Exercise</Button>
            </Form>
        )
    }
}

function mapStateToProps(state) {
    console.log('state');
    console.log(state);
    const { loggedIn } = state.authenticate;
    const { eventReducer, dataModifier } = state;
    return {
        loggedIn,
        eventReducer,
        dataModifier
    };
  }
    
export default connect(mapStateToProps)(ExVidsClassesAdd);