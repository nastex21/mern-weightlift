import React, { Component } from 'react';
import { Form, FormGroup, FormFeedback, Label, Row, Col, Input, Button } from 'reactstrap';
import axios from 'axios';

class CardioAdd extends Component {
    state = {
        id: this.props.id,
        date: this.props.date,
        hours: "",
        minutes: "",
        collection: [{
            exercise: "",
            distance: "",
            hours: "",
            minutes: ""
        }]
    }

    //valadation for collection
    validateCollection = () => {
        //counter to keep track of errors. If at the end of the tests, the counter is not zero, don't proceed to axios.post
        var errCounter = 0; 
        //regex to search for numbers
        const re = /^\d+$\b/; 
        //find any error and stop test immediately
        this.state.collection.some(function (item) {
            //find empty strings
            if (item.exercise === '' || item.distance === '' || item.duration === '') {
                errCounter = 1;
            }
            //if it doesn't pass the regex test
            if (!re.test(item.distance)|| !re.test(item.duration)) {
                errCounter = 1;
            }
        });

        if (errCounter === 1) {
            this.props.msgUpdate(true);
            return false;
        } else {
            this.props.msgUpdate(false);
            return true;
        }

    }

//changes when keys are pressed
    handleChange = (e) => {
        console.log(e.target.className);
        //get the className and remove the 'form-control' suffix at the end
        e.target.className = e.target.className.replace(' form-control', '');
        //if the className is in the array
        if (["exercise", "distance", "hours", "minutes"].includes(e.target.className)) {
            let collection = [...this.state.collection];           
            //collection[location in array][exercise,distance or duration] = e.target.value
            collection[e.target.dataset.id][e.target.className] = e.target.value;
            //regex to look for number
            const re = /^\d+$\b/;
            console.log(re.test(e.target.value))
            //if the target.value is empty or it doesn't pass the test, then setState
            if (e.target.className == "distance" || e.target.className == "minutes" ) {
                if (e.target.value == '' || re.test(e.target.value)) {
                    this.setState({ collection }, () => console.log(this.state.collection))
                } 
                } else if (e.target.className == "hours"){
                    if (e.target.value == '' || re.test(e.target.value)) {
                        this.setState((prevState, props) =>  { return {hours: prevState.hours + e.target.value, collection }; }, () => console.log(this.state.collection))
                    } 
                } else {
                this.setState({ collection }, () => console.log(this.state.collection))
            }
        }
    }

    //grab the previous state of collection, add new object with empty values after
    addExercise = (e) => {
        this.setState((prevState) => ({
            collection: [...prevState.collection, { exercise: "", distance: "", reps: "", duration: "" }]
        })
        )
    }

    submit = (e) => {
        e.preventDefault();
        //if validateCollection is false, don't go on else post
        if (!this.validateCollection()) {
            console.log("can't go, error")
        } else {
            console.log("post is triggered")
       axios.post("/api/add-items", { id: this.state.id, collection: this.state.collection, date: this.state.date, cardioFlag: 1 })
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log("post /api/add-items error: ");
                    console.log(error);
                });  
        } 
    }
    

    render() {
        const { collection, hours, minutes } = this.state;
        console.log(hours);
        return (
            <Form onSubmit={this.submit}  onChange={this.handleChange}>                
                <Button onClick={this.addExercise}>Add Exercise</Button>
                {collection.map((val, idx) => {
                    let exId = `ex-${idx}`, distanceId = `distance-${idx}`, durationId = `duration-${idx}`, hrId = `hr-${idx}`, minId = `min-${idx}`;
                    return (
                        <div key={idx}>
                            <Row form>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for={exId}>{`Exercise #${idx + 1}`}</Label>
                                        <Input type="text" data-id={idx} name={exId} id={exId} value={collection[idx].exercise} className="exercise" placeholder="Name"  />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for={distanceId}>Distance</Label>
                                        <Input type="text" data-id={idx} name={distanceId} id={distanceId} value={collection[idx].distance} className="distance" placeholder="Number" />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for={durationId}>Duration</Label>
                                        <Row>
                                            <Col>
                                                <Input type="number" data-id={idx} name={hrId} id={hrId} min="0" value={collection[idx].hrId} className="hours" placeholder="Number" />
                                                <span>HR</span>
                                            </Col>
                                            <Col>
                                                <Input type="number" data-id={idx} name={minId} min="0" max={hours == "" || hours == 0 ? null : 59 } id={minId} value={collection[idx].minId} className="minutes" placeholder="Number" />
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
                <Input type="submit" value="Submit" />
            </Form>
        )
    }
}

export default CardioAdd;