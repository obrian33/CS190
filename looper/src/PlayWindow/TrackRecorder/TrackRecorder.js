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
    }

    componentDidUpdate() {
        if (this.props.playWindowState.isRecording) {
            this.currentTrack.id = this.props.playWindowState.currentInstrument.id;
            this.currentTrack.data.push({
                currentAudioFile: this.props.playWindowState.currentAudioFile,
                previousTime: this.props.playWindowState.previousTime
            });
        } else if (!this.props.playWindowState.isRecording && this.currentTrack.id) {
            this.currentTrack.id = this.props.playWindowState.currentInstrument.id;
            this.props.getCurrentTrack(this.currentTrack);
            this.currentTrack = {id: null,
                data: []};
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