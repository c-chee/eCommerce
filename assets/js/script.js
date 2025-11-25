

// === Hamburger Menu ===
const hiddenNav = document.getElementById('hidden-nav');
const hamburgerNav = document.getElementById('hamburger-btn');
const closeNavBtn = document.getElementById('nav-close-btn');
const navOverlay = document.getElementById('nav-overlay'); // Allows close when clicking outside of hidden nav

// Open menu
function openHiddenNav() {
    hiddenNav.classList.remove('close');
    hiddenNav.classList.add('open');
    navOverlay.classList.add('show');
}

// Close menu
function closeHiddenNav() {
    hiddenNav.classList.remove('open');
    hiddenNav.classList.add('close');
    navOverlay.classList.remove('show');
}

// Button events
hamburgerNav.addEventListener('click', openHiddenNav);
closeNavBtn.addEventListener('click', closeHiddenNav);
navOverlay.addEventListener('click', closeHiddenNav);


// === Hero Scroll Down ===
const scrollToAbout = document.getElementById('scroll-to-about');

scrollToAbout.addEventListener('click', () => {
    const aboutSection = document.getElementById('about-section');
    const offset = 130; // Adjust this as needed
    const targetPosition = aboutSection.offsetTop - offset;

    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
});
