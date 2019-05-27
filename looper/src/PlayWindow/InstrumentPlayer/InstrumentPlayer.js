import React from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import VirtualGuitar from './Instruments/VirtualGuitar';
import VirtualDrums from './Instruments/VirtualDrums';
import Microphone from './Instruments/Microphone';
import VirtualPiano from './Instruments/VirtualPiano';
import VirtualBass from './Instruments/VirtualBass';

class InstrumentPlayer extends React.Component {
    key;

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
            case 'guitar':
                return <VirtualGuitar></VirtualGuitar>;
            case 'Drums':
                return <VirtualDrums note={this.state.keyPressed}></VirtualDrums>;
            case 'microphone':
                return <Microphone></Microphone>;
            case 'piano':
                return <VirtualPiano></VirtualPiano>;
            case 'bass':
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
                onKeyEvent={(key) => this.updateKeypressed(key)}
                >
                </KeyboardEventHandler>
            </div>
        );
    }
}

export default InstrumentPlayer;