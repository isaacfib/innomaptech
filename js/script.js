// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.getElementById('nav-links');
const navLinksList = navLinks.querySelectorAll('li a');

hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('active');
    navLinks.setAttribute('aria-hidden', isExpanded);
    if (!isExpanded && navLinksList.length > 0) {
        navLinksList[0].focus();
    }
});

navLinksList.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('active');
        navLinks.setAttribute('aria-hidden', 'true');
    });
});

if (navLinksList.length > 0) {
    navLinksList[navLinksList.length - 1].addEventListener('focusout', () => {
        if (hamburger.getAttribute('aria-expanded') === 'true') {
            hamburger.focus();
            hamburger.setAttribute('aria-expanded', 'false');
            navLinks.classList.remove('active');
            navLinks.setAttribute('aria-hidden', 'true');
        }
    });
}

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
            document.getElementById('name').focus();
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

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModalBtn.click();
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
    const toggleExpand = () => {
        const isExpanded = group.classList.contains('expanded');
        serviceGroups.forEach(g => {
            g.classList.remove('expanded');
            g.querySelector('.group-header').setAttribute('aria-expanded', 'false');
        });
        if (!isExpanded) {
            group.classList.add('expanded');
            header.setAttribute('aria-expanded', 'true');
        }
    };
    header.addEventListener('click', toggleExpand);
    header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleExpand();
        }
    });
});

// Read More Functionality
const readMoreBtns = document.querySelectorAll('.read-more');
readMoreBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.service-card');
        const isExpanded = card.classList.contains('expanded');
        card.classList.toggle('expanded');
        btn.setAttribute('aria-expanded', !isExpanded);
        btn.textContent = !isExpanded ? 'Read Less ↑' : 'Read More →';
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
