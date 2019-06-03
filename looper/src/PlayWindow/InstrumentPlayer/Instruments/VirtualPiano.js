import React from 'react';

class VirtualPiano extends React.Component {
    id = 'Piano';
    instructions = "The keys are mapped accordingly: ";

    notes = {
            'q': new Audio('./assets/sounds/Piano/Piano.ff.C4.wav'),
            'w': new Audio('./assets/sounds/Piano/Piano.ff.Db4.wav'),
            'e': new Audio('./assets/sounds/Piano/Piano.ff.D4.wav'),
            'r': new Audio('./assets/sounds/Piano/Piano.ff.Eb4.wav'),
            't': new Audio('./assets/sounds/Piano/Piano.ff.E4.wav'),
            'y': new Audio('./assets/sounds/Piano/Piano.ff.F4.wav'),
            'u': new Audio('./assets/sounds/Piano/Piano.ff.Gb4.wav'),
            'i': new Audio('./assets/sounds/Piano/Piano.ff.G4.wav'),
            'o': new Audio('./assets/sounds/Piano/Piano.ff.Ab4.wav'),
            'p': new Audio('./assets/sounds/Piano/Piano.ff.A4.wav'),
            '[': new Audio('./assets/sounds/Piano/Piano.ff.Bb4.wav'),
            ']': new Audio('./assets/sounds/Piano/Piano.ff.B4.wav')
    };

    playNote = (note) => {
        if (this.props.keyPressed.key && this.notes[this.props.keyPressed.key]) {
            // this.props.getAudioFile(this.notes[this.props.keyPressed.key]);
            this.notes[this.props.keyPressed.key].play();
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.playWindowState.isRecording === this.props.playWindowState.isRecording;
    }
    
    componentDidUpdate() {
        this.playNote();
    }
    
    render() {
        return (<div>Piano</div>)
    }
}

export default VirtualPiano; 