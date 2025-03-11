// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.getElementById('nav-links'); // Use getElementById to target by ID
const navLinksList = navLinks.querySelectorAll('li a'); // Get all links inside nav-links

hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
    hamburger.setAttribute('aria-expanded', !expanded); // Toggle aria-expanded
    navLinks.classList.toggle('active');

    if (!expanded) { // If menu is now opening
        navLinks.setAttribute('aria-hidden', 'false'); // Make nav links accessible to screen readers
        if (navLinksList.length > 0) {
            navLinksList[0].focus(); // Focus the first link in the menu
        }
    } else { // If menu is now closing
        navLinks.setAttribute('aria-hidden', 'true'); // Hide nav links from screen readers when closed
    }
});

// Add event listener for focusout on the last nav link to handle keyboard navigation and menu closing
if (navLinksList.length > 0) {
    navLinksList[navLinksList.length - 1].addEventListener('focusout', () => {
        if (hamburger.getAttribute('aria-expanded') === 'true') {
            hamburger.focus(); // Return focus to the hamburger button when focus leaves the menu
            hamburger.setAttribute('aria-expanded', 'false'); // Close the menu
            navLinks.classList.remove('active');
            navLinks.setAttribute('aria-hidden', 'true');
        }
    });
}


// Modal Functionality (No changes needed in this section for hamburger menu fix)
const modal = document.getElementById('contactModal');
const openModalBtns = document.querySelectorAll('#openModalBtn, #footerContactBtn, #headerContactBtn, #ctaContactBtn');
const closeModalBtn = document.getElementById('closeModalBtn');

openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    });
});

closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
});

// Form Submission (No changes needed in this section for hamburger menu fix)
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your interest! Our team will contact you shortly.');
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
    contactForm.reset();
});

// Service Group Toggle with Accordion Behavior (No changes needed in this section for hamburger menu fix)
const serviceGroups = document.querySelectorAll('.service-group:not(.standalone)');
serviceGroups.forEach(group => {
    const header = group.querySelector('.group-header');
    header.addEventListener('click', () => {
        const isExpanded = group.classList.contains('expanded');

        // Close all service groups
        serviceGroups.forEach(g => g.classList.remove('expanded'));

        // If the clicked group wasn’t expanded, expand it
        if (!isExpanded) {
            group.classList.add('expanded');
        }
    });
});

// Read More Functionality (No changes needed in this section for hamburger menu fix)
const readMoreLinks = document.querySelectorAll('.read-more');
readMoreLinks.forEach(link => {
    link.addEventListener('click', () => {
        const card = link.closest('.service-card');
        card.classList.toggle('expanded');
        link.textContent = card.classList.contains('expanded') ? 'Read Less ↑' : 'Read More →';
    });
});
