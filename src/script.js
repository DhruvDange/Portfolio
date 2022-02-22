window.onbeforeunload = function () {
    window.scrollTo(0,0);
};
history.pushState("", document.title, window.location.pathname + window.location.search);

import "./style.css";
import Experience from "./Experience/Experience.js";
const canvas = document.querySelector('.webgl')

const experience = new Experience(canvas)

// const button = document.querySelector(".play")
// const audio = document.querySelector(".player")
// button.addEventListener('click', () => {
//     audio.src = 'audio/music/retro_funky.mp3'

//     const context = new AudioContext()
//     const src = context.createMediaElementSource(audio)

//     const analyser = context.createAnalyser()
//     src.connect(analyser)

//     analyser.connect(context.destination)

//     analyser.fftSize = 16384

//     const bufferLength = analyser.frequencyBinCount

//     const dataArray = new Uint8Array(bufferLength)
    
//     const bars = 118
//     let sum = 0 


//     function render() {
//         requestAnimationFrame(render)
//         analyser.getByteFrequencyData(dataArray)
//         sum = 0
//         for(let i = 0; i < bars; i++){
//             sum += dataArray[i]
//         }
//         let avg = sum / 118
//         avg = Math.floor(avg)
//         console.log(avg);

//     }
//     render()
// })