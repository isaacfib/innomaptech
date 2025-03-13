// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.getElementById('nav-links');
const navLinksList = navLinks.querySelectorAll('li a');

// Toggle hamburger menu with improved focus management
hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('active');
    navLinks.setAttribute('aria-hidden', isExpanded);
    if (!isExpanded && navLinksList.length > 0) {
        // Set focus to first navigation link when opening menu
        navLinksList[0].focus();
    }
});

// Close menu when a link is clicked
navLinksList.forEach(link => {
    link.addEventListener('click', () => {
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
const openModalBtns = document.querySelectorAll('#openModalBtn, #footerContactBtn, #headerContactBtn, #ctaContactBtn');
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
        // Add body class to prevent scrolling when modal is open
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
    // Return focus to the last clicked button
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
    
    // Form validation could be added here
    const formData = new FormData(contactForm);
    const formIsValid = validateForm(formData);
    
    if (formIsValid) {
        // Show success message with animation
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thank you for your interest! Our team will contact you shortly.';
        contactForm.appendChild(successMessage);
        
        // Reset and close after delay
        setTimeout(() => {
            closeModal();
            contactForm.reset();
            successMessage.remove();
        }, 2000);
    }
});

// Basic form validation function
function validateForm(formData) {
    // This could be expanded with more validation rules
    return true;
}

// Service Group Toggle with Accordion Behavior - IMPROVED
const serviceGroups = document.querySelectorAll('.service-group:not(.standalone)');
serviceGroups.forEach(group => {
    const header = group.querySelector('.group-header');
    
    const toggleExpand = () => {
        const isExpanded = group.classList.contains('expanded');
        
        // Close all service groups
        serviceGroups.forEach(g => {
            g.classList.remove('expanded');
            g.querySelector('.group-header').setAttribute('aria-expanded', 'false');
        });
        
        // If the clicked group wasn't expanded, expand it
        if (!isExpanded) {
            group.classList.add('expanded');
            header.setAttribute('aria-expanded', 'true');
            
            // Make sure all subservices within are collapsed initially
            const allCardsInGroup = group.querySelectorAll('.service-card');
            allCardsInGroup.forEach(card => {
                card.classList.remove('expanded');
                const btn = card.querySelector('.read-more');
                if (btn) btn.textContent = 'Read More →';
            });
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

// Read More Functionality - IMPROVED to support accordion behavior
const readMoreBtns = document.querySelectorAll('.read-more');
readMoreBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.service-card');
        const group = card.closest('.service-group');
        const allCardsInGroup = group.querySelectorAll('.service-card');
        const isExpanded = card.classList.contains('expanded');
        
        if (isExpanded) {
            // If already expanded, just collapse this card
            card.classList.remove('expanded');
            btn.setAttribute('aria-expanded', 'false');
            btn.textContent = 'Read More →';
        } else {
            // Collapse all subservices in this group
            allCardsInGroup.forEach(c => {
                c.classList.remove('expanded');
                const otherBtn = c.querySelector('.read-more');
                if (otherBtn) {
                    otherBtn.setAttribute('aria-expanded', 'false');
                    otherBtn.textContent = 'Read More →';
                }
            });
            
            // Expand only the clicked card
            card.classList.add('expanded');
            btn.setAttribute('aria-expanded', 'true');
            btn.textContent = 'Read Less ↑';
            
            // Scroll to make expanded content visible if needed
            setTimeout(() => {
                // Only scroll if the expanded content is not fully visible
                const cardRect = card.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                
                if (cardRect.bottom > viewportHeight) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }, 50);
        }
    });
});

// Smooth Scrolling for Navigation Links with improved offset handling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            // Get header height for offset
            const headerHeight = document.querySelector('header')?.offsetHeight || 0;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Set focus to the target for accessibility
            targetElement.setAttribute('tabindex', '-1');
            targetElement.focus();
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                hamburger.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('active');
                navLinks.setAttribute('aria-hidden', 'true');
            }
        }
    });
});

// Add window resize handler for responsive adjustments
window.addEventListener('resize', () => {
    // Reset any height calculations or positioning that depends on screen size
    if (window.innerWidth > 768) {
        // For desktop: ensure navigation is visible regardless of hamburger state
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        navLinks.setAttribute('aria-hidden', 'true');
    }
});

// Add intersection observer for scroll animations
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
