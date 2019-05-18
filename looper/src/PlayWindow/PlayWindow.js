import React from 'react';
import DashBoard from './DashBoard/DashBoard';
import InstrumentPlayer from './InstrumentPlayer/InstrumentPlayer';
import VirtualGuitar from './InstrumentPlayer/Instruments/VirtualGuitar';

const DisplayInstrumentInstructions = ({playWindowState}) => {
    return <div className="col">
        {playWindowState.currentInstrument.instructions}
    </div>
};

const DisplayTracks = ({playWindowState}) => {
    return <div className="col">
        {playWindowState.trackList}
    </div>
};

class PlayWindow extends React.Component {
    chosenInstrument = new VirtualGuitar();

    constructor(props) {
        super(props);
        this.updateInstrument = this.updateInstrument.bind(this);

        this.state = {
            currentInstrument: this.chosenInstrument,
            instrumentInstructions: this.chosenInstrument.instrumentInstructions,
            trackList: this.chosenInstrument.trackList
        }
    }

    updateInstrument = (chosenInstrument) => {
        this.setState({
            currentInstrument: chosenInstrument,
            instrumentInstructions: chosenInstrument.instructions,
            trackList: chosenInstrument.trackList
        });
    }

    render() {
        return (<div>
            <DashBoard changeInstrument={this.updateInstrument}></DashBoard>
            <div className="row">
                <DisplayInstrumentInstructions playWindowState={this.state}></DisplayInstrumentInstructions>
                <InstrumentPlayer currentInstrument={this.state.currentInstrument}></InstrumentPlayer>
                <DisplayTracks playWindowState={this.state}></DisplayTracks>
            </div>
        </div>
        );
    }
}

export default PlayWindow;