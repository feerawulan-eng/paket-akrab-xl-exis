let isAdmin = false;
let stok = JSON.parse(localStorage.getItem('stokYogaCell') || '{}');

function tampilkan(){
    document.querySelectorAll('.cell-status').forEach(td => {
        let paket = td.dataset.paket;
        let status = stok[paket] || 'Ada';
        if(isAdmin){
            td.innerHTML = `<select class="status" data-paket="${paket}"><option value="Ada" ${status==='Ada'?'selected':''}>Ada</option><option value="Kosong" ${status==='Kosong'?'selected':''}>Kosong</option></select>`;
            td.querySelector('select').addEventListener('change', function(){
                stok[this.dataset.paket] = this.value;
                localStorage.setItem('stokYogaCell', JSON.stringify(stok));
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

tampilkan();