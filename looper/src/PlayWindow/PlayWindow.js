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

const DisplayTracks = ({ playWindowState }) => {
    return <div>
        {playWindowState.trackList.map((track, index) => {
            return <div key={index}>
                <i onClick={() => playTrack(track)}>
                    <img alt="" className="thing m-3" src={`./assets/${track.id}.svg`}></img>
                </i>
            </div>
        })
        }
    </div>
}

const playTrack = (track) => {
    if (track.id !== 'Microphone') {
        track.data.forEach(value => {
            if (value.currentAudioFile) {
                value.currentAudioFile.cloneNode(true).play();
            }
        });
    } else {
        const audio = new Audio(track.data[0].blobURL);
        audio.play();
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
            trackList: this.trackList
        });
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
                    <button type="button" className="btn btn-primary m-3" onClick={this.playAllTracks}>Play All</button>
                </div>
            </div>
        </div>
        );
    }
}

export default PlayWindow;