import React from 'react';

class TrackRecoder extends React.Component {

    constructor(props) {
        super(props);
        this.thing = React.createRef();
    }

    componentDidUpdate() {
        this.thing.current.blur();
    }

    render() {
        return (<div>
            <button ref={this.thing} type="button" className="btn btn-primary" onClick={() => this.props.trackRecorderDisplayButton.buttonFunction()}>{this.props.trackRecorderDisplayButton.buttonText}</button>
        </div>);
    }
}

export default TrackRecoder;