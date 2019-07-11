import React, { Component } from 'react';

class RightPane extends Component {


    render() {
        return (
            <div className="bothPanes rightPane">
                <div className="iconsBox">
                    <h3 id="legendKey">KEY</h3>
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
            </div>
        )
    }
}

export default RightPane;