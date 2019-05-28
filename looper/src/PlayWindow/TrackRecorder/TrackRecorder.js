import React from 'react';

const RecordingAction = ({trackRecorderDisplayButton}) => {
    return <div>
    <button type="button" className="btn btn-primary" onClick={() => trackRecorderDisplayButton.buttonFunction()}>{trackRecorderDisplayButton.buttonText}</button>
</div>
}

class TrackRecoder extends React.Component {

    render() {
        return (<div><RecordingAction trackRecorderDisplayButton={this.props.trackRecorderDisplayButton}></RecordingAction></div>);
    }
}

export default TrackRecoder;