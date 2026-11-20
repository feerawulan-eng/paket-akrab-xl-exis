let isAdmin = false;
let stok ={};
let BIN_URL = 'https://kvdb.io/YogaCellMoga2026/stok';
async function loadStok(){
  try{
    let r = await fetch(BIN_URL);
    if(r.ok){ stok = await r.json(); }
  }catch(e){}
  tampilkan();
}
async function simpanStok(){
  try{ await fetch(BIN_URL, {method:'POST', body: JSON.stringify(stok)}); }catch(e){}
}

function tampilkan(){
    document.querySelectorAll('.cell-status').forEach(td => {
        let paket = td.dataset.paket;
        let status = stok[paket] || 'Ada';
        if(isAdmin){
            td.innerHTML = `<select class="status" data-paket="${paket}"><option value="Ada" ${status==='Ada'?'selected':''}>Ada</option><option value="Kosong" ${status==='Kosong'?'selected':''}>Kosong</option></select>`;
            td.querySelector('select').addEventListener('change', function(){
                stok[this.dataset.paket] = this.value;
                simpanStok();
                tampilkan();
            });
        } else {
            td.innerHTML = status === 'Ada' ? `<span class="badge-ada">✅ Ada</span>` : `<span class="badge-kosong">❌ Kosong</span>`;
        }
    });
    document.getElementById('btnAdmin').innerText = isAdmin ? '🔓 Keluar Admin' : '🔒 Mode Admin';
}

document.getElementById('btnAdmin').addEventListener('click', function(){
    if(!isAdmin){
        let pw = prompt('Masukkan Password Admin:');
        if(pw === 'yoga123'){
            isAdmin = true;
            tampilkan();
        } else {
            alert('Password salah!');
        }
    } else {
        isAdmin = false;
        tampilkan();
    }
});

loadStok();