// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Modal Functionality
const modal = document.getElementById('contactModal');
const openModalBtn = document.getElementById('openModalBtn');
const footerContactBtn = document.getElementById('footerContactBtn');
const headerContactBtn = document.getElementById('headerContactBtn');
const closeModalBtn = document.getElementById('closeModalBtn');

[openModalBtn, footerContactBtn, headerContactBtn].forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'flex';
    });
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Form Submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your interest! Our team will contact you shortly.');
    modal.style.display = 'none';
    contactForm.reset();
});

// Service Group Toggle
const serviceGroups = document.querySelectorAll('.service-group:not(.standalone)');
serviceGroups.forEach(group => {
    const header = group.querySelector('.group-header');
    header.addEventListener('click', () => {
        group.classList.toggle('expanded');
    });
});

// Read More Functionality
const readMoreLinks = document.querySelectorAll('.read-more');
readMoreLinks.forEach(link => {
    link.addEventListener('click', () => {
        const card = link.closest('.service-card');
        card.classList.toggle('expanded');
        link.textContent = card.classList.contains('expanded') ? 'Read Less ↑' : 'Read More →';
    });
});
