import React from 'react';

class VirtualDrums extends React.Component {
    id = 'Drums';
    instructions = "The keys are mapped accordingly: ";

    notes = {
            'q': new Audio('./assets/sounds/drums/snare-acoustic01.wav'),
            'w': new Audio('./assets/sounds/drums/kick-808.wav'),
            'e': new Audio('./assets/sounds/drums/snare-smasher.wav'),
            'r': new Audio('./assets/sounds/drums/perc-metal.wav'),
            't': new Audio('./assets/sounds/drums/kick-acoustic02.wav'),
            'y': new Audio('./assets/sounds/drums/tom-acoustic01.wav'),
            'u': new Audio('./assets/sounds/drums/tom-analog.wav'),
            'i': new Audio('./assets/sounds/drums/kick-classic.wav'),
            'o': new Audio('./assets/sounds/drums/kick-cultivator.wav'),
            'p': new Audio('./assets/sounds/drums/crash-acoustic.wav'),
            '[': new Audio('./assets/sounds/drums/hihat-acoustic02.wav'),
            ']': new Audio('./assets/sounds/drums/clap-tape.wav')
    };

    playNote = () => {
        if (this.props.keyPressed.key && this.notes[this.props.keyPressed.key]) {
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
        return (<div>Drums</div>)
    }
}

export default VirtualDrums; 