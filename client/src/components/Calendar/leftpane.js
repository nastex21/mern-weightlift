import React, { Component } from 'react';

class LeftPane extends Component {


    render() {
        const { date, exercise } = this.props;
        console.log("legend");
        console.log(date);
        var newDate = new Date(date);
        console.log("newDate");
        console.log(newDate);

        var m = newDate.getMonth();
        var d = newDate.getDate();
        var months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        console.log(months[m]);
        console.log('exercise');
        console.log(exercise);


        return (
            <div className="bothPanes leftPane" >
                <div className="filterBox">
                    <h3>Filter</h3>
                    <div className="buttonFilter">
                        <div className="rowLegend">
                            <div class='boxIcon'>
                                <button className="green" type="button" >B</button>
                            </div>
                        </div>

                        <div className="rowLegend">
                            <div class='boxIcon'>
                                <button type="button" className="blue" >C</button>
                            </div>
                        </div>

                        <div className="rowLegend">
                            <div class='boxIcon'>
                                <button type="button" className="orange">C/V</button>
                            </div>
                        </div>

                        <div className="rowLegend">
                            <div class='boxIcon'>
                                <button type="button" className="red" >W</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="datePane">
                    <span className="dayPane">{isNaN(d) ? null : d}</span>
                    <p className="monthPane">{months[m]}</p>
                </div>
                <div className="exercisePane">

                </div>
            </div>
        )
    }
}

export default LeftPane;