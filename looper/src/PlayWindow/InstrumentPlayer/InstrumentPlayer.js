import React from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import Microphone from './Instruments/Microphone';
import '../../index.scss';
import keyboard_guitar from './keyboard_guitar.png';
import keyboard_piano from './keyboard_piano.png';
import keyboard_drums from './keyboard_drums.png';
import keyboard_bass from './keyboard_bass.png';

class InstrumentPlayer extends React.Component {

    constructor(props) {
        super(props);
        this.display_image = null;

        this.state = {
            key: null
        }
    }

    render() {
        if (this.props.playWindowState.currentInstrument.id === 'Guitar'){
            this.display_image = keyboard_guitar;
        }
        else if (this.props.playWindowState.currentInstrument.id === 'Piano'){
            this.display_image = keyboard_piano;
        }
        else if (this.props.playWindowState.currentInstrument.id === 'Drums')
        {
            this.display_image = keyboard_drums;
        }
        else if (this.props.playWindowState.currentInstrument.id === 'Bass'){
            this.display_image = keyboard_bass;
        }
        if (this.props.playWindowState.currentInstrument.id === 'Microphone') {

            return (<div className="m-3">
                <h2>Selected Instrument: </h2>
                <h3>{this.props.playWindowState.currentInstrument.id}</h3>
                <Microphone getBlob={this.props.getBlob} playWindowState={this.props.playWindowState}></Microphone>
            </div>)
        } else {
            return <div className="m-3">
                <h2>Selected Instrument: </h2>
                    <h3>{this.props.playWindowState.currentInstrument.id}</h3>
                    <KeyboardEventHandler     
                    handleKeys={['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']']}
                    onKeyEvent={(key) => {
                        this.props.getAudioFile(this.props.playWindowState.currentInstrument.notes[key]);
                        this.props.playWindowState.currentInstrument.playNote(key);
                    }
                    }
                >
                </KeyboardEventHandler>
                <img className="m-3" src={this.display_image} alt=''/>
            </div>
        }
    }
}

export default InstrumentPlayer;