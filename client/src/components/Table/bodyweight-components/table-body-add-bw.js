import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, FormGroup, Alert, Label, Row, Col, Input, Button } from 'reactstrap';
import { itemsConst } from '../../../actions/items_actions';

class BWAdd extends Component {
    state = {
        collection: [{
            exercise: "",
            sets: "",
            reps: ""
        }],
        invalidEx: false,
        invalidSets: false,
        invalidReps: false,
        msg: ''
    }

    //changes when keys are pressed
    handleChange = (e) => {
        //get the className and remove the 'form-control' suffix at the end
        e.target.className = e.target.className.replace(' form-control', '');
        e.target.className = e.target.className.replace(' is-invalid', '');

        //if the className is in the array
        if (["exercise", "sets", "reps"].includes(e.target.className)) {
            let collection = [...this.state.collection];
            //collection[location in array][exercise,sets, or reps] = e.target.value
            collection[e.target.dataset.id][e.target.className] = e.target.value;
            //regex to look for number
            const re = /^\d+$\b/;
            //if the target.value is empty or it doesn't pass the test, then setState

            if (e.target.className == "sets" || e.target.className == "reps") {
                e.target.value = +e.target.value;
                e.target.value = parseInt(e.target.value, 10)
                if (e.target.value == '' || re.test(e.target.value)) {
                    this.setState({ collection }, () => console.log(this.state.collection))
                }
                collection[e.target.dataset.id][e.target.className] = e.target.value;
                this.setState({ collection }, () => console.log(this.state.collection))
            } else {

                this.setState({ collection }, () => console.log(this.state.collection))
            }
        }
    }

    submit = (e) => {
        e.preventDefault();

        const { dispatch } = this.props;
        var options = { id: this.props.dataModifier.id, collection: this.state.collection, date: this.props.dataModifier.dateShortened, flag: 3 };

        dispatch(itemsConst.addItem(options))
            .then(() => this.setState({
                collection: [{
                    exercise: "",
                    sets: "",
                    reps: "",
                }]
            }))
            .catch(() => console.log("error"))
    }


    render() {
        const { id, collection } = this.state;
        return (
            <Form onSubmit={this.submit} onChange={this.handleChange}>
                {this.state.msg ? (
                    <Alert color='danger'>{this.state.msg}</Alert>
                ) : null}
                {collection.map((val, idx) => {
                    let exId = `ex-${idx}`, setId = `sets-${idx}`, repId = `reps-${idx}`;
                    return (
                        <div key={id + idx}>
                            <Row form>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for={exId}>{`Exercise #${idx + 1}`}</Label>
                                        <Input invalid={this.state.invalidEx} type="text" data-id={idx} name={exId} id={exId} value={collection[idx].exercise} className="exercise" placeholder="Name" />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for={setId}>Sets</Label>
                                        <Input invalid={this.state.invalidSets} type="text" data-id={idx} name={setId} id={setId} value={collection[idx].sets} className="sets" placeholder="Number" />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for={repId}>Reps</Label>
                                        <Input invalid={this.state.invalidReps} type="text" data-id={idx} name={repId} id={repId} value={collection[idx].reps} className="reps" placeholder="Number" />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
                    )
                }
                )}
                <Button onClick={this.submit} block>Add Exercise</Button>
            </Form>
        )
    }
}

function mapStateToProps(state) {
    const { eventReducer, dataModifier } = state;
    return {
        eventReducer,
        dataModifier
    };
}

export default connect(mapStateToProps)(BWAdd);