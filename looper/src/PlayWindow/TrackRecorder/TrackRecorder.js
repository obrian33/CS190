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
        this.prevTime = 0;
    }

    componentDidUpdate() {
        if (this.props.playWindowState.isRecording) {
            this.currentTrack.id = this.props.playWindowState.currentInstrument.id;
            var timeStamp = new Date().getTime();
            var timeDiff = timeStamp - this.prevTime;
            this.prevTime = timeStamp;
            this.currentTrack.data.push({
                currentAudioFile: this.props.playWindowState.currentAudioFile,
                timeDifference: timeDiff
                //previousTime: this.props.playWindowState.previousTime
            });
        } else if (!this.props.playWindowState.isRecording && this.currentTrack.id) {
            this.currentTrack.id = this.props.playWindowState.currentInstrument.id;
            this.props.getCurrentTrack(this.currentTrack);
            this.currentTrack = {
                id: null,
                data: []
            };
        }
        this.thing.current.blur();
    }

    render() {
        return (<div>
            <button ref={this.thing} type="button" className="btn btn-primary" onClick={() => this.props.trackRecorderDisplayButton.buttonFunction()}>{this.props.trackRecorderDisplayButton.buttonText}</button>
        </div>);
    }
}

export default TrackRecoder;