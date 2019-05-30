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
        console.log(e.target.className);
        if (["exercise", "sets", "reps", "weight"].includes(e.target.className) ) {
            console.log("trigger handleChange");
          let collection = [...this.state.collection]
          collection[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
          this.setState({ collection }, () => console.log(this.state.collection))
        } else {
            console.log("else triggered")
          this.setState({ [e.target.name]: e.target.value.toUpperCase() })
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