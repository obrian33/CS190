import React from 'react';

class VirtualBass extends React.Component {
    id = 'Bass';
    instructions = "The keys are mapped accordingly: W is A, A is B, S is C, D is D, F is E, J is F, K is G, L is H, ; is I";
    trackList = [];

    notes = {

    };

    playNote = (note) => {
        if (note && this.notes[note]) {
            this.notes[note].play();
        }
    }
    
    render() {
        return <div>Bass</div>
    }
}

export default VirtualBass; 