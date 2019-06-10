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
    return <div className="m-5">
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
                <i onClick={() => playTrack(track, stopTime)}>
                    <img alt="" className="thing m-3" src={`./assets/${track.id}.svg`}></img>
                </i>
            </div>
        })
        }
    </div>
}

var callToStop = false;
var stopTime = 0;

const playTrack = async (track, stopTime) => {
    var totalWait = 0;
    var firstWait = 0;
    var hitFirst = false;
    var lastWait = 0;
    var waitTime = 0;
    callToStop = false;
    while (true) {
        if (callToStop) {
            return;
        }
        if (track.id !== 'Microphone') {
            track.data.forEach(value => {
                if (value.currentAudioFile) {
                    waitTime = value.timeDiff;
                    if (!hitFirst) {
                        hitFirst = true;
                        firstWait = value.timeDiff;
                        waitTime = 0;
                    }
                    totalWait = value.timeDiff;
                    sleep(waitTime).then(() => {
                        value.currentAudioFile.cloneNode(true).play();
                    });
                    lastWait = value.timeStamp;
                }
            });
            let promise = new Promise(resolve => {
                setTimeout(() => resolve("done"), totalWait + stopTime - lastWait - firstWait);
            });
            totalWait = 0;
            await promise;
        }
        else {
            const audio = new Audio(track.data[0].blobURL);
            console.log(track.data);
            audio.play();
            let promise = new Promise(resolve => {
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
        this.stopTime = 0;
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

    recordingAction = () => {
        if (this.state.isRecording) {
            this.state.currentInstrument.trackList.push(this.state.currentInstrument.currentTrack);
            stopTime = new Date().getTime();
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
        this.trackList.forEach(x => playTrack(x, stopTime));
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

    trackVerification = (trackListToVerify, trackIndex) => {
        return trackIndex < trackListToVerify.length
            && trackListToVerify[trackIndex]
            && trackListToVerify[trackIndex].currentAudioFile;
    }

    playAllTracks = () => {
        for (let i = 0; i < 10; i += 1) {
            if (this.trackVerification(this.instruments[0].trackList, i)) {
                this.instruments[0].trackList[i].currentAudioFile.cloneNode(true).play();
            }

            if (this.trackVerification(this.instruments[1].trackList, i)) {
                this.instruments[1].trackList[i].currentAudioFile.cloneNode(true).play();
            }

            // if (this.trackVerification(this.instruments[2].trackList, i)) {
            //     this.instruments[2].trackList[i].currentAudioFile.cloneNode(true).play();
            // }

            if (this.trackVerification(this.instruments[3].trackList, i)) {
                this.instruments[3].trackList[i].currentAudioFile.cloneNode(true).play();
            }

            if (this.trackVerification(this.instruments[4].trackList, i)) {
                this.instruments[4].trackList[i].currentAudioFile.cloneNode(true).play();
            }

        }
    }

    callStop = () => {
        if (!callToStop) {
            callToStop = true;
        }
        else {
            callToStop = false;
        }
    }

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
                    <DisplayTracks playWindowState={this.state}></DisplayTracks>
                    <TrackRecorder getCurrentTrack={this.getCurrentTrack} playWindowState={this.state} trackRecorderDisplayButton={this.state.trackRecorderDisplayButton}></TrackRecorder>
                    <button className="btn btn-primary" onClick={this.playAll}>Play All</button> 
                    <br />
                    <br />
                    <button className="btn btn-primary" onClick={this.callStop}>Stop Playback</button>
                </div>
            </div>
        </div>
        );
    }
}

export default PlayWindow;