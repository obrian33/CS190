class VirtualGuitar {
    id = 'Guitar';
    instructions = "";//The keys are mapped accordingly: W is A, A is B, S is C, D is D, F is E, J is F, K is G, L is H, ; is I";
    trackList = [];

    notes = {
        'q': new Audio('./assets/sounds/guitar/C2_guitar.wav'),
        'w': new Audio('./assets/sounds/guitar/Cs2_guitar.wav'),
        'e': new Audio('./assets/sounds/guitar/D2_guitar.wav'),
        'r': new Audio('./assets/sounds/guitar/Ds2_guitar.wav'),
        't': new Audio('./assets/sounds/guitar/E2_guitar.wav'),
        'y': new Audio('./assets/sounds/guitar/F2_guitar.wav'),
        'u': new Audio('./assets/sounds/guitar/Fs2_guitar.wav'),
        'i': new Audio('./assets/sounds/guitar/G2_guitar.wav'),
        'o': new Audio('./assets/sounds/guitar/Gs2_guitar.wav'),
        'p': new Audio('./assets/sounds/guitar/A2_guitar.wav'),
        '[': new Audio('./assets/sounds/guitar/As2_guitar.wav'),
        ']': new Audio('./assets/sounds/guitar/B2_guitar.wav')
    };

    playNote = (keyPressed) => {
        if (keyPressed && this.notes[keyPressed]) {
            this.notes[keyPressed].cloneNode(true).play();
        }
    }
}

export default VirtualGuitar; 