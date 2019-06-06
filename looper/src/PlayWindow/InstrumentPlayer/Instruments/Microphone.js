import React from 'react';
import ReactMicRecord from 'react-mic-record';

class Microphone extends React.Component {
    id = 'Microphone';
    instructions = "Speak into your microphone";
    trackList = [];

    render() {
        return <div className="col-6 text-center">
            <ReactMicRecord
                record={this.props.playWindowState.isRecording}
                onStop={(recordedBlob) => {
                    this.trackList.push(recordedBlob);
                    this.props.getBlob(recordedBlob);
                }} />
        </div>
    }
}

export default Microphone; 