const menuBtn = document.querySelector('.menu-btn');
const menuOverlay = document.querySelector('.menu');
let menuOpen = false;

menuBtn.addEventListener('click', () => {
    if(!menuOpen) {
        menuBtn.classList.add('open');
        menuOverlay.classList.add('open');
        menuOpen = true;
    } else {
        menuBtn.classList.remove('open');
        menuOverlay.classList.remove('open');
        menuOpen = false;
    }
});