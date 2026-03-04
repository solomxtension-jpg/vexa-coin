<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>VEXA Mining</title>
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<style>
body {
  font-family: Arial, sans-serif;
  text-align: center;
  background: #0b0f1a;
  color: #fff;
  margin-top: 40px;
}
button {
  padding: 10px 20px;
  margin: 5px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}
#auth-message {
  color: #22d3ee;
  font-weight: bold;
}
</style>
</head>
<body>

<h1>VEXA Mining ⛏</h1>

<!-- AUTH -->
<div id="auth-section">
  <input type="email" id="email" placeholder="Email"><br><br>
  <input type="password" id="password" placeholder="Password"><br><br>
  <button onclick="register()">Register</button>
  <button onclick="login()">Login</button>
  <p id="auth-message"></p>
</div>

<!-- APP -->
<div id="app-section" style="display:none;">
  <h2>Coins: <span id="coins">0</span></h2>
  <h3>Tap Power: <span id="power">1</span></h3>
  <h3>Auto Power: <span id="autoPower">0</span></h3>

  <button onclick="mine()">Tap & Mine</button><br><br>
  <button onclick="upgradePower()">Upgrade Tap (50 coins)</button><br><br>
  <button onclick="upgradeAuto()">Upgrade Auto (100 coins)</button><br><br>
  <button onclick="logout()">Logout</button>
</div>

<script>
// ================= SUPABASE CONNECTION =================
const supabaseClient = supabase.createClient(
  "https://kdmknilstonmiesjocvy.supabase.co",
  "sb_publishable_wrnwdrTIgGn7_q_RgYx0fw_5kbqUUJ1"
);

let currentUser = null;
let coins = 0;
let power = 1;
let autoPower = 0;
let autoInterval = null;

// ================= AUTH =================
async function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const { data, error } = await supabaseClient.auth.signUp({ email, password });
  if (error) { message(error.message); return; }
  message("Registered! Now login.");
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
  if (error) { message(error.message); return; }
  currentUser = data.user;
  await loadUserData();
  startApp();
}

async function logout() {
  await supabaseClient.auth.signOut();
  location.reload();
}

// ================= GAME =================
function mine() {
  coins += power;
  updateUI();
  saveUserData();
}

function upgradePower() {
  if (coins >= 50) { coins -= 50; power += 1; updateUI(); saveUserData(); }
}

function upgradeAuto() {
  if (coins >= 100) { coins -= 100; autoPower += 1; updateUI(); saveUserData(); startAutoMining(); }
}

function startAutoMining() {
  if (autoInterval) clearInterval(autoInterval);
  if (autoPower > 0) {
    autoInterval = setInterval(() => { coins += autoPower; updateUI(); saveUserData(); }, 1000);
  }
}

// ================= DATABASE =================
async function loadUserData() {
  const { data, error } = await supabaseClient
    .from("users")
    .select("*")
    .eq("id", currentUser.id)
    .single();
  
  if (!data) {
    await supabaseClient.from("users").insert({
      id: currentUser.id,
      coins: 0,
      power: 1,
      auto_power: 0
    });
    coins = 0; power = 1; autoPower = 0;
  } else {
    coins = data.coins; power = data.power; autoPower = data.auto_power;
  }
  updateUI();
  startAutoMining();
}

async function saveUserData() {
  await supabaseClient
    .from("users")
    .update({ coins: coins, power: power, auto_power: autoPower })
    .eq("id", currentUser.id);
}

// ================= UI =================
function startApp() {
  document.getElementById("auth-section").style.display = "none";
  document.getElementById("app-section").style.display = "block";
}

function updateUI() {
  document.getElementById("coins").innerText = coins;
  document.getElementById("power").innerText = power;
  document.getElementById("autoPower").innerText = autoPower;
}

function message(text) {
  document.getElementById("auth-message").innerText = text;
}
</script>

</body>
</html>
