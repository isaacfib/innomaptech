// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Modal Functionality
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

// Form Submission
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

// Service Group Toggle with Accordion Behavior
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

// Read More Functionality
const readMoreLinks = document.querySelectorAll('.read-more');
readMoreLinks.forEach(link => {
    link.addEventListener('click', () => {
        const card = link.closest('.service-card');
        card.classList.toggle('expanded');
        link.textContent = card.classList.contains('expanded') ? 'Read Less ↑' : 'Read More →';
    });
});
