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
                //previousTime: this.props.playWindowState.previousTime
                timeDiff: timeDiff,
                timeStamp: this.timeStamp
                //realtime: this.timeStamp - this.startTime
            });
        }
        if (this.props.playWindowState.isRecording && !this.pressed) {
            this.pressed = true;
        }
          else if (!this.props.playWindowState.isRecording && this.currentTrack.id) {
            this.currentTrack.id = this.props.playWindowState.currentInstrument.id;
            this.props.getCurrentTrack(this.currentTrack);
            this.currentTrack = {
                id: null,
                data: []
            };
            this.pressed = false;
        }
        this.thing.current.blur();
    }

    render() {
        return (<div>
            <button ref={this.thing} type="button" className="btn btn-primary" onClick={() => this.props.trackRecorderDisplayButton.buttonFunction()}>{this.props.trackRecorderDisplayButton.buttonText}</button>
            <br />
            <br />
        </div>);
    }
}

export default TrackRecoder;