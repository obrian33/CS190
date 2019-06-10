import React from 'react';

class TrackRecoder extends React.Component {
    trackList = [];
    currentTrack = {
        id: null,
        data: []
    };

    constructor(props) {
        super(props);
        this.thing = React.createRef();
        this.pressed = false;
       // this.startTime = 0;
    }

    componentDidUpdate() {
        if (this.props.playWindowState.isRecording && this.pressed) {
            this.currentTrack.id = this.props.playWindowState.currentInstrument.id;
            this.timeStamp = new Date().getTime();
            let timeDiff = this.timeStamp - this.props.playWindowState.startTime;
            console.log("pushed");
            this.currentTrack.data.push({
                currentAudioFile: this.props.playWindowState.currentAudioFile,
                timeDiff: timeDiff,
                timeStamp: this.timeStamp
            });
        }
        else if (!this.props.playWindowState.isRecording && this.currentTrack.id && this.currentTrack.id !== 'Microphone') {
            this.currentTrack.id = this.props.playWindowState.currentInstrument.id;
            this.props.getCurrentTrack(this.currentTrack);
            this.currentTrack = {
                id: null,
                data: []
            };
            this.pressed = false;
        }
        if (this.props.playWindowState.isRecording && !this.pressed) {
            this.pressed = true;
        }
        this.thing.current.blur();
    }

    render() {
        return <button ref={this.thing} type="button" className="btn btn-primary m-3" onClick={() => this.props.trackRecorderDisplayButton.buttonFunction()}>{this.props.trackRecorderDisplayButton.buttonText}</button>
    }
}

export default TrackRecoder;