import React from 'react';

class VirtualPiano extends React.Component {
    id = 'Piano';
    instructions = "The keys are mapped accordingly: ";

    notes = {
            'q': new Audio('./assets/sounds/Piano/Piano.mf.C4.wav'),
            'w': new Audio('./assets/sounds/Piano/Piano.mf.Db4.wav'),
            'e': new Audio('./assets/sounds/Piano/Piano.mf.D4.wav'),
            'r': new Audio('./assets/sounds/Piano/Piano.mf.Eb4.wav'),
            't': new Audio('./assets/sounds/Piano/Piano.mf.E4.wav'),
            'y': new Audio('./assets/sounds/Piano/Piano.mf.F4.wav'),
            'u': new Audio('./assets/sounds/Piano/Piano.mf.Gb4.wav'),
            'i': new Audio('./assets/sounds/Piano/Piano.mf.G4.wav'),
            'o': new Audio('./assets/sounds/Piano/Piano.mf.Ab4.wav'),
            'p': new Audio('./assets/sounds/Piano/Piano.mf.A4.wav'),
            '[': new Audio('./assets/sounds/Piano/Piano.mf.Bb4.wav'),
            ']': new Audio('./assets/sounds/Piano/Piano.mf.B4.wav')
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