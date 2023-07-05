// const buttonGroup = document.getElementById("buttons1"); 
// let prevButton = null;
// const buttonPressed = (e) => {
//   if(e.target.nodeName === 'BUTTON') {
//     e.target.classList.add('active'); 
//     if(prevButton !== null) {
//       prevButton.classList.remove('active');  
//     }
//     prevButton = e.target;
//   }
// }
// buttonGroup.addEventListener("click", buttonPressed);

const navGroup = document.getElementById("nav-group"); 
let prevButton = null;
const buttonPressed = (e) => {
  if(e.target.nodeName === 'BUTTON') {
    e.target.classList.add('active'); 
    if(prevButton !== null) {
      prevButton.classList.remove('active');  
    }
    prevButton = e.target;
  }
}
navGroup.addEventListener("click", buttonPressed);