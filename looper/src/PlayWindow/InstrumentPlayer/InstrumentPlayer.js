import React from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import Microphone from './Instruments/Microphone';
import keyboard_guitar from './keyboard_guitar2.png';
class InstrumentPlayer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            key: null
        }
    }

    render() {
        if (this.props.playWindowState.currentInstrument.id === 'Microphone') {

            return (<div className="col-6 text-center">
                <h3>Selected Instrument: </h3>
                {this.props.playWindowState.currentInstrument.id}
                <Microphone getAudioFile={this.props.getAudioFile} playWindowState={this.props.playWindowState}></Microphone>
            </div>)
        } else {
            return <div className="col-6 text-center">
                <h3>Selected Instrument: </h3>
                    {this.props.playWindowState.currentInstrument.id}
                    <KeyboardEventHandler     
                    handleKeys={['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']']}
                    onKeyEvent={(key) => {
                        this.props.getAudioFile(this.props.playWindowState.currentInstrument.notes[key]);
                        this.props.playWindowState.currentInstrument.playNote(key);
                    }
                    }
                >
                </KeyboardEventHandler>
            </div>
        }
    }
}

export default InstrumentPlayer;