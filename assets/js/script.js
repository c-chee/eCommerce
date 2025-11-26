
const hiddenNav = document.getElementById('hidden-nav');
const hamburgerNav = document.getElementById('hamburger-btn');
const closeNavBtn = document.getElementById('nav-close-btn');
const navOverlay = document.getElementById('nav-overlay'); // Allows close when clicking outside of hidden nav

const aboutSection = document.getElementById('about-section');
const scrollToAbout = document.getElementById('scroll-to-about'); 

const grid = document.getElementById('product-grid');

const contactSection = document.querySelector('.contact-section');
const contactForm = document.getElementById('contact-form');
const validationMessage = document.getElementById('validation-message');
validationMessage.style.color = 'red';
const thankyouMessage = document.getElementById('thankyou-section');


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

// === Contact Form ===
contactForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Ensures the form doesn’t submit if validation fails

    // -- Grab values --
    const formName = document.getElementById('name-input').value.trim(); // - Trim removes extra space
    const formEmail = document.getElementById('email-input').value.trim();
    const formMessage = document.getElementById('message-input').value.trim();

    // -- Validations --
    // Extra checks for if a required field is left empty or if only spaces are typed
    if (formName === '' || formEmail === '' || formMessage === '') {
        validationMessage.textContent = 'Form is left empty! Please fill out required field.';
        return;
    }

    // Checks for email formatting
    const emailFormat = /\S+@\S+\.\S+/;

    // If the email does not match the formatt, display error
    if(!emailFormat.test(formEmail)) {
        validationMessage.textContent = 'Please enter a valid email.'
        return;
    }

    // Clear any validatiion messages
    validationMessage.textContent = '';

    // Swap visibility between form and thankyou section
    contactSection.style.display = 'none';
    thankyouMessage.style.display = 'block'; 

    // Revert back to normal after 3 seconds
    setTimeout(() => {
        thankyouMessage.style.display = 'none';
        contactSection.style.display = 'block';
        contactForm.reset();
    }, 3000);

});
