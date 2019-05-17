import React from 'react';
import DashBoard from './DashBoard/DashBoard';
import InstrumentPlayer from './InstrumentPlayer/InstrumentPlayer';
import VirtualGuitar from './InstrumentPlayer/Instruments/VirtualGuitar';

class PlayWindow extends React.Component {
    chosenInstrument;

    constructor(props) {
        super(props);
        this.updateInstrument = this.updateInstrument.bind(this);

        this.state = {
            currentInstrument: new VirtualGuitar()
        }
    }

    updateInstrument = (chosenInstrument) => {
        this.setState({
            currentInstrument: chosenInstrument
        });
    }

    render() {
        return (<div>
            <DashBoard changeInstrument={this.updateInstrument}></DashBoard>
            <InstrumentPlayer currentInstrument={this.state.currentInstrument}></InstrumentPlayer>
        </div>
        );
    }
}

export default PlayWindow;