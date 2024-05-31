const navGroup1 = document.getElementById("nav-group1"); 
let prevButton1 = null;
const buttonPressed1 = (e) => {
  if (e.target.id === "nav-group1") {
    e.target.classList.add('active1'); 
    if(prevButton1 !== null) {
      prevButton1.classList.remove('active1');  
    }
    prevButton1 = e.target;
  }
}
navGroup1.addEventListener("click", buttonPressed1);

const navGroup2 = document.getElementById("nav-group2"); 
let prevButton2 = null;
const buttonPressed2 = (e) => {
    if (e.target.id === "nav-group2") {
    e.target.classList.add('active2'); 
    if(prevButton2 !== null) {
      prevButton2.classList.remove('active2');  
    }
    prevButton2 = e.target;
  }
}
navGroup2.addEventListener("click", buttonPressed2);

const navGroup3 = document.getElementById("nav-group3"); 
let prevButton3 = null;
const buttonPressed3 = (e) => {
    if (e.target.id === "nav-group3") {
    e.target.classList.add('active3'); 
    if(prevButton3 !== null) {
      prevButton3.classList.remove('active3');  
    }
    prevButton3 = e.target;
  }
}
navGroup3.addEventListener("click", buttonPressed3);