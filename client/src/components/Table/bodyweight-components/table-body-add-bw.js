import React, { Component } from 'react';
import { Form, FormGroup, FormFeedback, Label, Row, Col, Input, Button } from 'reactstrap';
import axios from 'axios';

class BWAdd extends Component {
    state = {
        id: this.props.id,
        date: this.props.date,
        collection: [{
            exercise: "",
            sets: "",
            reps: ""
        }]
    }

    //changes when keys are pressed
    handleChange = (e) => {
        //get the className and remove the 'form-control' suffix at the end
        e.target.className = e.target.className.replace(' form-control', '');
        //if the className is in the array
        if (["exercise", "sets", "reps"].includes(e.target.className)) {
            let collection = [...this.state.collection];
            //collection[location in array][exercise,sets, or reps] = e.target.value
            collection[e.target.dataset.id][e.target.className] = e.target.value;
            //regex to look for number
            const re = /^\d+$\b/;
            console.log(re.test(e.target.value))
            //if the target.value is empty or it doesn't pass the test, then setState

            if (e.target.className == "sets" || e.target.className == "reps") {
                e.target.value = parseInt(e.target.value, 10)
                if (e.target.value == '' || re.test(e.target.value)) {
                    this.setState({ collection }, () => console.log(this.state.collection))
                }
            } else {

                this.setState({ collection }, () => console.log(this.state.collection))
            }
        }
    }

    //grab the previous state of collection, add new object with empty values after
    addExercise = (e) => {
        this.setState((prevState) => ({
            collection: [...prevState.collection, { exercise: "", sets: "", reps: "" }]
        })
        )
    }

    submit = (e) => {
        e.preventDefault();

        console.log("post is triggered")
        axios.post("/api/add-items", { id: this.state.id, collection: this.state.collection, date: this.state.date, bwFlag: 1 })
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
                    let exId = `ex-${idx}`, setId = `sets-${idx}`, repId = `reps-${idx}`;
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
                                        <Label for={setId}>Sets</Label>
                                        <Input type="text" data-id={idx} name={setId} id={setId} value={collection[idx].sets} className="sets" placeholder="Number" />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for={repId}>Reps</Label>
                                        <Input type="text" data-id={idx} name={repId} id={repId} value={collection[idx].reps} className="reps" placeholder="Number" />
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

export default BWAdd;