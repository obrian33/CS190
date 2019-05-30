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

const DisplayTracks = ({ playWindowState }) => {
    return <div>
        {playWindowState.trackList.map((track, index) => {
            return <div key={index}>
                <i onClick={() => console.log(track)}>
                    <img alt="" className="thing" src={`./assets/${track.id}.svg`}></img>
                </i>
            </div>
        })
        }
    </div>
}

const playTrack = (track) => {
    track.forEach(value => {
        value.play();
    });
}

class PlayWindow extends React.Component {
    chosenInstrument = new VirtualGuitar();
    trackList = [];
    start;
    stop;

    constructor(props) {
        super(props);
        this.updateInstrument = this.updateInstrument.bind(this);
        this.getKey = this.getKey.bind(this);
        this.getCurrentTrack = this.getCurrentTrack.bind(this);
        this.recordingAction = this.recordingAction.bind(this);

        this.start = {
            buttonFunction: this.recordingAction,
            buttonText: 'Record'
        };
        this.stop = {
            buttonFunction: this.recordingAction,
            buttonText: 'Stop'
        }

        this.state = {
            currentInstrument: this.chosenInstrument,
            instrumentInstructions: this.chosenInstrument.instrumentInstructions,
            trackList: this.trackList,
            isRecording: false,
            previousTime: 0,
            trackRecorderDisplayButton: this.start,
            keyPressed: null
        }
    }

    recordingAction = (currentTrack) => {
        if (this.state.isRecording) {
            // this.state.currentInstrument.trackList.push(this.state.currentInstrument.currentTrack);
        }

        this.setState({
            isRecording: !this.state.isRecording,
            previousTime: new Date().getTime(),
            trackRecorderDisplayButton: !this.state.isRecording ? this.stop : this.start,
            trackList: this.trackList
        });
    }

    updateInstrument = (chosenInstrument) => {
        if (chosenInstrument !== this.state.currentInstrument) {
            this.setState({
                currentInstrument: chosenInstrument,
                instrumentInstructions: chosenInstrument.instructions
            });
        }
    }

    getKey = (key) => {
        this.setState({keyPressed: key});
    }

    getCurrentTrack = (currentTrack) => {
        this.trackList.push(currentTrack);
        this.setState({
            trackList: this.trackList
        });
    }

    render() {
        return (<div className="container-fluid">
            <DashBoard changeInstrument={this.updateInstrument}></DashBoard>
            <div className="row">
                <DisplayInstrumentInstructions playWindowState={this.state}></DisplayInstrumentInstructions>
                <InstrumentPlayer getKey={this.getKey} playWindowState={this.state}></InstrumentPlayer>
                <div className="col-3 text-center">
                    <h3>Tracks</h3>
                    <DisplayTracks playWindowState={this.state}></DisplayTracks>
                    <TrackRecorder getCurrentTrack={this.getCurrentTrack} playWindowState={this.state} trackRecorderDisplayButton={this.state.trackRecorderDisplayButton}></TrackRecorder>
                </div>
            </div>
        </div>
        );
    }
}

export default PlayWindow;