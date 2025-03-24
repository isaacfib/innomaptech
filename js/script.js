// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.getElementById('nav-links');
const navLinksList = navLinks ? navLinks.querySelectorAll('li a, li button') : [];

function toggleMenu() {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('active');
    navLinks.setAttribute('aria-hidden', isExpanded);
}

function closeMenu() {
    hamburger.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('active');
    navLinks.setAttribute('aria-hidden', 'true');
}

hamburger.addEventListener('click', () => {
    toggleMenu();
    if (navLinks.classList.contains('active') && navLinksList.length > 0) {
        navLinksList[0].focus();
    }
});

navLinksList.forEach(item => {
    item.addEventListener('click', () => {
        closeMenu();
    });
});

if (navLinksList.length > 0) {
    navLinksList[navLinksList.length - 1].addEventListener('focusout', () => {
        if (hamburger.getAttribute('aria-expanded') === 'true') {
            setTimeout(() => {
                hamburger.focus();
                closeMenu();
            }, 0);
        }
    });
}

// Contact Section Visibility
const ctaContactBtn = document.getElementById('ctaContactBtn');
const headerContactLink = document.getElementById('headerContactLink');
const contactSection = document.getElementById('contact');

function showContactSection(e) {
    e.preventDefault();
    contactSection.classList.add('active');
    // Smooth scroll to contact section
    const targetPosition = contactSection.getBoundingClientRect().top + window.pageYOffset - document.querySelector('header').offsetHeight - 20;
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

ctaContactBtn.addEventListener('click', showContactSection);
headerContactLink.addEventListener('click', showContactSection);

// Form Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const formIsValid = validateForm(formData);

    if (formIsValid) {
        try {
            // Simulate a form submission (replace with actual submission)
            // const response = await fetch('/api/submit', {
            //     method: 'POST',
            //     body: formData
            // });
            // if (!response.ok) {
            //     throw new Error(`HTTP error! status: ${response.status}`);
            // }
            // const result = await response.json();
            // console.log('Success:', result);

            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for your interest! Our team will contact you shortly.';
            contactForm.appendChild(successMessage);

            setTimeout(() => {
                contactSection.classList.remove('active');
                contactForm.reset();
                successMessage.remove();
            }, 2000);

        } catch (error) {
            console.error('Error submitting form:', error);
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'Sorry, there was an error submitting your form. Please try again later.';
            contactForm.appendChild(errorMessage);
            setTimeout(() => {
                errorMessage.remove();
            }, 3000);
        }
    }
});

function validateForm(formData) {
    const name = formData.get('name');
    const email = formData.get('email');

    if (!name || name.trim() === '') {
        alert('Please enter your name.');
        return false;
    }

    if (!email || email.trim() === '' || !isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Tab Functionality
const tabs = document.querySelectorAll('.tab');
const tabPanels = document.querySelectorAll('.tab-panel');

function activateTab(tab) {
    tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
    tab.setAttribute('aria-selected', 'true');

    tabPanels.forEach(panel => panel.classList.remove('active'));
    const panelId = tab.getAttribute('aria-controls');
    const panel = document.getElementById(panelId);

    if (panel) {
        panel.classList.add('active');
        animateServiceCards(panel);
    }
}

function animateServiceCards(panel) {
    const cards = panel.querySelectorAll('.service-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'none';

        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
}

tabs.forEach(tab => {
    tab.addEventListener('click', () => activateTab(tab));
});

tabs.forEach((tab, index) => {
    tab.addEventListener('keydown', (e) => {
        let nextTab;
        if (e.key === 'ArrowRight') {
            nextTab = tabs[index + 1] || tabs[0];
        } else if (e.key === 'ArrowLeft') {
            nextTab = tabs[index - 1] || tabs[tabs.length - 1];
        }
        if (nextTab) {
            nextTab.focus();
            activateTab(nextTab);
        }
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            history.pushState(null, null, `#${targetId}`);
        }
    });
});

// Home Navlink
document.querySelector('header .logo a').addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    history.pushState(null, null, `#`);
});

document.querySelector('header nav ul li a[href="#"]').addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    history.pushState(null, null, `#`);
});

// "Read More" Buttons
const readMoreButtons = document.querySelectorAll('.read-more');

readMoreButtons.forEach(button => {
    button.addEventListener('click', () => {
        const currentPanel = button.closest('.tab-panel');
        const allReadMoreInPanel = currentPanel.querySelectorAll('.read-more');
        const detailId = button.getAttribute('aria-controls');
        const detailElement = document.getElementById(detailId);

        if (!detailElement || !currentPanel) return;

        allReadMoreInPanel.forEach(otherButton => {
            const otherDetailId = otherButton.getAttribute('aria-controls');
            const otherDetailElement = document.getElementById(otherDetailId);

            if (!otherDetailElement) return;

            if (otherButton !== button) {
                otherButton.setAttribute('aria-expanded', 'false');
                otherButton.textContent = 'Read More →';
                otherDetailElement.classList.remove('expanded');
            }
        });

        const expanded = button.getAttribute('aria-expanded') === 'true';

        if (expanded) {
            button.setAttribute('aria-expanded', 'false');
            button.textContent = 'Read More →';
            detailElement.classList.remove('expanded');
        } else {
            button.setAttribute('aria-expanded', 'true');
            button.textContent = 'Read Less →';
            detailElement.classList.add('expanded');
        }
    });
});

// Window Resize Handler
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        closeMenu();
    }
});

// Initialize First Tab
document.addEventListener('DOMContentLoaded', () => {
    const firstTab = tabs[0];
    if (firstTab) {
        activateTab(firstTab);
    }
});

// Scroll event to close the menu
window.addEventListener('scroll', () => {
    if (navLinks.classList.contains('active')) {
        closeMenu();
    }
});

// Click event to close the menu when clicking outside
document.addEventListener('click', (event) => {
    if (!navLinks.contains(event.target) && !hamburger.contains(event.target) && navLinks.classList.contains('active')) {
        closeMenu();
    }
});
