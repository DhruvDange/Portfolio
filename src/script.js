window.onbeforeunload = function () {
    window.scrollTo(0,0);
};
if (window.location.hash !== '#debug')
history.pushState("", document.title, window.location.pathname + window.location.search);


import "./style.css";
import Experience from "./Experience/Experience.js";

const canvas = document.querySelector('.webgl')



const experience = new Experience(canvas)