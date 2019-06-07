import React from 'react';
import DashBoard from './DashBoard/DashBoard';
import TrackRecorder from './TrackRecorder/TrackRecorder';
import InstrumentPlayer from './InstrumentPlayer/InstrumentPlayer';
import VirtualGuitar from './InstrumentPlayer/Instruments/VirtualGuitar';
import VirtualDrums from './InstrumentPlayer/Instruments/VirtualDrums';
import VirtualPiano from './InstrumentPlayer/Instruments/VirtualPiano';
import VirtualBass from './InstrumentPlayer/Instruments/VirtualBass';
import Microphone from './InstrumentPlayer/Instruments/Microphone';

const DisplayInstrumentInstructions = ({ playWindowState }) => {
    return <div className="col-3 text-center">
        <h3>Instructions:</h3>
        <div>
            {playWindowState.currentInstrument.instructions}
        </div>
    </div>
};

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

const DisplayTracks = ({ playWindowState }) => {
    return <div>
        {playWindowState.trackList.map((track, index) => {
            return <div key={index}>
                <i onClick={() => playTrack(track)}>
                    <img alt="" className="thing" src={`./assets/${track.id}.svg`}></img>
                </i>
            </div>
        })
        }
    </div>
}

const playTrack = (track) => {
    track.data.forEach(value => {
        if (value.currentAudioFile) {
            sleep(value.time).then(() => {
                value.currentAudioFile.cloneNode(true).play();
                console.log(value.time);
              })
        }
    });
}

class PlayWindow extends React.Component {
    chosenInstrument = new VirtualGuitar();
    instruments = [new VirtualGuitar(), new VirtualDrums(), new Microphone(), new VirtualPiano(), new VirtualBass()];
    trackList = [];
    start;
    stop;

    constructor(props) {
        super(props);
        this.updateInstrument = this.updateInstrument.bind(this);
        this.getAudioFile = this.getAudioFile.bind(this);
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
            currentAudioFile: null,
            startTime: 0,
            time: 0,
            blah: null
        }
    }

    recordingAction = () => {
        if (this.state.isRecording) {
            this.state.currentInstrument.trackList.push(this.state.currentInstrument.currentTrack);
        }

        this.setState({
            isRecording: !this.state.isRecording,
            previousTime: new Date().getTime(),
            trackRecorderDisplayButton: !this.state.isRecording ? this.stop : this.start,
            trackList: this.trackList,
            startTime: new Date().getTime()
        });
    }

    playAll = () => {
        this.trackList.forEach(x => playTrack(x));
    }

    updateInstrument = (chosenInstrument) => {
        this.chosenInstrument = chosenInstrument;
        if (chosenInstrument !== this.state.currentInstrument) {
            this.setState({
                currentInstrument: chosenInstrument,
                instrumentInstructions: chosenInstrument.instructions,
                trackRecorderDisplayButton: this.start
            });
        }
    }

    getAudioFile = (audioFile) => {
        this.setState({ currentAudioFile: audioFile });
    }

    getCurrentTrack = (currentTrack) => {
        this.trackList.push(currentTrack);
        currentTrack.data.forEach(x => this.chosenInstrument.trackList.push(x));
        this.setState({
            trackList: this.trackList
        });
    }

    playBlob = () => {
        const audio = new Audio(this.state.currentAudioFile.blobURL);
        audio.play();
    }

    render() {
        return (<div className="container-fluid">
            <DashBoard changeInstrument={this.updateInstrument} instruments={this.instruments}></DashBoard>
            <div className="row">
                <DisplayInstrumentInstructions playWindowState={this.state}></DisplayInstrumentInstructions>
                <InstrumentPlayer getAudioFile={this.getAudioFile} playWindowState={this.state}></InstrumentPlayer>
                <div className="col-3 text-center">
                    <h3>Tracks</h3>
                    <DisplayTracks playWindowState={this.state}></DisplayTracks>
                    <TrackRecorder getCurrentTrack={this.getCurrentTrack} playWindowState={this.state} trackRecorderDisplayButton={this.state.trackRecorderDisplayButton}></TrackRecorder>
                    <button className="btn btn-primary" onClick={this.playAll}>Play All</button> 
                </div>
            </div>
        </div>
        );
    }
}

export default PlayWindow;