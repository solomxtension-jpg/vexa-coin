let progress=0

setInterval(()=>{

progress+=0.05

if(progress>100)progress=0

let offset=565-(565*progress/100)

mineCircle.style.strokeDashoffset=offset

},60000)


async function startMining(){

let reward=1

balance+=reward

document.getElementById("balance").innerText=balance.toFixed(4)

alert("Mining reward added")

}
