import React, { Component } from 'react';

class Legend extends Component {


    render() {
        const { date, exercise } = this.props;
        console.log("legend");
        console.log(date);
        var newDate = new Date(date);
        console.log("newDate");
        console.log(newDate);

        var m = newDate.getMonth();
        var d = newDate.getDate();
        var months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];

        console.log(months[m]);
        console.log('exercise');
        console.log(exercise)


        return (
            <div className="leftPane" >
                <div className="iconsBox">
                    <div className="rowLegend">
                        <div class='boxIcon red'></div>
                        <span>Weightlifting</span>
                    </div>

                    <div className="rowLegend">
                        <div class='boxIcon blue'></div>
                        <span>Cardio</span>
                    </div>

                    <div className="rowLegend">
                        <div class='boxIcon green'></div>
                        <span>Bodyweight</span>
                    </div>

                    <div className="rowLegend">
                        <div class='boxIcon orange'></div>
                        <span>Classes and Videos</span>
                    </div>
                </div>
                <div className="datePane">
                    <p className="dayPane">{isNaN(d) ? null : d}</p>
                    <p className="monthPane">{months[m]}</p>
                </div>
                <div className="exercisePane">

                </div>
            </div>
        )
    }
}

export default Legend;