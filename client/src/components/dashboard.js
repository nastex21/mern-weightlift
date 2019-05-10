import React, { Component } from 'react';

class Dashboard extends Component {

    render() {
        const logs = this.props.logs;
        console.log(logs);
        return (
            <div>
                <p>Hey {this.props.username}, the Dashboard works!</p> <p>These are you logs: </p> 
                <br />
                {logs.map(logs => <div><p>{logs.date}</p><p>{logs.name}</p></div>)}
            </div>
        )

    }
}

export default Dashboard;