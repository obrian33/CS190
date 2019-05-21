import React from 'react';
import DashBoard from './DashBoard/DashBoard';
import InstrumentPlayer from './InstrumentPlayer/InstrumentPlayer';
import VirtualGuitar from './InstrumentPlayer/Instruments/VirtualGuitar';

const DisplayInstrumentInstructions = ({ playWindowState }) => {
    return <div className="col-3 text-center">
        <h3>Instructions:</h3>
        <div>
            {playWindowState.currentInstrument.instructions}
        </div>
    </div>
};

const DisplayTracks = ({ playWindowState, oscillator }) => {
    return <div>
        {playWindowState.trackList.map((track, index) => {
            return <div key={index}>
                <img alt="" className="thing" src={`./assets/${track.id}.svg`}></img>
                <i onClick={() => playTrack(track, oscillator)}>fdsfsadf</i>
            </div>
        })
        }
    </div>
}

const playTrack = (track, oscillator)=> {
    track.forEach(value => {
        oscillator.frequency.value = value;
    });
}

const RecordTrack = ({ addNewRecord }) => {
    return <div>
        <button type="button" className="btn btn-primary" onClick={() => addNewRecord}>Record</button>
    </div>
}

class PlayWindow extends React.Component {
    chosenInstrument = new VirtualGuitar();
    
    constructor(props) {
        super(props);
        this.updateInstrument = this.updateInstrument.bind(this);
        this.addTrack = this.addTrack.bind(this);

        this.state = {
            currentInstrument: this.chosenInstrument,
            instrumentInstructions: this.chosenInstrument.instrumentInstructions,
            trackList: this.chosenInstrument.trackList
        }
    }

    addTrack = (newTrack) => {
        this.setState({
            trackList: this.state.trackList.push(newTrack)
        });
    }

    updateInstrument = (chosenInstrument) => {
        this.setState({
            currentInstrument: chosenInstrument,
            instrumentInstructions: chosenInstrument.instructions,
            trackList: chosenInstrument.trackList
        });
    }

    render() {
        return (<div className="container-fluid">
            <DashBoard changeInstrument={this.updateInstrument}></DashBoard>
            <div className="row">
                <DisplayInstrumentInstructions playWindowState={this.state}></DisplayInstrumentInstructions>
                <InstrumentPlayer currentInstrument={this.state.currentInstrument}></InstrumentPlayer>
                <div className="col-3 text-center">
                    <h3>Tracks</h3>
                    <DisplayTracks playWindowState={this.state}></DisplayTracks>
                    <RecordTrack addNewRecord={this.state} oscillator={this.oscillator}></RecordTrack>
                </div>
            </div>
        </div>
        );
    }
}

export default PlayWindow;