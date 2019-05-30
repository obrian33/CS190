import React from 'react';

class VirtualDrums extends React.Component {
    id = 'Drums';
    instructions = "The keys are mapped accordingly: W is the snare drum, A is the bass drum, S is the hi-hat, D is a cymbal";

    notes = {
            'q': new Audio('./assets/sounds/drums/snare-acoustic01.wav'),
            'w': new Audio('./assets/sounds/drums/snare-dist02.wav'),
            'e': new Audio('./assets/sounds/drums/snare-smasher.wav'),
            'r': new Audio('./assets/sounds/drums/crash-acoustic.wav'),
            't': new Audio('./assets/sounds/drums/kick-acoustic.wav')
    };

    playNote = () => {
        // console.log(this.props.playWindowState);
        if (this.props.keyPressed.key && this.notes[this.props.keyPressed.key]) {
            this.notes[this.props.keyPressed.key].play();
        }
    }

    shouldComponentUpdate(nextProps) {
        // console.log(this.props);
        // console.log(nextProps);
        return nextProps.playWindowState.isRecording === this.props.playWindowState.isRecording;
    }
    
    componentDidUpdate() {
        this.playNote()
    }
    
    render() {
        return (<div>Drums</div>)
    }
}

export default VirtualDrums; 