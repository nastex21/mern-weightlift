import React, { Component } from 'react';
import { Form, FormGroup, FormFeedback, Label, Row, Col, Input, Button } from 'reactstrap';
import axios from 'axios';

class CardioAdd extends Component {
    state = {
        id: this.props.id,
        date: this.props.date,
        collection: [{
            exercise: "",
            distance: "",
            hours: "",
            minutes: ""
        }]
    }

    //changes when keys are pressed
    handleChange = (e) => {
        console.log(e.target.className);
        //get the className and remove the 'form-control' suffix at the end
        e.target.className = e.target.className.replace(' form-control', '');
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
                e.target.value = parseInt(e.target.value, 10)
                if (e.target.value == '') {
                    collection[e.target.dataset.id][e.target.className] = e.target.value;
                    this.setState({ collection }, () => console.log(this.state.collection))
                }
                collection[e.target.dataset.id][e.target.className] = e.target.value;
                this.setState({ collection }, () => console.log(this.state.collection))
            } else if (e.target.className == "minutes") {
                e.target.value = parseInt(e.target.value, 10)
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

    //grab the previous state of collection, add new object with empty values after
    addExercise = (e) => {
        this.setState((prevState) => ({
            collection: [...prevState.collection, { exercise: "", distance: "", hours: 0, minutes: 0 }]
        })
        )
    }

    submit = (e) => {
        //e.target.value = e.target.value.replace(/^0+/, ''); -- get rid of leading zeroes
        e.preventDefault();

        console.log("post is triggered")
        console.log(this.props.id);
        axios.post("/api/add-items", { id: this.state.id, collection: this.state.collection, date: this.state.date, cardioFlag: 1 })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log("post /api/add-items error: ");
                console.log(error);
            });

    }


    render() {
        const { id, collection } = this.state;

        return (
            <Form onSubmit={this.submit} onChange={this.handleChange}>
                <Button onClick={this.addExercise}>Add Exercise</Button>
                {collection.map((val, idx) => {
                    let exId = `ex-${idx}`, distanceId = `distance-${idx}`, durationId = `duration-${idx}`, hrId = `hr-${idx}`, minId = `min-${idx}`;
                    return (
                        <div key={id + idx}>
                            <Row form>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for={exId}>{`Exercise #${idx + 1}`}</Label>
                                        <Input type="text" data-id={idx} name={exId} id={exId} value={collection[idx].exercise} className="exercise" placeholder="Name" />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for={distanceId}>Distance</Label>
                                        <Input type="number" data-id={idx} name={distanceId} id={distanceId} value={collection[idx].distance} className="distance" placeholder="Number" />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for={durationId}>Duration</Label>
                                        <Row>
                                            <Col>
                                                <Input type="tel" data-id={idx} name={hrId} id={hrId} value={collection[idx].hours} className="hours" placeholder="Number" />
                                                <span>HR</span>
                                            </Col>
                                            <Col>
                                                <Input type="tel" data-id={idx} name={minId} id={minId} value={collection[idx].minutes} className="minutes" placeholder="Number" />
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