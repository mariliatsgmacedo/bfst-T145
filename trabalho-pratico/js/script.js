window.addEventListener('load', changeColor);

var colorRed   = document.querySelector("#colorRed");
var colorGreen = document.querySelector("#colorGreen");
var colorBlue  = document.querySelector("#colorBlue");
var boxColorChange = document.querySelector("#boxColorChange");
var textRed   = document.querySelector("#textRed");
var textGreen = document.querySelector("#textGreen");
var textBlue  = document.querySelector("#textBlue");

function changeColor() {
    var red   = colorRed.value;
    var green = colorGreen.value;
    var blue  = colorBlue.value;

    textRed.value = red;
    textGreen.value = green;
    textBlue.value = blue;

    boxColorChange.style.backgroundColor = `rgb(${red},${green},${blue})`;
}