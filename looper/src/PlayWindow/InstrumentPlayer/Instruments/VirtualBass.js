import React from 'react';

class VirtualBass extends React.Component {
    id = 'Bass';
    instructions = "The keys are mapped accordingly: Q is C1, W is C#1, E is D1, R is D#1, T is E1, Y is F1, U is F#1, I is G1, O is G#1, P is A1, [ is A#1, ] is B1";

    notes = {
        'q': new Audio("./assets/sounds/bass/bassC1.wav"), 
        'w': new Audio("./assets/sounds/bass/bassCSharp1.wav"), 
        'e': new Audio("./assets/sounds/bass/bassD1.wav"),
        'r': new Audio("./assets/sounds/bass/bassDSharp1.wav"), 
        't': new Audio("./assets/sounds/bass/bassE1.wav"), 
        'y': new Audio("./assets/sounds/bass/bassF1.wav"), 
        'u': new Audio("./assets/sounds/bass/bassF#1.wav"), 
        'i': new Audio("./assets/sounds/bass/bassG1.wav"), 
        'o': new Audio("./assets/sounds/bass/bassGSharp1.wav"), 
        'p': new Audio("./assets/sounds/bass/bassA1.wav"), 
        '[': new Audio("./assets/sounds/bass/bassASharp1.wav"), 
        ']': new Audio("./assets/sounds/bass/bassB1.wav")
    };

    playNote = (note) => {
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
        return (<div>Bass</div>)
    }
}

export default VirtualBass; 