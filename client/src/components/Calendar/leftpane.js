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

        

        return (
            <div className="bothPanes leftPane" >
                <div className="filterBox">
                    <h3>Filter</h3>
                    <div className="buttonFilter">
                        <div className="rowLegend">
                            <div class='boxIcon'>
                                <button className="green" type="button" onClick={(num) => this.props.filterButton(3)} >B</button>
                            </div>
                        </div>

                        <div className="rowLegend">
                            <div class='boxIcon'>
                                <button type="button" className="blue" onClick={(num) => this.props.filterButton(2)} >C</button>
                            </div>
                        </div>

                        <div className="rowLegend">
                            <div class='boxIcon'>
                                <button type="button" className="orange" onClick={(num) => this.props.filterButton(4)}>C/V</button>
                            </div>
                        </div>

                        <div className="rowLegend">
                            <div class='boxIcon'>
                                <button type="button" className="red"  onClick={(num) => this.props.filterButton(1)}>W</button>
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