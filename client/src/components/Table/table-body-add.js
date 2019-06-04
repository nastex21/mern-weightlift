import React, { Component } from 'react';
import { Form, FormGroup, FormFeedback, Label, Row, Col, Input, Button } from 'reactstrap';
import axios from 'axios';

class TableBodyAdd extends Component {
    state = {
        id: this.props.id,
        date: this.props.date,
        collection: [{
            exercise: "",
            sets: "",
            reps: "",
            weight: ""
        }]
    }

    validateCollection = () => {
        var errCounter = 0;
        this.state.collection.some(function (item) {
            if (item.exercise === '' || item.sets === '' || item.reps === '' || item.weight === '') {
                errCounter = 1;
            }
        });

        if (errCounter === 1) {
            return false;
        } else {
            return true;
        }
    }


    handleChange = (e) => {
        e.target.className = e.target.className.replace(' form-control', '');
        if (["exercise", "sets", "reps", "weight"].includes(e.target.className)) {
            let collection = [...this.state.collection];
            collection[e.target.dataset.id][e.target.className] = e.target.value;
            const re = /^\d+$\b/;
            if (e.target.className == "sets" || e.target.className == "reps" || e.target.className == "weight") {
                if (e.target.value == '' || re.test(e.target.value)) {
                    this.setState({ collection }, () => console.log(this.state.collection))
                }
            } else {
                this.setState({ collection }, () => console.log(this.state.collection))
            }
        }
    }

    addExercise = (e) => {
        this.setState((prevState) => ({
            collection: [...prevState.collection, { exercise: "", sets: "", reps: "", weight: "" }]
        })
        )
    }

    submit = (e) => {
        e.preventDefault();
        console.log("submit")
        console.log(this.state.collection);
        if (!this.validateCollection()) {
            console.log("can't go, error")
        } else {
            console.log("post is triggered")
            axios.post("/api/add-items", { id: this.state.id, collection: this.state.collection, date: this.state.date })
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
        const { collection } = this.state;
        return (
            <Form onSubmit={this.submit}  onChange={this.handleChange}>
                <Button onClick={this.addExercise}>Add Exercise</Button>
                {collection.map((val, idx) => {
                    let exId = `ex-${idx}`, setId = `sets-${idx}`, repId = `reps-${idx}`, weightId = `weight-${idx}`;
                    return (
                        <div key={idx}>
                            <Row form>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for={exId}>{`Exercise #${idx + 1}`}</Label>
                                        <Input type="text" data-id={idx} name={exId} id={exId} value={collection[idx].exercise} className="exercise" placeholder="Name"  />
                                        <FormFeedback valid></FormFeedback>
                                        <FormFeedback invalid>Please enter your name.</FormFeedback>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for={setId}>Sets</Label>
                                        <Input type="text" data-id={idx} name={setId} id={setId} value={collection[idx].sets} className="sets" placeholder="Number" />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for={repId}>Reps</Label>
                                        <Input type="text" data-id={idx} name={repId} id={repId} value={collection[idx].reps} className="reps" placeholder="Number" />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for={weightId}>Weight</Label>
                                        <Input type="text" data-id={idx} name={weightId} id={weightId} value={collection[idx].weight} className="weight" placeholder="Number" />
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

export default TableBodyAdd;