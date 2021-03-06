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
        //get the className and remove the 'form-control' suffix at the end
        e.target.className = e.target.className.replace(' form-control', '');
        e.target.className = e.target.className.replace(' is-invalid', '');

        if (e.target.className == 'completed form-check-input') {
            e.target.className = "completed";
        }

        //if the className is in the array
        if (["exercise", "hours", "minutes", "completed"].includes(e.target.className)) {
            let collection = [...this.state.collection];

            //if the target.value is empty or it doesn't pass the test, then setState
            if (e.target.className == "hours") {
                e.target.value = +e.target.value;
                if (e.target.value == '') {
                    if (!this.state.completed) {
                        collection[e.target.dataset.id][e.target.className] = e.target.value;
                        collection[e.target.dataset.id].completed = "false";
                        this.setState({ collection }, () => console.log(this.state.collection));
                    } else {
                        collection[e.target.dataset.id][e.target.className] = "";
                        collection[e.target.dataset.id].completed = "false";
                        this.setState({ collection }, () => console.log(this.state.collection));
                    }
                }
                collection[e.target.dataset.id][e.target.className] = e.target.value;
                collection[e.target.dataset.id].completed = "false";
                this.setState({ collection }, () => console.log(this.state.collection));
            } else if (e.target.className == "minutes") {
                e.target.value = +e.target.value;
                if (e.target.value == '' || e.target.value >= 0 && e.target.value < 60) {

                    if (!this.state.completed) {
                        collection[e.target.dataset.id][e.target.className] = e.target.value;
                        collection[e.target.dataset.id].completed = "false";
                        this.setState({ collection }, () => console.log(this.state.collection));
                    } else {
                        collection[e.target.dataset.id][e.target.className] = "";
                        collection[e.target.dataset.id].completed = "false";
                        this.setState({ collection }, () => console.log(this.state.collection));
                    }
                } else {
                    console.log("Error: Minutes to be less than 60")
                }
            } else {
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

        const { dispatch } = this.props;
        var options = { id: this.props.dataModifier.id, collection: this.state.collection, date: this.props.dataModifier.dateShortened, flag: 4 };
        dispatch(itemsConst.addItem(options))
            .then(() => this.setState({
                collection: [{
                    exercise: "",
                    hours: "",
                    minutes: "",
                    completed: "false"
                }]
            }))
            .catch(() => console.log("error"))
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
    const { eventReducer, dataModifier } = state;
    return {
        eventReducer,
        dataModifier
    };
}

export default connect(mapStateToProps)(ExVidsClassesAdd);