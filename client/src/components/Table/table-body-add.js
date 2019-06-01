import React, { Component } from 'react';
import { Form, Input, Button } from 'reactstrap';
import  ExerciseInputs  from './subcomponents/add-exercise'; 
import axios from 'axios';

class TableBodyAdd extends Component {
    state = {
        id: this.props.id,
        collection: [{
            exercise: "",
            sets: "",
            reps: "",
            weight: ""
        }]
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
        console.log(this.state.collection);
        console.log("Id from table-add");
        console.log(this.state.id);
        axios.post("/api/add-items", { id: this.state.id, collection: this.state.collection })
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
                <ExerciseInputs collections={collection} getInput={this.handleChange}/>
                <Input type="submit" value="Submit" />
            </Form>
        )
    }
}

export default TableBodyAdd;