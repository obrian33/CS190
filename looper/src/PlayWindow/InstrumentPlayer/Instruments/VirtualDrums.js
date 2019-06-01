class VirtualDrums {
    id = 'Drums';
    instructions = "The keys are mapped accordingly: W is the snare drum, A is the bass drum, S is the hi-hat, D is a cymbal";
    trackList = [];

    notes = {
            'q': new Audio('./assets/sounds/drums/snare-acoustic01.wav'),
            'w': new Audio('./assets/sounds/drums/snare-dist02.wav'),
            'e': new Audio('./assets/sounds/drums/snare-smasher.wav'),
            'r': new Audio('./assets/sounds/drums/crash-acoustic.wav'),
            't': new Audio('./assets/sounds/drums/kick-acoustic.wav')
    };

    playNote = (keyPressed) => {
        if (keyPressed && this.notes[keyPressed]) {
            this.notes[keyPressed].cloneNode(true).play();
        }
    }
}

export default VirtualDrums; 