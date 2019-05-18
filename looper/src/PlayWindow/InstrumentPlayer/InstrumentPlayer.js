import React from 'react';
import VirtualGuitar from './Instruments/VirtualGuitar';
import VirtualDrums from './Instruments/VirtualDrums';
import Microphone from './Instruments/Microphone';
import VirtualPiano from './Instruments/VirtualPiano';
import VirtualBass from './Instruments/VirtualBass';

class InstrumentPlayer extends React.Component {

    changeInstrument = () => {
        switch(this.props.currentInstrument) {
            default:
            case 'guitar':
                return <VirtualGuitar></VirtualGuitar>;
            case 'drum':
                return <VirtualDrums></VirtualDrums>;
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
            <div className="row"><div className="col">{this.changeInstrument()}</div></div>
        );
    }
}

export default InstrumentPlayer;