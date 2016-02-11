
import React from 'react';

// build timeformat for laps record
function formattedMillSeconds(mill) {
    var millSec = ( '0' + mill / 100).slice(-2);
    var seconds = ( '0' + (Math.floor(mill % 60))).slice(-2);
    var minutes = ( '0' + (Math.floor(mill / 60))).slice(-2);
    return minutes + ':' + seconds + ':' + millSec;
}

module.exports = React.createClass({
    getInitialState() {
        return { millSecondsElapsed: 0, laps: [] };
    },
    getMilliSec() { // calculation for mill seconds function
        return ( '0' + this.state.millSecondsElapsed / 100).slice(-2);
    },
    getSeconds() { // calculation for seconds function
        return ( '0' + (Math.floor(this.state.millSecondsElapsed % 60))).slice(-2);
    },
    getMinutes() { // calculation for minutes function
        return ( '0' + (Math.floor(this.state.millSecondsElapsed / 60))).slice(-2);
    },
    handleStartClick() { // Start button function
        var self = this;
        this.incrementer = setInterval(function() {
            self.setState({
                millSecondsElapsed: ( self.state.millSecondsElapsed + 0.01 )
            });
        },10);
    },
    handleStopClick() { // stop button function
        clearInterval( this.incrementer );
        this.setState({ lastCleardIncrementer: this.incrementer });
    },
    handleResetClick() { // reset button function
        this.setState({ millSecondsElapsed: 0, laps: [] });
    },
    handleLapClick() { // create lap button function
        this.setState({ laps: [this.state.millSecondsElapsed, ...this.state.laps] }); // create laps array reves...
    },
    handleDeleteButtonClick(index) { // delete laps record function
        this.setState({ laps: this.state.laps.filter((_, i) => i !== index)});
    },
    render() {
        self = this;
        return(
            <div>
                <div>
                    <div className="Time">
                        <h1 className="Time-value">{formattedMillSeconds(this.state.millSecondsElapsed)}</h1>
                    </div>
                    <div className="Controls">
                        {(this.state.millSecondsElapsed === 0 || this.incrementer === this.state.lastCleardIncrementer)
                            ? <button className="btn1" type="button" onClick={this.handleStartClick}>Start</button>
                          : <button className="btn1" type="button" onClick={this.handleStopClick}>Stop</button>
                        }

                        {(this.state.millSecondsElapsed !== 0 && this.incrementer !== this.state.lastCleardIncrementer)
                            ? <button className="btn2" type="button" onClick={this.handleLapClick}>lap</button>
                            : null
                        }

                        {(this.state.millSecondsElapsed !== 0 && this.incrementer === this.state.lastCleardIncrementer)
                            ? <button className="btn2" type="button" onClick={this.handleResetClick}>reset</button>
                            : null
                        }
                    </div>
                </div>
                <ul className="Results">{this.state.laps.map(function(lap, i) {
                    return <li> {formattedMillSeconds(lap)} | <input type="text" className="inputTxt" /> | <input type="button" className="btnRemove" value="Remove" onClick={function() {self.handleDeleteButtonClick(i)}} /> </li>;
                })}</ul>
            </div>
          )
    }
})
