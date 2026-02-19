<!DOCTYPE html>
<html>
<head>
  <title>VEXA Mining</title>
  <style>
    body{
      background:#0b0f1a;
      color:white;
      font-family:Arial;
      text-align:center;
      padding-top:60px;
    }
    .box{
      background:#121a2b;
      padding:25px;
      width:320px;
      margin:auto;
      border-radius:15px;
      box-shadow:0 0 20px #000;
    }
    button{
      padding:15px;
      border:none;
      border-radius:10px;
      background:#00ffa6;
      font-size:18px;
      cursor:pointer;
      width:100%;
    }
    #timer{
      margin-top:15px;
      font-size:14px;
      color:#00ffa6;
    }
  </style>
</head>

<body>

<div class="box">
<h2>VEXA COIN MINING</h2>
<h3 id="balance">Balance: 0 VEXA</h3>

<button onclick="mine()">Start Mining</button>

<p id="timer"></p>
<p id="msg"></p>
</div>

<script>

let balance = localStorage.getItem("balance") || 0;
document.getElementById("balance").innerText =
"Balance: " + balance + " VEXA";

let lastMine = localStorage.getItem("lastMine");

function updateTimer(){
  if(!lastMine) return;

  let now = new Date().getTime();
  let distance = 86400000 - (now - lastMine);

  if(distance <= 0){
    document.getElementById("timer").innerText = "You can mine now!";
    return;
  }

  let hours = Math.floor(distance / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("timer").innerText =
  "Next mining in: " + hours + "h " + minutes + "m " + seconds + "s";
}

setInterval(updateTimer, 1000);
updateTimer();

function mine(){

  let now = new Date().getTime();

  if(lastMine && now - lastMine < 86400000){
    document.getElementById("msg").innerText =
    "⏳ You already mined today.";
    return;
  }

  balance = parseInt(balance) + 10;
  localStorage.setItem("balance", balance);
  localStorage.setItem("lastMine", now);
  lastMine = now;

  document.getElementById("balance").innerText =
  "Balance: " + balance + " VEXA";

  document.getElementById("msg").innerText =
  "✅ Mining successful! +10 VEXA";
}

</script>

</body>
</html>
