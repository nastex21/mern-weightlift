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
        console.log(e.target.className);
        //get the className and remove the 'form-control' suffix at the end
        e.target.className = e.target.className.replace(' form-control', '');
        e.target.className = e.target.className.replace(' is-invalid', '');

        //if the className is in the array
        if (["exercise", "distance", "hours", "minutes"].includes(e.target.className)) {
            console.log(e.target.className);

            let collection = [...this.state.collection];
            //collection[location in array][exercise,distance, hours or minutes] = e.target.value

            //if the target.value is empty or it doesn't pass the test, then setState
            if (e.target.className == "distance") {
                e.target.value = +e.target.value;
                collection[e.target.dataset.id][e.target.className] = e.target.value;
                this.setState({ collection }, () => console.log(this.state.collection))
            } else if (e.target.className == "hours") {
                if (e.target.value == '') {
                    collection[e.target.dataset.id][e.target.className] = e.target.value;
                    this.setState({ collection }, () => console.log(this.state.collection))
                }
                collection[e.target.dataset.id][e.target.className] = e.target.value;
                this.setState({ collection }, () => console.log(this.state.collection))
            } else if (e.target.className == "minutes") {
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

        console.log("post is triggered")
        console.log(this.props.id);
        const { dispatch } = this.props;
        var options = { id: this.props.dataModifier.id, collection: this.state.collection, date: this.props.dataModifier.dateShortened, flag: 2 };

        dispatch(itemsConst.addItem(options));
        /* axios.post("/api/add-items", { id: this.props.dataModifier.id, collection: this.state.collection, date: this.state.date, cardioFlag: 1 })
            .then(response => {
                console.log(response);
                this.props.updateData(2,this.state.collection); 
            })
            .then(() => { this.props.refreshUser(); })
            .then(() => {
                console.log("form reset in submit button promise")
                this.setState({
                    collection: [{
                        exercise: "",
                        distance: "",
                        hours: "",
                        minutes: ""
                    }]
                })
            })
            .catch(error => {
                console.log("post /api/add-items error: ");
                console.log(error);
                const err = error.response.data;
                if (err.target == "name") {
                    this.setState({
                        invalidEx: true,
                        msg: err.msg
                    })
                }
                if (err.target == "distance") {
                    this.setState({
                        invalidDistance: true,
                        msg: err.msg
                    })
                }

                if (err.target == "hrs") {
                    this.setState({
                        invalidHrs: true,
                        msg: err.msg
                    })
                }

                if (err.target == "mins") {
                    this.setState({
                        invalidMins: true,
                        msg: err.msg
                    })
                }
            }); */

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
    console.log(state);
    const { eventReducer, dataModifier } = state;
    return {
        eventReducer,
        dataModifier
    };
}

export default connect(mapStateToProps)(CardioAdd);