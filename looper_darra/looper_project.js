// let obj = {
//     name: 'Krunal',
//     education: 'IT Engineer'
// } ;

////////////////////////////////////////////////

const audioCtx = new AudioContext();


const audio1 = new Audio("snare-acoustic01.wav");
const audio2 = new Audio("snare-dist02.wav");
const audio3 = new Audio("snare-smasher.wav");
const audio4 = new Audio("kick-acoustic02.wav");
const audio5 = new Audio("tom-acoustic01.wav");
const audio6 = new Audio("crash-acoustic.wav");


let sounds = new Map([["a",audio1],["s",audio2],["d",audio3],[3,audio4],[4,[]],[5,[]],[6,[]]]);


let history = [];
let start = false;
let timeStart = 0;
let prevTime = 0;
let currentTrack = 0;
let currentKey = "";
let tracks = new Map([[0,[]],[1,[]],[2,[]],[3,[]],[4,[]],[5,[]],[6,[]]]);

function sleep(milliseconds) {
  let start = new Date().getTime();
  for (let i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


function playTrack(ms){
  sleep(ms);
  if(!sounds.get(currentKey).paused) {
      sounds.get(currentKey).pause();
  }
  sounds.get(currentKey).currentTime = 0;
  sounds.get(currentKey).play();
}

function playNote(){
  //sounds.get(key).play();
  sounds.get(currentKey).play();
  console.log("playing note");
    // console.log("current");
  //  console.log(currentKey);


}

document.addEventListener("keydown", function(theEvent){
  if (start){
    console.log(theEvent.key);
  //  sounds.get(theEvent.key).play();

    if(!sounds.get(theEvent.key).paused) {
        sounds.get(theEvent.key).pause();
    }

    sounds.get(theEvent.key).currentTime = 0;
    sounds.get(theEvent.key).play();


    console.log("played");
    let date = new Date();
    let timestamp = date.getTime();
    let timeDiff = timestamp - prevTime;
    prevTime = timestamp;//date.getTime()-timeStart;
    let obj = {
      key: theEvent.key,
      time: timeDiff
    };
    history.push(obj);
    //console.log(obj.time);
  }
});

//notesMap.set(note,[1,oscillator, modulator, oscillatorGain]);

$("#start-recording").on("click", () => {
  start = true;
  let date = new Date();
  prevTime = date.getTime();
//  console.log(timeStart);
});

$("#stop-recording").on("click", () => {
  start = false;
  tracks.set(currentTrack,history);
});

$("#create-track").on("click", () => {
  history = [];
  currentTrack++;
});

function logMapElements(value, key, map) {
  console.log(`m[${key}] = ${value}`);
}

$("#show").on("click", () => {
  for (let i = 0;i < history.length; i++){
    console.log(history[i].key);
    console.log(history[i].time);
  }
  tracks.forEach(logMapElements);
});

$("#play").on("click", () => {
  for (let i = 0; i < history.length; i++){
    currentKey = history[i].key;
    playTrack(history[i].time);
    console.log(history[i].key);
    console.log(history[i].time);
    console.log("Done");
  }
});
