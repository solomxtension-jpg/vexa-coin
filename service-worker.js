<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>VEXA Mining PRO</title>
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
  width: 360px;
  text-align: center;
  box-shadow: 0 0 30px rgba(0,229,255,0.25);
  position: relative;
}
h1 { color: #00e5ff; margin-bottom: 20px; }
h2, h3 { margin: 8px 0; }
button {
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border-radius: 10px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}
button:hover { transform: translateY(-2px); }
.upgrade { background: #22d3ee; color: black; }
.start { background: #0fdcaa; color: black; }
.logout { background: #1c2747; color: white; }
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
</style>
</head>
<body>
<div class="card">

  <!-- AUTH -->
  <div id="auth-section">
    <h1>VEXA Mining PRO</h1>
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
    <h3>Tap Power: <span id="power">1</span></h3>
    <h3>Auto Power: <span id="autoPower">0</span></h3>

    <button class="start" onclick="startMining()">Start Mining ⛏️</button>
    <button class="upgrade" onclick="upgradePower()">Upgrade Tap (50 coins)</button>
    <button class="upgrade" onclick="upgradeAuto()">Upgrade Auto Mining (100 coins)</button>
    <button class="logout" onclick="logout()">Logout</button>
  </div>

</div>

<script>
// ============== SUPABASE =================
const supabaseClient = supabase.createClient(
  "https://kdmknilstonmiesjocvy.supabase.co",
  "sb_publishable_wrnwdrTIgGn7_q_RgYx0fw_5kbqUUJ1"
);

let currentUser = null;
let coins = 0, power = 1, autoPower = 0, level = 1;
let miningInterval = null;
let autoInterval = null;

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

async function logout() {
  await supabaseClient.auth.signOut();
  location.reload();
}

// ============== MINING =================
function startMining() {
  if (miningInterval) return;
  miningInterval = setInterval(() => {
    coins += power;
    updateUI();
    showFloatingCoin();
    saveUserData();
  }, 1000);
  startAutoMining();
}

function startAutoMining() {
  if (autoInterval) clearInterval(autoInterval);
  if (autoPower > 0) {
    autoInterval = setInterval(() => {
      coins += autoPower;
      updateUI();
      showFloatingCoin();
      saveUserData();
    }, 1000);
  }
}

// ============== UPGRADES =================
function upgradePower() {
  if (coins >= 50) {
    coins -= 50;
    power += 1;
    if (power % 5 === 0) level += 1; // level up every 5 tap power
    updateUI();
    saveUserData();
  }
}

function upgradeAuto() {
  if (coins >= 100) {
    coins -= 100;
    autoPower += 1;
    if (autoPower % 5 === 0) level += 1; // level up every 5 auto power
    updateUI();
    saveUserData();
    startAutoMining();
  }
}

// ============== DATABASE =================
async function loadUserData() {
  const { data } = await supabaseClient.from("users").select("*").eq("id", currentUser.id).single();
  if (!data) {
    await supabaseClient.from("users").insert({
      id: currentUser.id, coins: 0, power: 1, auto_power: 0, level: 1
    });
    coins = 0; power = 1; autoPower = 0; level = 1;
  } else {
    coins = data.coins; power = data.power; autoPower = data.auto_power; level = data.level;
  }
  updateUI();
}

// ============== SAVE DATA =================
async function saveUserData() {
  await supabaseClient.from("users").update({
    coins, power, auto_power: autoPower, level
  }).eq("id", currentUser.id);
}

// ============== UI =================
function startApp() {
  document.getElementById("auth-section").style.display = "none";
  document.getElementById("app-section").style.display = "block";
}

function updateUI() {
  document.getElementById("coins").innerText = coins;
  document.getElementById("power").innerText = power;
  document.getElementById("autoPower").innerText = autoPower;
  document.getElementById("level").innerText = level;
}

function message(text) { document.getElementById("auth-message").innerText = text; }

// ============== FLOATING COIN =================
function showFloatingCoin() {
  const coin = document.createElement("div");
  coin.className = "floating-coin";
  coin.innerText = "🪙";
  document.querySelector(".card").appendChild(coin);
  coin.style.left = Math.random() * 80 + "%";
  setTimeout(() => coin.remove(), 1000);
}
</script>
</body>
</html>
