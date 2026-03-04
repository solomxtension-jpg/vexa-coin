<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>VEXA Mining PRO</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Supabase SDK v2 -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<style>
body {
  background: linear-gradient(135deg, #0b0f1a, #1c1f2a);
  color: #fff;
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  padding: 20px;
}
.card {
  background: #111827;
  padding: 30px;
  border-radius: 20px;
  max-width: 450px;
  width: 100%;
  box-shadow: 0 0 30px rgba(0,229,255,0.25);
  position: relative;
  overflow: hidden;
}
input, button {
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border-radius: 10px;
  border: none;
  font-size: 16px;
}
button {
  background: #22d3ee;
  color: black;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}
button:hover { background: #00c3e0; }
button.secondary { background: #1c2747; color: white; }
.hidden { display: none; }
#progressContainer {
  width: 100%;
  height: 20px;
  background: #1c2747;
  border-radius: 12px;
  margin-top: 15px;
  overflow: hidden;
}
#progressBar {
  height: 100%;
  width: 0%;
  background: #00e5ff;
  transition: width 0.2s linear;
}
.floating-coin {
  position: absolute;
  font-size: 24px;
  animation: floatUp 1s forwards;
}
@keyframes floatUp {
  from {opacity: 1; transform: translateY(0);}
  to {opacity: 0; transform: translateY(-60px);}
}
h2 { text-align: center; margin-bottom: 20px; color: #00e5ff; }
.upgrade-btn { display: flex; justify-content: space-between; align-items: center; padding: 10px; margin: 5px 0; font-weight: bold; }
.upgrade-btn span { font-size: 14px; }
</style>
</head>
<body>

<div class="card">
  <!-- AUTH SECTION -->
  <div id="auth">
    <h2>VEXA Mining PRO</h2>
    <input id="emailInput" type="email" placeholder="Email">
    <input id="passwordInput" type="password" placeholder="Password">
    <button onclick="signUp()">Sign Up</button>
    <button onclick="login()">Login</button>
    <p id="authMsg"></p>
  </div>

  <!-- DASHBOARD -->
  <div id="app" class="hidden">
    <h2>Dashboard</h2>
    <p>Balance: <b><span id="balance">0</span></b> VEXA</p>
    <p>Level: <b><span id="level">1</span></b></p>
    <p>Mining Rate: <b><span id="rate">1</span></b>/tick</p>

    <button onclick="startMining()">⛏️ Start Mining</button>
    <button onclick="stopMining()" class="secondary">Stop Mining</button>

    <div id="progressContainer"><div id="progressBar"></div></div>

    <h3>Upgrades</h3>
    <button class="upgrade-btn" onclick="buyUpgrade('autoPower', 10)">
      Auto Power (+1) <span>Cost: 10 VEXA</span>
    </button>
    <button class="upgrade-btn" onclick="buyUpgrade('multiplier', 25)">
      Multiplier x2 <span>Cost: 25 VEXA</span>
    </button>
    <button class="upgrade-btn" onclick="buyUpgrade('speed', 50)">
      Faster Mining <span>Cost: 50 VEXA</span>
    </button>

    <button onclick="logout()" class="secondary">Logout</button>
    <p id="msg"></p>
  </div>
</div>

<audio id="coinSound" src="https://freesound.org/data/previews/341/341695_3248244-lq.mp3"></audio>

<script>
// ===================== SUPABASE CONFIG =====================
const SUPABASE_URL = "https://kdmknilstonmiesjocvy.supabase.co";
const SUPABASE_KEY = "sb_publishable_wrnwdrTIgGn7_q_RgYx0fw_5kbqUUJ1";
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ===================== STATE =====================
let currentUser = null;
let coins = 0;
let level = 1;
let rate = 1;
let autoPower = 1;
let multiplier = 1;
let miningSpeed = 5000;
let miningInterval = null;
let progressInterval = null;

// ===================== AUTH =====================
async function signUp() {
  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;
  const { data, error } = await supabase.auth.signUp({ email, password });
  document.getElementById("authMsg").innerText = error ? error.message : "Signup successful. Login now.";
}

async function login() {
  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) { document.getElementById("authMsg").innerText = error.message; return; }
  currentUser = data.user;
  document.getElementById("auth").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
  loadUser();
}

async function logout() {
  await supabase.auth.signOut();
  location.reload();
}

// ===================== LOAD USER =====================
async function loadUser() {
  if (!currentUser) return;
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", currentUser.id)
    .single();

  if (!data) {
    await supabase.from("users").insert({ id: currentUser.id, coins: 0, level: 1, auto_power: 1, multiplier: 1, speed: miningSpeed });
    coins = 0; level = 1; autoPower = 1; multiplier = 1;
    updateUI();
    return;
  }

  coins = data.coins || 0;
  level = data.level || 1;
  autoPower = data.auto_power || 1;
  multiplier = data.multiplier || 1;
  miningSpeed = data.speed || 5000;
  updateUI();
}

// ===================== MINING =====================
function startMining() {
  if (!currentUser) { alert("Login first"); return; }
  if (miningInterval) return;

  let progress = 0;
  progressInterval = setInterval(() => {
    progress += 2;
    if (progress > 100) progress = 0;
    document.getElementById("progressBar").style.width = progress + "%";
  }, 100);

  miningInterval = setInterval(async () => {
    try {
      const res = await fetch("https://kdmknilstonmiesjocvy.supabase.co/functions/v1/mine_coin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUser.id }),
      });
      const data = await res.json();
      coins = data.coins;
      updateUI();
      showFloatingCoin();
      playCoinSound();
    } catch (err) {
      console.error("Mining error:", err);
    }
  }, miningSpeed);
}

function stopMining() {
  clearInterval(miningInterval);
  clearInterval(progressInterval);
  miningInterval = null;
  progressInterval = null;
  document.getElementById("progressBar").style.width = "0%";
}

// ===================== UPGRADES =====================
async function buyUpgrade(type, cost) {
  if (coins < cost) { alert("Not enough VEXA"); return; }
  coins -= cost;
  if (type === "autoPower") autoPower += 1;
  if (type === "multiplier") multiplier *= 2;
  if (type === "speed") miningSpeed = Math.max(1000, miningSpeed - 500);

  await supabase.from("users").update({ coins, auto_power: autoPower, multiplier, speed: miningSpeed }).eq("id", currentUser.id);

  stopMining();
  startMining();
  updateUI();
}

// ===================== UI UPDATES =====================
function updateUI() {
  document.getElementById("balance").innerText = coins;
  document.getElementById("level").innerText = level;
  document.getElementById("rate").innerText = autoPower * multiplier;
}

function showFloatingCoin() {
  const coin = document.createElement("div");
  coin.className = "floating-coin";
  coin.innerText = "🪙";
  document.querySelector(".card").appendChild(coin);
  coin.style.left = Math.random() * 80 + "%";
  setTimeout(() => coin.remove(), 1000);
}

function playCoinSound() {
  document.getElementById("coinSound").play();
}

// ===================== AUTO LOGIN =====================
(async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    currentUser = session.user;
    document.getElementById("auth").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
    loadUser();
  }
})();
</script>

</body>
</html>
