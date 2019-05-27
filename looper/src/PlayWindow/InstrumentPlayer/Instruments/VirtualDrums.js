import React from 'react';

class VirtualDrums extends React.Component {
    id = 'Drums';
    instructions = "The keys are mapped accordingly: W is the snare drum, A is the bass drum, S is the hi-hat, D is a cymbal";
    trackList = [];
    // acousticSnare = new Audio('./assets/sounds/drums/snare-acoustic01.wav');
    // distSnare = new Audio('./assets/sounds/drums/snare-dist02.wav');
    // smashSnare = new Audio('./assets/sounds/drums/snare-smasher.wav');
    // acousticCrash = new Audio('./assets/sounds/drums/crash-acoustic.wav');
    // acousticKick = new Audio('./assets/sounds/drums/kick-acoustic.wav');

    notes = {
            'q': new Audio('./assets/sounds/drums/snare-acoustic01.wav'),
            'w': new Audio('./assets/sounds/drums/snare-dist02.wav'),
            'e': new Audio('./assets/sounds/drums/snare-smasher.wav'),
            'r': new Audio('./assets/sounds/drums/crash-acoustic.wav'),
            't': new Audio('./assets/sounds/drums/kick-acoustic.wav')
    };

    playNote = () => {
        if (this.props.note && this.notes[this.props.note]) {
            this.notes[this.props.note].play();
        }
    }
    
    render() {
        return (<div>Drums{this.playNote()}</div>)
    }
}

export default VirtualDrums; 