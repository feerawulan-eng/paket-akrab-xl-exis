const BIN_ID = "6afff3b0ac6210605a96b6f3";
const API_KEY = "$2a$10$j6p/0Hzz9A7aRuYZTNadVuwqACXY8DhHdh1jowtra.nQRGipbEdta";
const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
let stok = {};
let isAdmin = false;
async function loadStok() {
  try {
    const res = await fetch(`${BIN_URL}/latest`, { headers: { "X-Master-Key": API_KEY } });
    const data = await res.json();
    stok = data.record;
    updateTampilan();
  } catch(e) { console.log("gagal load", e); }
}
async function saveStok() {
  await fetch(BIN_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "X-Master-Key": API_KEY },
    body: JSON.stringify(stok)
  });
}
function updateTampilan() {
  document.querySelectorAll(".cell-status").forEach(cell => {
    const nama = cell.getAttribute("data-paket");
    if (!nama || !stok[nama]) return;
    cell.textContent = stok[nama] === "Ada" ? "✅ Ada" : "❌ Kosong";
    cell.style.fontWeight = "bold";
    cell.style.textAlign = "center";
    cell.style.color = stok[nama] === "Ada" ? "green" : "red";
    cell.style.cursor = isAdmin ? "pointer" : "default";
    cell.onclick = async () => {
      if (!isAdmin) return;
      stok[nama] = stok[nama] === "Ada" ? "Kosong" : "Ada";
      updateTampilan();
      await saveStok();
      alert(nama + " jadi " + stok[nama]);
    };
  });
}
function toggleAdmin() {
  if (!isAdmin) {
    const pw = prompt("Password admin:");
    if (pw !== "Bisa123") { alert("Password salah!"); return; }
    isAdmin = true;
    document.getElementById("btnAdmin").textContent = "✅ Mode Admin AKTIF - Klik Status untuk ubah";
  } else {
    isAdmin = false;
    document.getElementById("btnAdmin").textContent = "🔒 Mode Admin";
  }
  updateTampilan();
}
loadStok();