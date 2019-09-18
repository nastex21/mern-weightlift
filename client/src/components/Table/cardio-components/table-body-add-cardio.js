import React, { Component } from 'react';
import { Form, FormGroup, Label, Row, Col, Input, Button, Alert } from 'reactstrap';
import { itemsConst } from '../../../actions/items_actions';
import { connect } from 'react-redux';

class CardioAdd extends Component {
    state = {
        collection: [{
            exercise: "",
            distance: "",
            hours: "",
            minutes: ""
        }],
        invalidEx: false,
        invalidDistance: false,
        invalidHrs: false,
        invalidMins: false,
        msg: ''
    }

    //changes when keys are pressed
    handleChange = (e) => {
        //get the className and remove the 'form-control' suffix at the end
        e.target.className = e.target.className.replace(' form-control', '');
        e.target.className = e.target.className.replace(' is-invalid', '');

        //if the className is in the array
        if (["exercise", "distance", "hours", "minutes"].includes(e.target.className)) {

            let collection = [...this.state.collection];
            //collection[location in array][exercise,distance, hours or minutes] = e.target.value

            //if the target.value is empty or it doesn't pass the test, then setState
            if (e.target.className == "distance") {
                e.target.value = +e.target.value;
                collection[e.target.dataset.id][e.target.className] = e.target.value;
                this.setState({ collection }, () => console.log(this.state.collection))
            } else if (e.target.className == "hours") {
                e.target.value = +e.target.value;
                if (e.target.value == '') {
                    collection[e.target.dataset.id][e.target.className] = e.target.value;
                    this.setState({ collection }, () => console.log(this.state.collection))
                }
                collection[e.target.dataset.id][e.target.className] = e.target.value;
                this.setState({ collection }, () => console.log(this.state.collection))
            } else if (e.target.className == "minutes") {
                e.target.value = +e.target.value;
                if (e.target.value == '' || e.target.value >= 0 && e.target.value < 60) {
                    collection[e.target.dataset.id][e.target.className] = e.target.value;
                    this.setState({ collection }, () => console.log(this.state.collection))
                } else {
                    console.log("Error: Minutes to be less than 60")
                }
            } else {
                collection[e.target.dataset.id][e.target.className] = e.target.value;
                this.setState({ collection }, () => console.log(this.state.collection))
            }
        }
    }

    submit = (e) => {
        //e.target.value = e.target.value.replace(/^0+/, ''); -- get rid of leading zeroes
        e.preventDefault();

        const { dispatch } = this.props;
        var options = { id: this.props.dataModifier.id, collection: this.state.collection, date: this.props.dataModifier.dateShortened, flag: 2 };

        dispatch(itemsConst.addItem(options))
            .then(() => this.setState({
                collection: [{
                    exercise: "",
                    distance: "",
                    hours: "",
                    minutes: ""
                }]
            }))
            .catch(() => console.log("error"));
    }


    render() {
        const { id, collection } = this.state;

        return (
            <Form onSubmit={this.submit} onChange={this.handleChange}>
                {this.state.msg ? (
                    <Alert color='danger'>{this.state.msg}</Alert>
                ) : null}
                {collection.map((val, idx) => {
                    let exId = `ex-${idx}`, distanceId = `distance-${idx}`, durationId = `duration-${idx}`, hrId = `hr-${idx}`, minId = `min-${idx}`;
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
                                    <FormGroup>
                                        <Label for={distanceId}>Distance</Label>
                                        <Input invalid={this.state.invalidDistance} type="number" data-id={idx} name={distanceId} id={distanceId} value={collection[idx].distance} className="distance" placeholder="Number" />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for={durationId}>Duration</Label>
                                        <Row>
                                            <Col>
                                                <Input invalid={this.state.invalidHrs} type="tel" data-id={idx} name={hrId} id={hrId} value={collection[idx].hours} className="hours" placeholder="Number" />
                                                <span>HR</span>
                                            </Col>
                                            <Col>
                                                <Input invalid={this.state.invalidMins} type="tel" data-id={idx} name={minId} id={minId} value={collection[idx].minutes} className="minutes" placeholder="Number" />
                                                <span>MIN</span>
                                            </Col>
                                        </Row>
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
    const { eventReducer, dataModifier } = state;
    return {
        eventReducer,
        dataModifier
    };
}

export default connect(mapStateToProps)(CardioAdd);