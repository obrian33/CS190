import React from 'react';
import ReactMicRecord from 'react-mic-record';

class Microphone extends React.Component {
    id = 'Microphone';
    instructions = "Speak into your microphone";
    trackList = [];

    render() {
        return <div>
            <ReactMicRecord
                className="w-100"
                record={this.props.playWindowState.isRecording}
                onStop={(recordedBlob) => {
                    this.trackList.push(recordedBlob);
                    this.props.getBlob(recordedBlob);
                }} />
        </div>
    }
}

export default Microphone; 