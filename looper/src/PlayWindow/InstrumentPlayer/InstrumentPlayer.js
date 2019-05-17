import React from 'react';
import VirtualGuitar from './Instruments/VirtualGuitar';
import VirtualDrums from './Instruments/VirtualDrums';

class InstrumentPlayer extends React.Component {

    changeInstrument = () => {
        switch(this.props.currentInstrument) {
            default:
            case 'guitar':
                return <VirtualGuitar></VirtualGuitar>;
            case 'drums':
                return <VirtualDrums></VirtualDrums>

        }
    }

    render() {
        return (
            <div className="row"><div className="col">{this.changeInstrument()}</div></div>
        );
    }
}

export default InstrumentPlayer;