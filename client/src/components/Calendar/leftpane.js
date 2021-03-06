import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterButton } from '../../actions/items_actions';


class LeftPane extends Component {
    state = {
        weightFilterFlag: false,
        cardioFilterFlag: false,
        bwFilterFlag: false,
        vidsFilterFlag: false,
        eventsButtons: ''
    }

    filteredEvents = (num) => {
        var filtered = []
        if (num == 1) {

            var weightFlag = {
                weightFlag: this.state.weightFilterFlag
            }

            if (this.state.weightFilterFlag) {
                filtered = this.props.dataModifier.eventsFiltered.filter(function (item) {
                    return item.title !== "Weights"
                });

                this.props.dispatch(filterButton(filtered, weightFlag));

            } else {
                filtered = this.props.dataModifier.events.filter(function (item) {
                    return item.title == "Weights"
                })

                filtered = [...filtered, ...this.props.dataModifier.eventsFiltered];

                this.props.dispatch(filterButton(filtered, weightFlag));
            }
        }

        if (num == 2) {

            var cardioFlag = {
                cardioFlag: this.state.cardioFilterFlag
            }

            if (this.state.cardioFilterFlag) {
                filtered = this.props.dataModifier.eventsFiltered.filter(function (item) {
                    return item.title !== "Cardio"
                })

                this.props.dispatch(filterButton(filtered, cardioFlag));

            } else {
                filtered = this.props.dataModifier.events.filter(function (item) {
                    return item.title == "Cardio"
                })

                filtered = [...filtered, ...this.props.dataModifier.eventsFiltered];

                this.props.dispatch(filterButton(filtered, cardioFlag));
            }
        }

        if (num == 3) {

            var bwFlag = {
                bwFlag: this.state.bwFilterFlag
            }

            if (this.state.bwFilterFlag) {
                filtered = this.props.dataModifier.eventsFiltered.filter(function (item) {
                    return item.title !== "Bodyweight"
                })

                this.props.dispatch(filterButton(filtered, bwFlag));

            } else {
                filtered = this.props.dataModifier.events.filter(function (item) {
                    return item.title == "Bodyweight"
                })

                filtered = [...filtered, ...this.props.dataModifier.eventsFiltered];

                this.props.dispatch(filterButton(filtered, bwFlag));
            }
        }

        if (num == 4) {

            var vidsFlag = {
                vidsFlag: this.state.vidsFilterFlag
            };

            if (this.state.vidsFilterFlag) {
                filtered = this.props.dataModifier.eventsFiltered.filter(function (item) {
                    return item.title !== "Classes/Videos"
                })

                this.props.dispatch(filterButton(filtered, vidsFlag));

            } else {
                filtered = this.props.dataModifier.events.filter(function (item) {
                    return item.title == "Classes/Videos"
                })

                filtered = [...filtered, ...this.props.dataModifier.eventsFiltered];

                this.props.dispatch(filterButton(filtered, vidsFlag));
            }
        }
    }

    filterButton = (num) => {

        if (num == 1) {
            this.setState(prevState => ({
                weightFilterFlag: !prevState.weightFilterFlag
            }), () => this.filteredEvents(num))
        }

        if (num == 2) {
            this.setState(prevState => ({
                cardioFilterFlag: !prevState.cardioFilterFlag
            }), () => this.filteredEvents(num))
        }

        if (num == 3) {
            this.setState(prevState => ({
                bwFilterFlag: !prevState.bwFilterFlag
            }), () => this.filteredEvents(num))
        }

        if (num == 4) {
            this.setState(prevState => ({
                vidsFilterFlag: !prevState.vidsFilterFlag
            }), () => this.filteredEvents(num))
        }
    }

    buttonsRender = () => {
        const { date, dateShortened } = this.props.dataModifier;

        var elementTest = function(element){
            return element.date === dateShortened
        }

        var weightTest = this.props.dataModifier.weightLogs.some(elementTest);
        var cardioTest = this.props.dataModifier.cardioLogs.some(elementTest);
        var bwTest = this.props.dataModifier.bwLogs.some(elementTest);
        var vidsTest = this.props.dataModifier.vidsLogs.some(elementTest);

        return [
            <div className="editButtons">
                <p>Edit</p>
                <div className="boxIcon">
                    {weightTest ? <button type="button" className="red" onClick={() => this.props.editToggle(dateShortened, date, 1)}>W</button> : null}
                    {cardioTest ? <button type="button" className="blue" onClick={() => this.props.editToggle(dateShortened, date, 2)}>C</button> : null}
                    {bwTest ? <button type="button" className="green" onClick={() => this.props.editToggle(dateShortened, date, 3)}>B</button> : null}
                    {vidsTest ? <button type="button" className="orange" onClick={() => this.props.editToggle(dateShortened, date, 4)}>C/V</button> : null}
                </div>
            </div>
        ]
    }


    render() {

        //for dates clicked on event calendar
        var newDate = new Date(this.props.dataModifier.date);
        var m = newDate.getMonth();
        var d = newDate.getDate();

        //for current date
        var nowDate = new Date();
        var nowDay = nowDate.getDate();
        var nowMonth = nowDate.getMonth();


        var months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        var dateShortened;
        
        if (this.props.dataModifier){
            dateShortened = this.props.dataModifier.dateShortened
        }

        return (
            <div className="bothPanes leftPane" >
                <div className="filterBox">
                    <h3>Filter</h3>
                    <div className="buttonFilter">
                        <div className="rowLegend">
                            <div className='boxIcon'>
                                <button type="button" className="red" onClick={(num) => this.filterButton(1)}>W</button>
                            </div>
                        </div>
                        <div className="rowLegend">
                            <div className='boxIcon'>
                                <button type="button" className="blue" onClick={(num) => this.filterButton(2)} >C</button>
                            </div>
                        </div>
                        <div className="rowLegend">
                            <div className='boxIcon'>
                                <button type="button" className="green" onClick={(num) => this.filterButton(3)} >B</button>
                            </div>
                        </div>
                        <div className="rowLegend">
                            <div className='boxIcon'>
                                <button type="button" className="orange" onClick={(num) => this.filterButton(4)}>C/V</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="datePane">
                    <span className="dayPane">{isNaN(d) ? nowDay : d}</span>
                    <p className="monthPane">{isNaN(d) ? months[nowMonth] : months[m]}</p>
                </div>
                <div className="addButton">
                    <div className='boxIcon'>
                        <p>Add</p>
                        <button type="button" className="orange" onClick={isNaN(d) ? () => this.props.toggle(nowDate) : () => this.props.toggle(newDate)}>+</button>
                    </div>
                </div>
                {dateShortened ? this.buttonsRender() : null}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { dataModifier } = state;
    return {
        dataModifier
    };
}

export default connect(mapStateToProps)(LeftPane);