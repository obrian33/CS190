import React from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import VirtualGuitar from './Instruments/VirtualGuitar';
import VirtualDrums from './Instruments/VirtualDrums';
import Microphone from './Instruments/Microphone';
import VirtualPiano from './Instruments/VirtualPiano';
import VirtualBass from './Instruments/VirtualBass';

class InstrumentPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            keyPressed: null
        };

        this.updateKeypressed = this.updateKeypressed.bind(this);
    }

    updateKeypressed = (key) => { 
        this.setState({
            keyPressed: key
        })
    }

    changeInstrument = () => {
        switch (this.props.currentInstrument.id) {
            default:
            case 'Guitar':
                return <VirtualGuitar></VirtualGuitar>;
            case 'Drums':
                return <VirtualDrums isRecording={this.props.isRecording} previousTime={this.props.playWindowState.previousTime}></VirtualDrums>;
            case 'Microphone':
                return <Microphone></Microphone>;
            case 'Piano':
                return <VirtualPiano></VirtualPiano>;
            case 'Bass':
                return <VirtualBass></VirtualBass>;
        }
    }

    render() {
        return (
            <div className="col-6 text-center">
                <h3>Selected Instrument: </h3>
                {this.changeInstrument()}
                <KeyboardEventHandler
                handleKeys={['q', 'w', 'e', 'r', 't', 'y']}
                onKeyEvent={(key) => this.props.currentInstrument.id !== 'Microphone' ? this.props.currentInstrument.playNote(key, this.props) : null }
                >
                </KeyboardEventHandler>
            </div>
        );
    }
}

export default InstrumentPlayer;