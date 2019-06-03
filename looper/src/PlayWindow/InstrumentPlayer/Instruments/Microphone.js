class Microphone {
    id = 'Microphone';
    instructions = "Speak into your microphone";
    mediaRecorder = null;
    buffer = [];

    constructor() {
        if (navigator.mediaDevices) {
            navigator.mediaDevices.getUserMedia({"audio": true}).then((stream) => {
                this.mediaRecorder = new MediaRecorder(stream);
                this.mediaRecorder.ondataavailable = (theEvent) => {
                    this.buffer.push(theEvent.data)
                }
            })
        }
    }
    
    handleClick() {
        if (navigator.mediaDevices) {

            navigator.mediaDevices.getUserMedia({"audio": true}).then((stream) => {
        
                // Instantiate the media recorder	
                const mediaRecorder = new MediaRecorder(stream);
                
                // Create a buffer to hold the microphone input
                let buffer = [];
                mediaRecorder.ondataavailable = (theEvent) => {
                    buffer.push(theEvent.data);
                }
        
                // When the recorder is stopped, create a playable sound clip containing the buffer's contents. Then empty out the buffer
                // for new recordings.
                mediaRecorder.onstop = (event) => {
                    const audio = new Audio();
                    // audio.setAttribute("controls", "");
                    // this.soundClip.append(audio);
                    // this.soundClip.append("<br />");
        
                    // Blob object to contain buffer's contents
                    const blob = new Blob(buffer, {"type": "audio/ogg; codecs=opus"});
                    // Audio object plays blob's contents
                    audio.src = window.URL.createObjectURL(blob);
                    // Empty out buffer
                    buffer = [];
                };

                if (this.recording) {
                    mediaRecorder.stop();
                    this.recording = false;
                    // this.changeText("Record");
                    //this.recordButton.html("Record");
                }
                else {
                    mediaRecorder.start();
                    this.recording = true;
                    // this.changeText("Stop");
                    //this.recordButton.html("Stop");
                }
            // Raise alert that the microphone cannot be accessed. 
            }).catch((err) => {
                console.log(err);
                alert("An error occurred with your microphone.");
            });
        }
        // Raise alert that none of the user's media devices can be accessed. Browser likely needs to be updated.
        else {
            alert("Your browser cannot access your of your media devices. Please update your browser.");
        }
    }
}

export default Microphone; 