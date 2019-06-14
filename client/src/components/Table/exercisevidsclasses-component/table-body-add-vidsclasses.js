import React, { Component } from 'react';
import { Form, FormGroup, FormFeedback, Label, Row, Col, Input, Button, CustomInput } from 'reactstrap';
import axios from 'axios';

class ExVidsClassesAdd extends Component {
    state = {
        id: this.props.id,
        date: this.props.date,
        collection: [{
        }],
        completed: false
    }

    //valadation for collection
    validateCollection = () => {
        //counter to keep track of errors. If at the end of the tests, the counter is not zero, don't proceed to axios.post
        var errCounter = 0;
        //regex to search for numbers
        const re = /^\d+$\b/;
        //find any error and stop test immediately
        console.log(this.state.completed);
        
        if (this.state.completed == false) {
            this.state.collection.some(function (item) {
                console.log(item.hours)
                //find empty strings
                if (item.exercise === '' || item.hours === '' || item.minutes === '') {
                    errCounter = 1;
                }

                if(item.hours == undefined || item.minutes == undefined){
                    console.log("Hours and minutes can't both be zero")
                    errCounter = 1;
                }
                //if it doesn't pass the regex test
                if (!re.test(item.hours) || !re.test(item.minutes)) {
                    errCounter = 1;
                }
            });
        } else {
            this.state.collection.some(function (item) {
                //find empty strings
                if (item.exercise === '') {
                    console.log("found!")
                    errCounter = 1;
                }
            });
        }

        this.state.collection.forEach(function(item){
            if (item.hours == 0 && item.minutes == 0){
                errCounter = 1;
                console.log("hours and minutes can't be zero")
            }
        })

        if (errCounter === 1) {
            this.props.msgUpdate(true);
            return true;
        } else {
            this.props.msgUpdate(false);
            return false;
        }
    }

    //changes when keys are pressed
    handleChange = (e) => {
        //get the className and remove the 'form-control' suffix at the end
        e.target.className = e.target.className.replace(' form-control', '');

        console.log(e.target.className);
        if (e.target.className == 'completed form-check-input') {
            e.target.className = "completed";
        }

        console.log(e.target.className);
        //if the className is in the array
        if (["exercise", "hours", "minutes", "completed"].includes(e.target.className)) {
            let collection = [...this.state.collection];

            if (e.target.value == "true") {
                collection[e.target.dataset.id][e.target.className] = e.target.value;
                delete collection[e.target.dataset.id].hours;
                delete collection[e.target.dataset.id].minutes;
                this.setState({ collection }, () => console.log(this.state.collection));
            }

            //if the target.value is empty or it doesn't pass the test, then setState
            if (e.target.className == "hours") {
                e.target.value = parseInt(e.target.value, 10) 
                if (e.target.value == '') {
                    if (!this.state.completed) {
                        collection[e.target.dataset.id][e.target.className] = e.target.value;
                        this.setState({ collection }, () => console.log(this.state.collection));
                    } else {
                        collection[e.target.dataset.id][e.target.className] = "";
                        this.setState({ collection }, () => console.log(this.state.collection));
                    }
                }

                collection[e.target.dataset.id][e.target.className] = e.target.value;
                this.setState({ collection }, () => console.log(this.state.collection));
            } else if (e.target.className == "minutes") {
                if (e.target.value == '' || e.target.value >= 0 && e.target.value < 60) {
                    e.target.value = parseInt(e.target.value, 10) 
                    if (!this.state.completed) {
                        collection[e.target.dataset.id][e.target.className] = e.target.value;
                        this.setState({ collection }, () => console.log(this.state.collection));
                    } else {
                        collection[e.target.dataset.id][e.target.className] = "";
                        this.setState({ collection }, () => console.log(this.state.collection));
                    }
                } else {
                    console.log("Error: Minutes to be less than 60")
                }
            } else {
                collection[e.target.dataset.id][e.target.className] = e.target.value;
                this.setState({ collection }, () => console.log(this.state.collection))
            }
        }
    }

    //grab the previous state of collection, add new object with empty values after
    addExercise = (e) => {
        this.setState((prevState) => ({
            collection: [...prevState.collection, { exercise: "", hours: "", minutes: "", completed: false }]
        })
        )
    }

    submit = (e) => {
        e.preventDefault();
        //if validateCollection is false, don't go on else post
        if (!this.validateCollection()) {
            console.log("can't go, error")
        } else {
           /*  console.log("post is triggered")
             axios.post("/api/add-items", { id: this.state.id, collection: this.state.collection, date: this.state.date, vidsFlag: 1 })
                  .then(response => {
                      console.log(response);
                  })
                  .catch(error => {
                      console.log("post /api/add-items error: ");
                      console.log(error);
                  });  */
        }
    }


    toggleCheckBox = () => {
        this.setState(prevState => ({ completed: !prevState.completed }))
    }


    render() {
        const { collection, completed } = this.state;
        console.log(collection);
        console.log(completed);
        return (
            <Form onSubmit={this.submit} onChange={this.handleChange}>
                <Button onClick={this.addExercise}>Add Exercise</Button>
                {collection.map((val, idx) => {
                    let exId = `ex-${idx}`, durationId = `duration-${idx}`, hrId = `hr-${idx}`, minId = `min-${idx}`, completedId = `comp-${idx}`;
                    return (
                        <div key={idx}>
                            <Row form>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for={exId}>{`Exercise #${idx + 1}`}</Label>
                                        <Input type="text" data-id={idx} name={exId} id={exId} value={collection[idx].exercise} className="exercise" placeholder="Name" />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup disabled={completed}>
                                        <Label for={durationId}>Duration</Label>
                                        <Row>
                                            <Col>
                                                <Input type="tel" data-id={idx} name={hrId} id={hrId} value={isNaN(Number(collection[idx].hours).toString()) ? 0 : Number(collection[idx].hours).toString()} className="hours" disabled={completed} placeholder="Number" />
                                                <span>HR</span>
                                            </Col>
                                            <Col>
                                                <Input type="tel" data-id={idx} name={minId} id={minId} value={isNaN(Number(collection[idx].minutes).toString()) ? 0 : Number(collection[idx].minutes).toString()} className="minutes" disabled={completed} placeholder="Number" />
                                                <span>MIN</span>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup check>
                                        <Label check >
                                            <Input type="checkbox" data-id={idx} name={completedId} id={completedId} className="completed" value={!completed} onClick={this.toggleCheckBox} />{' '}
                                            Completed
                                        </Label>
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

export default ExVidsClassesAdd;