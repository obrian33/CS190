import React from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';

class InstrumentPlayer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            key: null
        }
    }

    render() {
        return (
            <div className="col-6 text-center">
                <h3>Selected Instrument: </h3>
                {this.props.playWindowState.currentInstrument.id}
                <KeyboardEventHandler
                    handleKeys={['q', 'w', 'e', 'r', 't', 'y']}
                    onKeyEvent={(key) => {
                        this.props.getAudioFile(this.props.playWindowState.currentInstrument.notes[key]);
                        this.props.playWindowState.currentInstrument.playNote(key);
                        }
                    }
                >
                </KeyboardEventHandler>
            </div>
        );
    }
}

export default InstrumentPlayer;