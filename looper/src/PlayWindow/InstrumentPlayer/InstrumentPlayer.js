import React from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import VirtualGuitar from './Instruments/VirtualGuitar';
import VirtualDrums from './Instruments/VirtualDrums';
import Microphone from './Instruments/Microphone';
import VirtualPiano from './Instruments/VirtualPiano';
import VirtualBass from './Instruments/VirtualBass';

const InstrumentSelector = ({playWindowState, state}) => {
    switch (playWindowState.currentInstrument.id) {
        default:
        case 'Guitar':
            return <VirtualGuitar></VirtualGuitar>;
        case 'Drums':
            return <VirtualDrums playWindowState={playWindowState} keyPressed={state}></VirtualDrums>;
        case 'Microphone':
            return <Microphone></Microphone>;
        case 'Piano':
            return <VirtualPiano></VirtualPiano>;
        case 'Bass':
            return <VirtualBass></VirtualBass>;
    }
}

class InstrumentPlayer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            key: null
        }
    }

    shouldComponentUpdate(nextProps) {
        // console.log(nextProps);
        // console.log(this.props.playWindowState.isRecording === nextProps.playWindowState.isRecording);
        return this.props.playWindowState.isRecording === nextProps.playWindowState.isRecording;
    }

    render() {
        return (
            <div className="col-6 text-center">
                <h3>Selected Instrument: </h3>
                <InstrumentSelector playWindowState={this.props.playWindowState} state={this.state}></InstrumentSelector>
                <KeyboardEventHandler
                handleKeys={['q', 'w', 'e', 'r', 't', 'y']}
                onKeyEvent={(key) => {this.props.getKey(key);this.setState({key: key})}}
                >
                </KeyboardEventHandler>
            </div>
        );
    }
}

export default InstrumentPlayer;