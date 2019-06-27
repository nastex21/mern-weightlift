import React, { Component } from 'react';
import { Form, FormGroup, FormFeedback, Label, Row, Col, Input, Button, CustomInput } from 'reactstrap';
import axios from 'axios';

class ExVidsClassesAdd extends Component {
    state = {
        id: this.props.id,
        date: this.props.date,
        collection: [{
            exercise: '',
            hours: '',
            minutes: '',
            completed: ''
        }],
        completed: false
    }

    //changes when keys are pressed
    handleChange = (e) => {
        console.log('triggered handleChange');
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

            if (e.target.className == "completed" && e.target.value == "true") {
                collection[e.target.dataset.id][e.target.className] = e.target.value;
                delete collection[e.target.dataset.id].hours;
                delete collection[e.target.dataset.id].minutes;
                this.setState({ collection }, () => console.log(this.state.collection));
            }

            console.log(e.target.className);
            //if the target.value is empty or it doesn't pass the test, then setState
            if (e.target.className == "hours") {
                e.target.value = parseInt(e.target.value, 10)
                if (e.target.value == '') {
                    if (!this.state.completed) {
                        collection[e.target.dataset.id][e.target.className] = e.target.value;
                        collection[e.target.dataset.id].completed = "false";
                        this.setState({ collection }, () => console.log(this.state.collection));
                    } else {
                        collection[e.target.dataset.id].completed = "false";
                        collection[e.target.dataset.id][e.target.className] = "";
                        this.setState({ collection }, () => console.log(this.state.collection));
                    }
                }
                collection[e.target.dataset.id][e.target.className] = e.target.value;
                collection[e.target.dataset.id].completed = "false";
                this.setState({ collection }, () => console.log(this.state.collection));
            } else if (e.target.className == "minutes") {
                if (e.target.value == '' || e.target.value >= 0 && e.target.value < 60) {
                    e.target.value = parseInt(e.target.value, 10)
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
                collection[e.target.dataset.id][e.target.className] = e.target.value;
                collection[e.target.dataset.id].completed = "false";
                this.setState({ collection }, () => console.log(this.state.collection))
            }
        }
    }

    //grab the previous state of collection, add new object with empty values after
    addExercise = (e) => {
        this.setState((prevState) => ({
            collection: [...prevState.collection, { _id: '', exercise: "", hours: "", minutes: "", completed: false }]
        })
        )
    }

    submit = (e) => {
        e.preventDefault();

        axios.post("/api/add-items", { id: this.state.id, collection: this.state.collection, date: this.state.date, completed: this.state.completed, vidsFlag: 1 })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log("post /api/add-items error: ");
                console.log(error);
            });
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
                                        <Row>
                                            <Col md={6}>
                                                <Label />
                                                <Input type="tel" data-id={idx} name={hrId} id={hrId} value={isNaN(collection[idx].hours) ? '' : collection[idx].hours} className="hours" placeholder="Number" disabled={completed} />
                                                <span>HR</span>
                                            </Col>
                                            <Col md={6}>
                                                <Label />
                                                <Input type="tel" data-id={idx} name={minId} id={minId} value={isNaN(collection[idx].minutes) ? '' : collection[idx].minutes} className="minutes" placeholder="Number" disabled={completed} />
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