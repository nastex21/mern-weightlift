import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 
class TableEditer extends Component {
state = {
    id: "",
    date: "",
    collection: []
}

componentDidMount() {
    this.setState({
        id: this.props.id,
        date: this.props.date,
        collection: [...this.state.collection, ...this.props.exercise]
    })
}

render(){
    console.log(this.state.collection);
    return(
        <div>
            <p>Hi</p>
        </div>
    )
}
}

export default TableEditer;