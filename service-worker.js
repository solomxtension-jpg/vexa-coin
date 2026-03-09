const SUPABASE_URL="YOUR_SUPABASE_URL"
const SUPABASE_KEY="YOUR_ANON_KEY"

const db=supabase.createClient(SUPABASE_URL,SUPABASE_KEY)

let balance=0

function toggleMenu(){
menu.classList.toggle("active")
}

function showPage(id){
document.querySelectorAll(".container > div").forEach(x=>x.style.display="none")
document.getElementById(id).style.display="block"
menu.classList.remove("active")
}

function toggleTheme(){
document.body.classList.toggle("light")
}

function animateBalance(){

setInterval(()=>{
balance+=0.0001
balanceElement=document.getElementById("balance")
balanceElement.innerText=balance.toFixed(4)
},2000)

}

animateBalance()

async function crypto(){

let r=await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,solana&vs_currencies=usd")

let d=await r.json()

btc.innerText=d.bitcoin.usd
eth.innerText=d.ethereum.usd
bnb.innerText=d.binancecoin.usd
sol.innerText=d.solana.usd

}

crypto()

if("serviceWorker" in navigator){
navigator.serviceWorker.register("service-worker.js")
}
