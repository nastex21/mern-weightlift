import React, { Component } from 'react';

class WeightEdit extends Component {

render(){
    return(
        <table className="table table-hover">    
        <thead>
              <tr className="table-info">
                <th scope="col">Exercise</th>
                <th scope="col">Sets</th>
                <th scope="col">Reps</th>
                <th scope="col">Weight</th>
                <th scope="col">Total</th> 
            </tr>
        </thead>
        <tbody>
            {this.props.exerciseArr.map(item => 
                <tr>
                    <th scope="row">{item.exercise}</th>
                        <td>{item.sets}</td>
                        <td>{item.reps}</td>
                        <td>{item.weight}</td>
                        <td>{Number(item.sets) * Number(item.reps) * Number(item.weight)}</td>
                </tr>
            )}
            <tr className="table-dark">
                    <th scope="row">Day Total</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{this.props.totalArr}</td>
                </tr>
        </tbody>
        </table>
    )
}
}

export default WeightEdit;