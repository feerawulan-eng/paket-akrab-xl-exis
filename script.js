function scrollToContact() {
    document.getElementById("Contact").scrollIntoView({
        behavior: 'smooth' 
    });
}

document.getElementById("contactform").addEventListener("submit", function(event){
    event.preventDefault();
    document.getElementById("message").innerText =
    "Pesan berhasil dikirm. Terima Kasih";
    this.reset();
});