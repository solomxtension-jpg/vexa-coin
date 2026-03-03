<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>VEXA Ultimate Mining</title>
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<style>
body {
  font-family: Arial, sans-serif;
  background: #0b0f1a;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}
.card {
  background: #111827;
  padding: 30px;
  border-radius: 15px;
  width: 380px;
  text-align: center;
  box-shadow: 0 0 40px rgba(0,229,255,0.35);
  position: relative;
}
h1 { color: #00e5ff; margin-bottom: 20px; }
h2,h3,h4 { margin: 6px 0; }
button {
  width: 100%;
  padding: 12px;
  margin: 6px 0;
  border-radius: 10px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}
button:hover { transform: translateY(-2px); }
.upgrade { background: #22d3ee; color: black; }
.logout { background: #1c2747; color: white; }
.install { background: #0fdcaa; color: black; }
input {
  width: 100%;
  padding: 10px;
  margin: 6px 0;
  border-radius: 8px;
  border: none;
}
.floating-coin {
  position: absolute;
  font-size: 22px;
  animation: floatUp 1s forwards;
  pointer-events: none;
}
@keyframes floatUp {
  0% { opacity: 1; transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-25px) rotate(180deg); }
  100% { opacity: 0; transform: translateY(-50px) rotate(360deg); }
}
#auth-message { color: #22d3ee; font-weight: bold; margin-top: 5px; }
#progressContainer {
  width: 100%;
  height: 16px;
  background: #1c2747;
  border-radius: 10px;
  margin-top: 10px;
  overflow: hidden;
}
#progressBar {
  height: 100%;
  width: 0%;
  background: #00e5ff;
  transition: width 0.2s linear;
}
</style>
</head>
<body>

<div class="card">

  <!-- AUTH -->
  <div id="auth-section">
    <h1>VEXA Ultimate Mining</h1>
    <input type="email" id="email" placeholder="Email"><br>
    <input type="password" id="password" placeholder="Password"><br>
    <button onclick="register()">Register</button>
    <button onclick="login()">Login</button>
    <p id="auth-message"></p>
  </div>

  <!-- APP -->
  <div id="app-section" style="display:none;">
    <h1>VEXA Mining</h1>
    <h2>Coins: <span id="coins">0</span></h2>
    <h3>Level: <span id="level">1</span></h3>
    <h4>Auto Power: <span id="autoPower">0</span></h4>
    <h4>Multiplier: <span id="multiplier">1</span></h4>
    <h4>Mining Interval: <span id="interval">1s</span></h4>

    <div id="progressContainer"><div id="progressBar"></div></div>

    <button class="upgrade" onclick="upgradeAuto()">Upgrade Auto Mining (100 coins)</button>
    <button class="upgrade" onclick="upgradeMultiplier()">Upgrade Multiplier (200 coins)</button>
    <button class="upgrade" onclick="upgradeSpeed()">Upgrade Speed (500 coins)</button>
    <button class="install" id="installBtn" style="display:none;">Install App</button>
    <button class="logout" onclick="logout()">Logout</button>
  </div>

</div>

<audio id="coinSound" src="https://cdn.pixabay.com/download/audio/2021/09/16/audio_4dc0b44422.mp3?filename=coin-02.mp3"></audio>

<script>
// ============== SUPABASE =================
const supabaseClient = supabase.createClient(
  "https://kdmknilstonmiesjocvy.supabase.co",
  "sb_publishable_wrnwdrTIgGn7_q_RgYx0fw_5kbqUUJ1"
);

let currentUser = null;
let coins = 0, autoPower = 0, multiplier = 1, level = 1, miningSpeed = 1000;
let autoInterval = null, progress = 0, progressInterval = null;
let deferredPrompt = null;

// ============== PWA INSTALL =================
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById('installBtn').style.display = 'block';
});

document.getElementById('installBtn').addEventListener('click', async () => {
  if(deferredPrompt){
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    deferredPrompt = null;
    document.getElementById('installBtn').style.display = 'none';
  }
});

// ============== AUTH =================
async function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const { error } = await supabaseClient.auth.signUp({ email, password });
  if (error) return message(error.message);
  message("Registered! Now login.");
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
  if (error) return message(error.message);
  currentUser = data.user;
  await loadUserData();
  startApp();
}

// ============== LOGOUT =================
async function logout() {
  await supabaseClient.auth.signOut();
  location.reload();
}

// ============== AUTO MINING =================
function startAutoMining() {
  if (autoInterval) clearInterval(autoInterval);
  if (autoPower <= 0) return;
  autoInterval = setInterval(() => {
    const coinsGained = autoPower * multiplier;
    coins += coinsGained;
    level = Math.floor((autoPower + multiplier)/5) + 1;
    updateUI();
    showFloatingCoin();
    playCoinSound();
    saveUserData();
    updateProgress();
  }, miningSpeed);
}

// ============== UPGRADES =================
function upgradeAuto() { if(coins>=100){coins-=100; autoPower+=1; startAutoMining(); updateUI(); saveUserData();} }
function upgradeMultiplier() { if(coins>=200){coins-=200; multiplier+=1; updateUI(); saveUserData();} }
function upgradeSpeed() { if(coins>=500){coins-=500; miningSpeed=Math.max(100,miningSpeed-100); startAutoMining(); updateUI(); saveUserData();} }

// ============== DATABASE =================
async function loadUserData() {
  const { data } = await supabaseClient.from("users").select("*").eq("id", currentUser.id).single();
  if(!data){
    await supabaseClient.from("users").insert({id:currentUser.id, coins:0, auto_power:0, multiplier:1, level:1, mining_speed:1000});
    coins=0; autoPower=0; multiplier=1; level=1; miningSpeed=1000;
  } else {
    coins=data.coins; autoPower=data.auto_power; multiplier=data.multiplier||1; level=data.level||1; miningSpeed=data.mining_speed||1000;
  }
  startAutoMining(); updateUI();
}

// ============== SAVE DATA =================
async function saveUserData() {
  await supabaseClient.from("users").update({coins, auto_power:autoPower, multiplier, level, mining_speed:miningSpeed}).eq("id", currentUser.id);
}

// ============== UI =================
function startApp() { document.getElementById("auth-section").style.display="none"; document.getElementById("app-section").style.display="block";}
function updateUI(){
  document.getElementById("coins").innerText=coins;
  document.getElementById("autoPower").innerText=autoPower;
  document.getElementById("multiplier").innerText=multiplier;
  document.getElementById("level").innerText=level;
  document.getElementById("interval").innerText=(miningSpeed/1000).toFixed(1)+"s";
}
function message(text){document.getElementById("auth-message").innerText=text;}

// ============== FLOATING COIN =================
function showFloatingCoin() {
  const coin = document.createElement("div");
  coin.className = "floating-coin";
  coin.innerText="🪙";
  document.querySelector(".card").appendChild(coin);
  coin.style.left=Math.random()*80+"%";
  setTimeout(()=>coin.remove(),1000);
}

// ============== SOUND =================
function playCoinSound(){document.getElementById("coinSound").play();}

// ============== PROGRESS BAR =================
function updateProgress(){ progress += 100/miningSpeed*100; if(progress>100) progress=0; document.getElementById("progressBar").style.width=progress+"%";}
</script>
</body>
</html>
