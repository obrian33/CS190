import React from 'react';
import VirtualGuitar from '../InstrumentPlayer/Instruments/VirtualGuitar';
import VirtualDrums from '../InstrumentPlayer/Instruments/VirtualDrums';
import VirtualPiano from '../InstrumentPlayer/Instruments/VirtualPiano';
import VirtualBass from '../InstrumentPlayer/Instruments/VirtualBass';
import Microphone from '../InstrumentPlayer/Instruments/Microphone';

class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.instruments = [new VirtualGuitar(), new VirtualDrums(), new Microphone(), new VirtualPiano(), new VirtualBass()];
    }
    
    render() {
        const title = "Music Looper";

        return (<div className="row nav-background">
            <div className="col other-color">
                <h3>{title}</h3>
            </div>
            {this.instruments.map((instrument, i) => {
                return <div key={i} className="col other-color">
                    <img alt="" onClick={() => { this.props.changeInstrument(instrument) }} className="thing" src={`./assets/${instrument.id}.svg`}>
                    </img>
                    <div>{instrument.id}</div>
                </div>
            })}
        </div>
        );
    }
}

export default DashBoard;