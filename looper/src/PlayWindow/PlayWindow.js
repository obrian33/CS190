import React from 'react';
import DashBoard from './DashBoard/DashBoard';
import TrackRecorder from './TrackRecorder/TrackRecorder';
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

class PlayWindow extends React.Component {
    chosenInstrument = new VirtualGuitar();
    start;
    stop;
    
    constructor(props) {
        super(props);
        this.updateInstrument = this.updateInstrument.bind(this);
        this.addTrack = this.addTrack.bind(this);
        this.recordingAction = this.recordingAction.bind(this);
        this.start = {buttonFunction: this.recordingAction,
            buttonText: 'Record'};
        this.stop = {buttonFunction: this.recordingAction,
            buttonText: 'Stop'}

        this.state = {
            currentInstrument: this.chosenInstrument,
            instrumentInstructions: this.chosenInstrument.instrumentInstructions,
            trackList: this.chosenInstrument.trackList,
            isRecording: false,
            previousTime: 0,
            trackRecorderDisplayButton: this.start
        }
    }

    recordingAction = () => {
        this.setState({
            isRecording: !this.state.isRecording,
            previousTime: new Date().getTime(),
            trackRecorderDisplayButton: !this.state.isRecording ? this.stop : this.start
        });
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
                <InstrumentPlayer currentInstrument={this.state.currentInstrument} isRecording={this.state.isRecording} playWindowState={this.state}></InstrumentPlayer>
                <div className="col-3 text-center">
                    <h3>Tracks</h3>
                    <DisplayTracks playWindowState={this.state}></DisplayTracks>
                    <TrackRecorder trackRecorderDisplayButton={this.state.trackRecorderDisplayButton}></TrackRecorder>
                </div>
            </div>
        </div>
        );
    }
}

export default PlayWindow;