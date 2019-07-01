import React, { Component } from 'react';
import { Form, FormGroup, Label, Row, Col, Input, Button } from 'reactstrap';
import axios from 'axios';

class WeightsAdd extends Component {
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

    //changes when keys are pressed
    handleChange = (e) => {
        //get the className and remove the 'form-control' suffix at the end
        e.target.className = e.target.className.replace(' form-control', '');
        //if the className is in the array
        if (["exercise", "sets", "reps", "weight"].includes(e.target.className)) {
            let collection = [...this.state.collection];

            //look for number and single decimal
            const reNum = /^\d+$\b/;
            const re = /^\d*\.?\d+$/;

            if (["sets", "reps"].includes(e.target.className)) {
                e.target.value = parseInt(e.target.value, 10)
                if (e.target.value == '' || reNum.test(e.target.value)) {
                    //collection[location in array][exercise,sets,reps, or weight] = e.target.value
                    collection[e.target.dataset.id][e.target.className] = e.target.value;
                    this.setState({ collection }, () => console.log(this.state.collection))
                }
            } else if (e.target.className == "weight") {
                e.target.value = +e.target.value;
                if (e.target.value == '' || re.test(e.target.value)) {
                    console.log(re.test(e.target.value));
                    collection[e.target.dataset.id][e.target.className] = e.target.value;
                    this.setState({ collection }, () => console.log(this.state.collection))
                }
            } else {
                console.log("else state")
                collection[e.target.dataset.id][e.target.className] = e.target.value;
                this.setState({ collection }, () => console.log(this.state.collection))
            }
        }
    }

    submit = (e) => {
        e.preventDefault();
        console.log("submit trig");
        console.log(this.state.collection)
        axios.post("/api/add-items", { id: this.state.id, collection: this.state.collection, date: this.state.date, weightFlag: 1 })
            .then((response) => {
                console.log("submit then")
                console.log(this.props);
                this.props.updateData(1, this.state.collection)
            })
            .then(() => {
                console.log("form reset in submit button promise")
                this.setState({
                    collection: [{
                        exercise: "",
                        sets: "",
                        reps: "",
                        weight: ""
                    }]
                })
            })
            .catch(error => {
                console.log("post /api/add-items error: ");
                console.log(error);
                console.log(this.props.msgUpdate(true));
            });

    }

    render() {
        const { id, collection } = this.state;
        console.log(this.props);
        return (
            <div>
                <Form onSubmit={this.submit} onChange={this.handleChange}>
                    {collection.map((val, idx) => {
                        let exId = `ex-${idx}`, setId = `sets-${idx}`, repId = `reps-${idx}`, weightId = `weight-${idx}`;
                        return (
                            <div key={id + idx}>
                                <Row form>
                                    <Col md={3}>
                                        <FormGroup>
                                            <Label for={exId}>{`Exercise #${idx + 1}`}</Label>
                                            <Input type="text" data-id={idx} name={exId} id={exId} value={collection[idx].exercise} className="exercise" placeholder="Name" />
                                        </FormGroup>
                                    </Col>
                                    <Col md={3}>
                                        <FormGroup>
                                            <Label for={setId}>Sets</Label>
                                            <Input type="tel" data-id={idx} name={setId} id={setId} value={collection[idx].sets} className="sets" placeholder="Number" />
                                        </FormGroup>
                                    </Col>
                                    <Col md={3}>
                                        <FormGroup>
                                            <Label for={repId}>Reps</Label>
                                            <Input type="tel" data-id={idx} name={repId} id={repId} value={collection[idx].reps} className="reps" placeholder="Number" />
                                        </FormGroup>
                                    </Col>
                                    <Col md={3}>
                                        <FormGroup>
                                            <Label for={weightId}>Weight</Label>
                                            <Input type="number" data-id={idx} name={weightId} id={weightId} value={collection[idx].weight} className="weight" placeholder="Number" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </div>
                        )
                    }
                    )}
                    <Button type="submit" onClick={this.submit} block>Add Exercise</Button>
                </Form>
            </div>
        )
    }
}

export default WeightsAdd;