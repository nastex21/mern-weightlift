import React, { Component } from 'react';
import { Form, Input, Button } from 'reactstrap';
import  ExerciseInputs  from './subcomponents/add-exercise'; 

class TableBodyAdd extends Component {
    state = {
        collection: [{
            exercise: "",
            sets: "",
            reps: "",
            weight: ""
        }]
    }

    handleChange = (e) => {
        console.log(this);
        if (["exercise", "sets", "reps", "weight"].includes(e.target.className) ) {
          let collection = [...this.state.collection]
          collection[e.target.dataset.id][e.target.className] = e.target.defaultValue.toUpperCase()
          this.setState({ collection }, () => console.log(this.state.collection))
        } else {
          this.setState({ [e.target.name]: e.target.defaultValue.toUpperCase() })
        } 
      }

    addExercise = (e) => {
        console.log("triggered")
        this.setState((prevState) => ({
            collection:[...prevState.collection, {exercise: "", sets: "", reps: "", weight: ""}]
        })
        )
    }
 
    submit = (e) => {
        e.preventDefault();
    }

    render() {
        console.log(this.state.collection);
        const { collection } = this.state;
        return (
            <Form onSubmit={this.submit} onChange={this.handleChange}>
                <Button onClick={this.addExercise}>Add Exercise</Button>
                <ExerciseInputs collections={collection}/>
                <Input type="submit" value="Submit" />
            </Form>
        )
    }
}

export default TableBodyAdd;