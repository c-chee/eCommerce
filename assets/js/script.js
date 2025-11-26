

const hiddenNav = document.getElementById('hidden-nav');
const hamburgerNav = document.getElementById('hamburger-btn');
const closeNavBtn = document.getElementById('nav-close-btn');
const navOverlay = document.getElementById('nav-overlay'); // Allows close when clicking outside of hidden nav

const scrollToAbout = document.getElementById('scroll-to-about'); 

const grid = document.getElementById('product-grid');


// === Hamburger Menu ===
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
// Only on home page, so a check is needed that that an error does not occur
if (scrollToAbout) { 
    scrollToAbout.addEventListener('click', () => {
        const aboutSection = document.getElementById('about-section');
        const offset = 130;
        const targetPosition = aboutSection.offsetTop - offset;

        window.scrollTo({
            top: targetPosition, // Creates an offset so the contnet doesn't hide behin the nav
            behavior: 'smooth' // smooth scrolling
        });
    });
}

// === Product Grid ===
if (grid) {
    fetch('../assets/data/products.json')
    .then(response => response.json())
    .then(products => { 
        const grid = document.getElementById('product-grid');

        products.forEach(product => {
            const item = document.createElement('div');
            item.classList.add('product');

            item.innerHTML = 
                `<img src = '${product.image}' alt = '${product.name}'>
                <h3>${product.name}</h3>
                <p class = 'product-price'>$${product.price.toFixed(2)}</p> 
                <p class = 'product-desc'>${product.description}</p>`;
            // The .toFixed(2) allows the price to display 0, mut disspay 2 decimal places


            grid.appendChild(item);
        });
    })
    .catch(err => console.error("Error loading products:", err));
}
