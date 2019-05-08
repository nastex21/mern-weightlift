import React, { Component } from 'react';

class Dashboard extends Component {

    render() {
        
        return (
            <div>
                <p>Hey {this.props.username}, the Dashboard works! These are your logs {this.props.logs}</p>
            </div>
        )

    }
}

export default Dashboard;