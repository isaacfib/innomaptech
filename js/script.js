// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.getElementById('nav-links');
const navLinksList = navLinks.querySelectorAll('li a, li button');

// Toggle hamburger menu with improved focus management
hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('active');
    navLinks.setAttribute('aria-hidden', isExpanded);
    if (!isExpanded && navLinksList.length > 0) {
        navLinksList[0].focus();
    }
});

// Close menu when a link or button is clicked
navLinksList.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('active');
        navLinks.setAttribute('aria-hidden', 'true');
    });
});

// Trap focus within the navigation menu
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

// Open modal with smooth animation and proper focus management
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

// Close modal with animation
function closeModal() {
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }, 300);
    document.activeElement.blur();
}

closeModalBtn.addEventListener('click', closeModal);

// Close on background click
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Close on Escape key
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

// Basic form validation function
function validateForm(formData) {
    return true;
}

// Tab Functionality
const tabs = document.querySelectorAll('.tab');
const tabPanels = document.querySelectorAll('.tab-panel');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Deactivate all tabs
        tabs.forEach(t => {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
        });
        // Activate clicked tab
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        // Hide all panels
        tabPanels.forEach(panel => {
            panel.classList.remove('active');
            panel.setAttribute('hidden', 'true');
        });
        // Show corresponding panel
        const panelId = tab.getAttribute('aria-controls');
        const panel = document.getElementById(panelId);
        if (panel) {
            panel.classList.add('active');
            panel.removeAttribute('hidden');
        }
    });
});

// Keyboard navigation for tabs
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

// Read More Functionality
const readMoreBtns = document.querySelectorAll('.read-more');
readMoreBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.service-card');
        const tabPanel = card.closest('.tab-panel');
        const allCardsInPanel = tabPanel.querySelectorAll('.service-card');
        const isExpanded = card.classList.contains('expanded');
        
        if (isExpanded) {
            card.classList.remove('expanded');
            btn.setAttribute('aria-expanded', 'false');
            btn.textContent = 'Read More →';
        } else {
            allCardsInPanel.forEach(c => {
                if (c !== card) {
                    c.classList.remove('expanded');
                    const otherBtn = c.querySelector('.read-more');
                    if (otherBtn) {
                        otherBtn.setAttribute('aria-expanded', 'false');
                        otherBtn.textContent = 'Read More →';
                    }
                }
            });
            card.classList.add('expanded');
            btn.setAttribute('aria-expanded', 'true');
            btn.textContent = 'Read Less ↑';
            
            setTimeout(() => {
                const cardRect = card.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                if (cardRect.bottom > viewportHeight) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }, 50);
        }
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('header')?.offsetHeight || 0;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            targetElement.setAttribute('tabindex', '-1');
            targetElement.focus();
            
            if (navLinks.classList.contains('active')) {
                hamburger.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('active');
                navLinks.setAttribute('aria-hidden', 'true');
            }
        }
    });
});

// Window resize handler
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        navLinks.setAttribute('aria-hidden', 'true');
    }
});

// Intersection observer for scroll animations
const observeElements = document.querySelectorAll('.animate-on-scroll');
if (observeElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    observeElements.forEach(element => {
        observer.observe(element);
    });
}
