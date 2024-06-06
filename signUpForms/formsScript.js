function openForm() {
  if (document.getElementById("myForm").style.display == "block") {
    document.getElementById("myForm").style.display = "none";
  } else {
    document.getElementById("myForm").style.display = "block";
  }
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function openForm2() {
  if (document.getElementById("myForm2").style.display == "block") {
    document.getElementById("myForm2").style.display = "none";
  } else {
    document.getElementById("myForm2").style.display = "block";
  }
}

function closeForm2() {
  document.getElementById("myForm2").style.display = "none";
}

function openForm3() {
  if (document.getElementById("myForm3").style.display == "block") {
    document.getElementById("myForm3").style.display = "none";
  } else {
    document.getElementById("myForm3").style.display = "block";
    document.getElementById("myForm4").style.display = "none";
  }
}

function closeForm3() {
  document.getElementById("myForm3").style.display = "none";
}

function openForm4() {
  if (document.getElementById("myForm4").style.display == "block") {
    document.getElementById("myForm4").style.display = "none";
  } else {
    document.getElementById("myForm4").style.display = "block";
    document.getElementById("myForm3").style.display = "none";
  }
}

function closeForm4() {
  document.getElementById("myForm4").style.display = "none";
}