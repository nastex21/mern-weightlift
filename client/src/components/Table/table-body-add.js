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
        }],
        validate: {
            nameState: '',
            setsState: '',
            repsState: '',
            weightState: ''
          }
    }

    validateName = (e) => {
        /* const { validate } = this.state;
        if(this.state.name === ''){
            validate.nameState = 'has-danger'
          } else {
            validate.nameState = 'has-success'
          }
          this.setState({ validate }) */

          
    }

    validateSet = (e) => {
        const { validate } = this.state;
    }

    validateReps = (e) => {
        const { validate } = this.state;
    }

    validateWeight = (e) => {
        const { validate } = this.state;
    }

    handleChange = (e) => {
        e.target.className = e.target.className.replace(' form-control','')
    
        if (["exercise", "sets", "reps", "weight"].includes(e.target.className) ) {
          let collection = [...this.state.collection]
          collection[e.target.dataset.id][e.target.className] = e.target.value;
          this.setState({ collection }, () => console.log(this.state.collection))
        } 
      }

    addExercise = (e) => {
        this.setState((prevState) => ({
            collection:[...prevState.collection, {exercise: "", sets: "", reps: "", weight: ""}]
        })
        )
    }
 
    submit = (e) => {
        e.preventDefault();

        axios.post("/api/add-items", { id: this.state.id, collection: this.state.collection, date: this.state.date })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log("post /api/add-items error: ");
            console.log(error);
        });
        
    }

    render() {
        const { collection } = this.state;
        return (
            <Form onSubmit={this.submit} onChange={this.handleChange}>
                <Button onClick={this.addExercise}>Add Exercise</Button>             
                {collection.map((val, idx) => {
                let exId = `ex-${idx}`, setId = `sets-${idx}`, repId = `reps-${idx}`, weightId = `weight-${idx}`;
                return (
                    <div key={idx}>
                        <Row form>
                            <Col md={3}>
                                <FormGroup>
                                    <Label for={exId}>{`Exercise #${idx + 1}`}</Label>
                                    <Input type="text" data-id={idx} name={exId} id={exId} value={collection[idx].exercise} className="exercise" placeholder="Name" valid={ this.state.validate.nameState === 'has-success' } invalid={ this.state.validate.nameState === 'has-danger' } />
                                    <FormFeedback valid></FormFeedback>
                                    <FormFeedback invalid>Please enter your name.</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label for={setId}>Sets</Label>
                                    <Input type="number" data-id={idx} name={setId} id={setId} value={collection[idx].sets} className="sets" placeholder="Number"  />
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label for={repId}>Reps</Label>
                                    <Input type="number" data-id={idx} name={repId} id={repId} value={collection[idx].reps} className="reps" placeholder="Number"  />
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label for={weightId}>Weight</Label>
                                    <Input type="number" data-id={idx} name={weightId} id={weightId} value={collection[idx].weight} className="weight" placeholder="Number"  />
                                </FormGroup>
                            </Col>
                        </Row>
                </div>
                )}
                )}
                <Input type="submit" value="Submit" />
            </Form>
        )
    }
}

export default TableBodyAdd;