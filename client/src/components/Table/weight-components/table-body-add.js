import React, { Component } from 'react';
import { Form, FormGroup, FormFeedback, Label, Row, Col, Input, Button } from 'reactstrap';
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

    //valadation for collection
    validateCollection = () => {
        //counter to keep track of errors. If at the end of the tests, the counter is not zero, don't proceed to axios.post
        var errCounter = 0; 
        //regex to search for numbers
        const re = /^\d+$\b/; 
        //find any error and stop test immediately
        this.state.collection.some(function (item) {
            //find empty strings
            if (item.exercise === '' || item.sets === '' || item.reps === '' || item.weight === '') {
                errCounter = 1;
            }
            //if it doesn't pass the regex test
            if (!re.test(item.sets)|| !re.test(item.reps) || !re.test(item.weight)) {
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
        //get the className and remove the 'form-control' suffix at the end
        e.target.className = e.target.className.replace(' form-control', '');
        //if the className is in the array
        if (["exercise", "sets", "reps", "weight"].includes(e.target.className)) {
            let collection = [...this.state.collection];       

            //look for number and single decimal
            const reNum = /^\d+$\b/;
            const re = /^\d*\.?\d+$/;

        
            console.log(reNum.test(e.target.value));
            console.log(re.test(e.target.value));
            if (["sets", "reps"].includes(e.target.className)) {            
                if (e.target.value == '' || reNum.test(e.target.value)){
                    //collection[location in array][exercise,sets,reps, or weight] = e.target.value
                    collection[e.target.dataset.id][e.target.className] = e.target.value;
                    this.setState({ collection }, () => console.log(this.state.collection))
                }
            } else if (e.target.className == "weight"){
                if (e.target.value == '' || re.test(e.target.value) ){
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

    //grab the previous state of collection, add new object with empty values after
    addExercise = (e) => {
        this.setState((prevState) => ({
            collection: [...prevState.collection, { exercise: "", sets: "", reps: "", weight: "" }]
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
       axios.post("/api/add-items", { id: this.state.id, collection: this.state.collection, date: this.state.date, weightFlag: 1 })
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
                <Input type="submit" value="Submit" />
            </Form>
        )
    }
}

export default WeightsAdd;