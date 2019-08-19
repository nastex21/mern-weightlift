import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterButton } from '../../actions/items_actions';


class LeftPane extends Component {
    state = {
        weightFilterFlag: false,
        cardioFilterFlag: false,
        bwFilterFlag: false,
        vidsFilterFlag: false
    }

    filteredEvents = (num) => {
       // this.props.dispatch(itemsConst.saveChanges(dataObj));
        var dataObj = {};
        if (num == 1) {
            if (this.state.weightFilterFlag) {
                var filtered = this.props.dataModifier.events.filter(function (item) {
                    return item.title !== "Weights"
                })

                dataObj.filter = filtered;
                dataObj.weightFilterFlag = true;
                this.props.dispatch(filterButton(dataObj));

            } else {
                dataObj.weightFilterFlag = false;
                this.props.dispatch(filterButton(dataObj));
            }
        }

        if (num == 2) {
            if (this.state.cardioFilterFlag) {
                var filtered = this.state.eventsFiltered.filter(function (item) {
                    return item.title !== "Cardio"
                })

                this.setState({
                    eventsFiltered: [...filtered]
                })

            } else {
                var filtered = this.state.events.filter(function (item) {
                    return item.title == "Cardio"
                })

                this.setState({
                    eventsFiltered: [...this.state.eventsFiltered, ...filtered]
                })
            }
        }

        if (num == 3) {
            if (this.state.bwFilterFlag) {
                var filtered = this.state.eventsFiltered.filter(function (item) {
                    return item.title !== "Bodyweight"
                })

                this.setState({
                    eventsFiltered: [...filtered]
                })
            } else {
                var filtered = this.state.events.filter(function (item) {
                    return item.title == "Bodyweight"
                })

                this.setState({
                    eventsFiltered: [...this.state.eventsFiltered, ...filtered]
                })
            }
        }

        if (num == 4) {
            if (this.state.vidsFilterFlag) {
                var filtered = this.state.eventsFiltered.filter(function (item) {
                    return item.title !== "Classes/Videos"
                })

                this.setState({
                    eventsFiltered: [...filtered]
                })
            } else {
                var filtered = this.state.events.filter(function (item) {
                    return item.title == "Classes/Videos"
                })

                this.setState({
                    eventsFiltered: [...this.state.eventsFiltered, ...filtered]
                })
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


    render() {

        var newDate = new Date(this.props.dataModifier.date);

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
                            <div className='boxIcon'>
                                <button className="green" type="button" onClick={(num) => this.filterButton(3)} >B</button>
                            </div>
                        </div>

                        <div className="rowLegend">
                            <div className='boxIcon'>
                                <button type="button" className="blue" onClick={(num) => this.filterButton(2)} >C</button>
                            </div>
                        </div>

                        <div className="rowLegend">
                            <div className='boxIcon'>
                                <button type="button" className="orange" onClick={(num) => this.filterButton(4)}>C/V</button>
                            </div>
                        </div>

                        <div className="rowLegend">
                            <div className='boxIcon'>
                                <button type="button" className="red" onClick={(num) => this.filterButton(1)}>W</button>
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

function mapStateToProps(state) {
    console.log('state');
    console.log(state);
    const { alert, dataModifier } = state;
    return {
        alert,
        dataModifier
    };
}

export default connect(mapStateToProps)(LeftPane);