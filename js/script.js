// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.getElementById('nav-links');
const navLinksList = navLinks.querySelectorAll('li a, li button');

hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('active');
    navLinks.setAttribute('aria-hidden', isExpanded);
    if (!isExpanded && navLinksList.length > 0) {
        navLinksList[0].focus();
    }
});

navLinksList.forEach(item => {
    item.addEventListener('click', () => {
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
const openModalBtns = document.querySelectorAll('#footerContactBtn, #headerContactBtn, #ctaContactBtn');
const closeModalBtn = document.getElementById('closeModalBtn');

openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('active');
            document.getElementById('name').focus();
        }, 10);
        document.body.classList.add('modal-open');
    });
});

function closeModal() {
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }, 300);
    document.activeElement.blur();
}

closeModalBtn.addEventListener('click', closeModal);

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Form Submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const formIsValid = validateForm(formData);
    if (formIsValid) {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thank you for your interest! Our team will contact you shortly.';
        contactForm.appendChild(successMessage);
        setTimeout(() => {
            closeModal();
            contactForm.reset();
            successMessage.remove();
        }, 2000);
    }
});

function validateForm(formData) {
    return true; // Placeholder; implement actual validation if needed
}

// Tab Functionality
const tabs = document.querySelectorAll('.tab');
const tabPanels = document.querySelectorAll('.tab-panel');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Update tab states
        tabs.forEach(t => {
            t.setAttribute('aria-selected', 'false');
        });
        tab.setAttribute('aria-selected', 'true');
        
        // Update panel states
        tabPanels.forEach(panel => {
            panel.classList.remove('active');
        });
        const panelId = tab.getAttribute('aria-controls');
        const panel = document.getElementById(panelId);
        if (panel) {
            panel.classList.add('active');
            // Animate service cards
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
    });
});

tabs.forEach((tab, index) => {
    tab.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            const nextTab = tabs[index + 1] || tabs[0];
            nextTab.focus();
            nextTab.click();
        } else if (e.key === 'ArrowLeft') {
            const prevTab = tabs[index - 1] || tabs[tabs.length - 1];
            prevTab.focus();
            prevTab.click();
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
        }
    });
});

// "Read More" Buttons
const readMoreButtons = document.querySelectorAll('.read-more');

readMoreButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Find the current tab panel
        const currentPanel = button.closest('.tab-panel');
        // Get all "Read More" buttons in this panel
        const allReadMoreInPanel = currentPanel.querySelectorAll('.read-more');

        // Collapse all other "Read More" sections in the same panel
        allReadMoreInPanel.forEach(otherButton => {
            if (otherButton !== button) {
                const otherDetailId = otherButton.getAttribute('aria-controls');
                const otherDetailElement = document.getElementById(otherDetailId);
                otherButton.setAttribute('aria-expanded', 'false');
                otherButton.textContent = 'Read More →';
                otherDetailElement.classList.remove('expanded');
            }
        });

        // Toggle the clicked "Read More" section
        const expanded = button.getAttribute('aria-expanded') === 'true';
        const detailId = button.getAttribute('aria-controls');
        const detailElement = document.getElementById(detailId);

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
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        navLinks.setAttribute('aria-hidden', 'true');
    }
});

// Initialize First Tab
document.addEventListener('DOMContentLoaded', () => {
    const firstTab = tabs[0];
    if (firstTab) {
        firstTab.click();
    }
});

// Scroll event to close the menu
window.addEventListener('scroll', () => {
    if (navLinks.classList.contains('active')) {
        hamburger.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('active');
        navLinks.setAttribute('aria-hidden', 'true');
    }
});

// Click event to close the menu when clicking outside
document.addEventListener('click', (event) => {
    if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
        if (navLinks.classList.contains('active')) {
            hamburger.setAttribute('aria-expanded', 'false');
            navLinks.classList.remove('active');
            navLinks.setAttribute('aria-hidden', 'true');
        }
    }
});

