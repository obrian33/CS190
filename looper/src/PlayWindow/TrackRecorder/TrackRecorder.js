import React from 'react';


const RecordTrack = ({ addNewRecord }) => {
    return <div>
        <button type="button" className="btn btn-primary" onClick={() => addNewRecord}>Record</button>
    </div>
}

class TrackRecoder extends React.Component {
    isRecording = false;

    render() {
        return (<RecordTrack addNewRecord=""></RecordTrack>);
    }
}

export default TrackRecoder;