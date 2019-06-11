import React from 'react';
import DashBoard from './DashBoard/DashBoard';
import TrackRecorder from './TrackRecorder/TrackRecorder';
import InstrumentPlayer from './InstrumentPlayer/InstrumentPlayer';
import VirtualGuitar from './InstrumentPlayer/Instruments/VirtualGuitar';
import VirtualDrums from './InstrumentPlayer/Instruments/VirtualDrums';
import VirtualPiano from './InstrumentPlayer/Instruments/VirtualPiano';
import VirtualBass from './InstrumentPlayer/Instruments/VirtualBass';
import Microphone from './InstrumentPlayer/Instruments/Microphone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

// Renders the instructions
const DisplayInstrumentInstructions = ({ playWindowState }) => {
    return <div className="m-5">
        <h3>Instructions:</h3>
        <div>
            <p>
                Press any of the above keys to play the indicated sound. Begin recording input by pressing the "Record" button.
                Stop recording by pressing the "Stop Recording" button. Recorded tracks can be played individually by clicking 
                on the track icons (which will appear after making a recording). Clicking the "Play All" button will play all
                tracks simultaneously. Playback can be stopped by clicking the "Stop Playback" button. Tracks can be deleted
                by clicking on the red "X" button next to each track. 
            </p>
        </div>
    </div>
};

// Sleep function used to make the looper wait before playing the next note in a track
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

// Global variable that indicates the user's choice to stop playback
var callToStop = false;

// Renders the recorded tracks
const DisplayTracks = ({ playWindowState, removeTrack}) => {
    return <div>
        {playWindowState.trackList.map((track, index) => {
            return <div key={index}>
                <i onClick={() => playTrack(track, track.stopTime)}>
                    <img alt="" className="thing m-3" src={`./assets/${track.id}.svg`}></img>
                </i>
                <FontAwesomeIcon color="red" icon={faTimesCircle} onClick={() => removeTrack(index)}></FontAwesomeIcon>
            </div>
        })
        }
    </div>
}

// Asynchronous function that loops through and plays a recorded track
const playTrack = async (track, stopTime) => {
    var firstTime = 0;
    var hitFirst = false;
    var waitTime = 0;
    callToStop = false;
    while (true) {
        // Checks every loop through to see if the user has clicked the "Stop Playback" button
        if (callToStop) {
            return;
        }
        if (track.id !== 'Microphone') { // If recorded instrument is not microphone
            track.data.forEach(value => {
                if (value.currentAudioFile) { // Loop through each sound in the track and play sequentially
                    waitTime = value.timeDiff;
                    if (!hitFirst) {
                        hitFirst = true;
                        firstTime = value.timeStamp;
                        waitTime = 0;
                    }
                    sleep(waitTime).then(() => { // Wait the appropriate amount of time before playing next sound in track
                        value.currentAudioFile.cloneNode(true).play();
                    });
                }
            });
            // Don't replay track until it has finished playing
            var promise = new Promise(resolve => {
                setTimeout(() => resolve("done"), stopTime - firstTime);
            })
            await promise;
        }
        else { // If recorded instrument is a microphone
            // Store and play blob object holding microphone input
            const audio = new Audio(track.data[0].blobURL); 
            audio.play();
            // Don't replay track until it has finished playing
            var promise = new Promise(resolve => {
                setTimeout(() => resolve("done"), track.data[0].stopTime - track.data[0].startTime);
            });
            await promise;
        }
    }
}

class PlayWindow extends React.Component {
    chosenInstrument = new VirtualGuitar();
    instruments = [this.chosenInstrument, new VirtualDrums(), new Microphone(), new VirtualPiano(), new VirtualBass()];
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
            buttonText: 'Stop Recording'
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

    // Remove selected track
    removeTrack = (index) => {
        if (index > -1) {
            this.state.trackList.splice(index, 1);
        }
        this.setState({
            trackList: this.state.trackList
        });
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

    // Play all recorded tracks
    playAll = () => {
        this.trackList.forEach(x => playTrack(x, x.stopTime));
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

    getBlob = (blob) => {
        this.trackList.push({
            id: 'Microphone',
            data: [blob]
        });
        this.setState({
            trackList: this.trackList
        });
    }

    // Renders the "Record", "Play All", and "Stop Playback" buttons
    render() {
        return (<div className="container-fluid">
            <DashBoard changeInstrument={this.updateInstrument} instruments={this.instruments}></DashBoard>
            <div className="row">
                <div className="col-4 text-center"></div>
                <div className="col-4 text-center">
                    <InstrumentPlayer getBlob={this.getBlob} getAudioFile={this.getAudioFile} playWindowState={this.state}></InstrumentPlayer>
                    <DisplayInstrumentInstructions playWindowState={this.state}></DisplayInstrumentInstructions>
                </div>
                <div className="col-4 text-center">
                    <h2 className="m-3">Tracks</h2>
                    <DisplayTracks playWindowState={this.state} removeTrack={this.removeTrack}></DisplayTracks>
                    <TrackRecorder getCurrentTrack={this.getCurrentTrack} playWindowState={this.state} trackRecorderDisplayButton={this.state.trackRecorderDisplayButton}></TrackRecorder>
                    <button className="btn btn-primary" onClick={this.playAll}>Play All</button> 
                    <br />
                    <br />
                    <button className="btn btn-primary" onClick={() => callToStop = !callToStop}>Stop Playback</button>
                </div>
            </div>
        </div>
        );
    }
}

export default PlayWindow;