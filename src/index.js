const getColorPair = require("random-color-pair");

const [foreground, background] = getColorPair();
//const farben = getColorPair()

document.querySelector('header').style.backgroundColor=background
document.querySelector('footer').style.backgroundColor=background
document.querySelector('body').style.backgroundColor=foreground
document.querySelector('div').style.backgroundColor=background
document.querySelector('div').style.boxShadow = "10px 10px 10px white"
const ul = document.querySelector('ul')
const li = document.querySelectorAll('ul li')
li.forEach(e => e.style.color=foreground)
const klammern = document.querySelectorAll("#klammerauf, #klammerzu") 
klammern.forEach(e => e.style.color=background)
const footerLi =document.querySelectorAll("footer ul *") 
footerLi.forEach(e => e.style.color=foreground)
//document.querySelector('div').style.opacity="0.5"
//document.querySelector('body').body.style.backgroundColor="farben[1]"
document.querySelector('h1').style.color=foreground
document.querySelector('p').style.color=foreground
document.querySelector('h1').style.textShadow ="1px 5px 10px white"
//document.querySelector('h1').style.color=farben[0]
