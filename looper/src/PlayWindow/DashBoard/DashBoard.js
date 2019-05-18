import React from 'react';
import VirtualGuitar from '../InstrumentPlayer/Instruments/VirtualGuitar';
import VirtualDrums from '../InstrumentPlayer/Instruments/VirtualDrums';
import VirtualPiano from '../InstrumentPlayer/Instruments/VirtualPiano';
import VirtualBass from '../InstrumentPlayer/Instruments/VirtualBass';
import Microphone from '../InstrumentPlayer/Instruments/Microphone';


class DashBoard extends React.Component {

    render() {
        const title = "Music Looper";
        const instruments = [new VirtualGuitar(), new VirtualDrums(), new Microphone(), new VirtualPiano(), new VirtualBass()];

        return (<div className="row nav-background">
            <div className="col">
                <h3>{title}</h3>
            </div>
            {instruments.map((instrument, i) => {
                return <div key={i} className="col">
                    <img alt="" onClick={() => { this.props.changeInstrument(instrument) }} className="thing" src={`./assets/${instrument.id}.svg`}>
                    </img>
                </div>
            })}
        </div>
        );
    }
}

export default DashBoard;