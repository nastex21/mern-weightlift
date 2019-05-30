import React from 'react';
import { Row, Col, FormGroup, Label, Input} from 'reactstrap';
const ExerciseInputs = (props) => {
    console.log(props);
    const collection = props.collections;
    return (
            collection.map((val, idx) => {
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
                </div> )}))}


export default ExerciseInputs;