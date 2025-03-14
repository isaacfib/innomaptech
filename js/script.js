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


// Enhanced Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"], button[data-target^="#"]').forEach(clickable => {
    clickable.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Get target ID from href attribute or data-target attribute
        const targetId = this.getAttribute('href') || this.getAttribute('data-target');
        if (!targetId || targetId === '#') return;
        
        const cleanTargetId = targetId.substring(1); // Remove the # character
        const targetElement = document.getElementById(cleanTargetId);
        
        if (targetElement) {
            // Calculate offset position
            const headerHeight = document.querySelector('header')?.offsetHeight || 0;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            
            // Add a small offset to position just before the heading
            const offset = 20; // Adjust this value as needed for spacing
            const scrollToPosition = targetPosition - headerHeight - offset;
            
            // Perform the smooth scroll with easing
            scrollWithEasing(scrollToPosition);
            
            // Update URL hash without jumping (optional)
            history.pushState(null, null, targetId);
            
            // Set focus to the target for accessibility
            targetElement.setAttribute('tabindex', '-1');
            targetElement.focus({ preventScroll: true });
            
            // Close mobile menu if open
            const navLinks = document.getElementById('nav-links');
            const hamburger = document.querySelector('.hamburger');
            if (navLinks?.classList.contains('active')) {
                hamburger.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('active');
                navLinks.setAttribute('aria-hidden', 'true');
            }
        }
    });
});

// Custom easing function for smoother scrolling
function scrollWithEasing(targetPosition) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    
    // Set duration based on distance, with a minimum and maximum
    const minDuration = 600; // Minimum duration in milliseconds
    const maxDuration = 1200; // Maximum duration in milliseconds
    const baseSpeed = 0.5; // Adjust for faster/slower scrolling
    
    // Calculate duration based on distance, but keep within min/max bounds
    const calculatedDuration = Math.min(
        maxDuration,
        Math.max(minDuration, Math.abs(distance) * baseSpeed)
    );
    
    let startTime = null;
    
    function animationStep(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / calculatedDuration, 1);
        
        // Easing function: easeInOutQuad for a gentle acceleration and deceleration
        const easing = progress < 0.5 
            ? 2 * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
        window.scrollTo(0, startPosition + distance * easing);
        
        if (timeElapsed < calculatedDuration) {
            window.requestAnimationFrame(animationStep);
        }
    }
    
    window.requestAnimationFrame(animationStep);
}

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

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize variables
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.tab-panel');
  const readMoreButtons = document.querySelectorAll('.read-more');
  const serviceCards = document.querySelectorAll('.service-card');
  
  // Set data attributes for color groups
  const tabGroups = {
    'data-management-tab': 'group1',
    'mapping-tab': 'group2',
    'web-app-tab': 'group3',
    'flexible-contracts-tab': 'group4'
  };
  
  // Color mapping for services within panels
  const setServiceCardColors = () => {
    panels.forEach(panel => {
      const tabId = panel.getAttribute('aria-labelledby');
      const groupColor = tabGroups[tabId] || 'group1';
      
      const cards = panel.querySelectorAll('.service-card');
      cards.forEach(card => {
        card.setAttribute('data-tab-color', groupColor);
      });
    });
  };
  
  // Initialize tab functionality
  const initTabs = () => {
    tabs.forEach(tab => {
      // Set initial data attributes
      const tabId = tab.id;
      tab.setAttribute('data-tab-color', tabGroups[tabId] || 'group1');
      
      // Add click event
      tab.addEventListener('click', () => {
        // Update tab states
        tabs.forEach(t => {
          t.setAttribute('aria-selected', 'false');
        });
        tab.setAttribute('aria-selected', 'true');
        
        // Show corresponding panel
        const panelId = tab.getAttribute('aria-controls');
        const targetPanel = document.getElementById(panelId);
        
        // Apply animation classes
        panels.forEach(panel => {
          if (panel.classList.contains('active')) {
            panel.classList.remove('active');
            panel.setAttribute('hidden', '');
          }
        });
        
        // Allow for transition before showing new panel
        setTimeout(() => {
          targetPanel.removeAttribute('hidden');
          targetPanel.classList.add('active');
          
          // Animate service cards in the active panel
          const cards = targetPanel.querySelectorAll('.service-card');
          cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
              card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 100 * index); // Staggered animation
          });
        }, 300);
      });
    });
  };
  
  // Initialize "Read More" buttons
  const initReadMoreButtons = () => {
    readMoreButtons.forEach(button => {
      button.addEventListener('click', () => {
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
  };
  
  // Add parallax effect to service cards
  const initParallaxEffect = () => {
    serviceCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        
        // Limit the tilt effect
        const tiltX = deltaY * 5;
        const tiltY = -deltaX * 5;
        
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        card.style.transition = 'transform 0.5s ease';
      });
    });
  };
  
  // Add intersection observer for scroll animations
  const initScrollAnimations = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    serviceCards.forEach(card => {
      observer.observe(card);
    });
  };
  
  // Add dynamic background effect
  const initDynamicBackground = () => {
    const servicesSection = document.getElementById('services');
    
    // Create dynamic background elements
    const createBackgroundElements = () => {
      const colors = [
        'rgba(52, 152, 219, 0.1)',
        'rgba(46, 204, 113, 0.1)',
        'rgba(155, 89, 182, 0.1)',
        'rgba(231, 76, 60, 0.1)'
      ];
      
      for (let i = 0; i < 15; i++) {
        const elem = document.createElement('div');
        elem.className = 'floating-bg-element';
        
        // Random styling
        const size = Math.random() * 100 + 50;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        elem.style.width = `${size}px`;
        elem.style.height = `${size}px`;
        elem.style.backgroundColor = color;
        elem.style.borderRadius = '50%';
        elem.style.position = 'absolute';
        elem.style.top = `${Math.random() * 100}%`;
        elem.style.left = `${Math.random() * 100}%`;
        elem.style.filter = 'blur(20px)';
        elem.style.opacity = '0.7';
        elem.style.zIndex = '0';
        elem.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
        
        // Animation
        elem.style.animation = `float ${Math.random() * 10 + 15}s infinite linear`;
        elem.style.animationDelay = `${Math.random() * 5}s`;
        
        servicesSection.appendChild(elem);
      }
      
      // Add keyframes for floating animation
      const styleSheet = document.createElement('style');
      styleSheet.textContent = `
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0); }
          33% { transform: translate(50px, 50px) rotate(120deg); }
          66% { transform: translate(-30px, 20px) rotate(240deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
      `;
      document.head.appendChild(styleSheet);
    };
    
    createBackgroundElements();
  };
  
  // Interactive tab indicator
  const initTabIndicator = () => {
    const tabsList = document.querySelector('.tabs-list');
    const indicator = document.createElement('div');
    indicator.className = 'tab-indicator';
    indicator.style.position = 'absolute';
    indicator.style.height = '3px';
    indicator.style.bottom = '0';
    indicator.style.transition = 'all 0.3s ease';
    tabsList.style.position = 'relative';
    tabsList.appendChild(indicator);
    
    const updateIndicator = (tab) => {
      const tabRect = tab.getBoundingClientRect();
      const tabsListRect = tabsList.getBoundingClientRect();
      
      indicator.style.width = `${tabRect.width}px`;
      indicator.style.left = `${tabRect.left - tabsListRect.left}px`;
      indicator.style.backgroundColor = getComputedStyle(tab).getPropertyValue('--active-color');
    };
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        updateIndicator(tab);
      });
    });
    
    // Initialize the indicator with the first active tab
    const activeTab = document.querySelector('.tab[aria-selected="true"]');
    if (activeTab) {
      setTimeout(() => {
        updateIndicator(activeTab);
      }, 100);
    }
  };
  
  // Add custom cursor effect for service cards
  const initCustomCursor = () => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.position = 'fixed';
    cursor.style.width = '30px';
    cursor.style.height = '30px';
    cursor.style.borderRadius = '50%';
    cursor.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
    cursor.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.2)';
    cursor.style.transform = 'translate(-50%, -50%)';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.transition = 'transform 0.1s ease, width 0.3s ease, height 0.3s ease, background-color 0.3s ease';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });
    
    serviceCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        cursor.style.width = '50px';
        cursor.style.height = '50px';
        cursor.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        cursor.style.mixBlendMode = 'difference';
      });
      
      card.addEventListener('mouseleave', () => {
        cursor.style.width = '30px';
        cursor.style.height = '30px';
        cursor.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
        cursor.style.mixBlendMode = 'normal';
      });
    });
    
    // Detect if device is touch-enabled
    if ('ontouchstart' in window) {
      cursor.style.display = 'none';
    }
  };
  
  // Typewriter effect for service titles
  const initTypewriterEffect = () => {
    const serviceTitles = document.querySelectorAll('.service-content h4');
    
    serviceTitles.forEach(title => {
      const originalText = title.textContent;
      title.textContent = '';
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            let i = 0;
            const typing = setInterval(() => {
              if (i < originalText.length) {
                title.textContent += originalText.charAt(i);
                i++;
              } else {
                clearInterval(typing);
              }
            }, 50);
            observer.unobserve(title);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(title);
    });
  };
  
  // Initialize all features
  setServiceCardColors();
  initTabs();
  initReadMoreButtons();
  initScrollAnimations();
  initDynamicBackground();
  initTabIndicator();
  
  // Initialize optional advanced features - uncomment to enable
  // initParallaxEffect();
  // initCustomCursor();
  // initTypewriterEffect();
  
  // Autoselect first tab on load
  const firstTab = tabs[0];
  if (firstTab) {
    firstTab.click();
  }
  
  // Add service icon animations
  const addServiceIcons = () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
      const content = card.querySelector('.service-content');
      const title = card.querySelector('h4');
      
      if (title && content) {
        const icon = document.createElement('div');
        icon.className = 'service-icon';
        icon.style.position = 'absolute';
        icon.style.top = '-25px';
        icon.style.right = '20px';
        icon.style.width = '50px';
        icon.style.height = '50px';
        icon.style.borderRadius = '50%';
        icon.style.backgroundColor = 'white';
        icon.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        icon.style.display = 'flex';
        icon.style.alignItems = 'center';
        icon.style.justifyContent = 'center';
        
        // Set icon color based on service type
        const tabPanel = card.closest('.tab-panel');
        if (tabPanel) {
          const tabId = tabPanel.getAttribute('aria-labelledby');
          const groupColor = tabGroups[tabId] || 'var(--group1-color)';
          icon.style.color = `var(--${groupColor})`;
        }
        
        content.style.position = 'relative';
        content.insertBefore(icon, content.firstChild);
      }
    });
  };
  
  // Call additional enhancements
  addServiceIcons();
  
  // Add accessibility features
  const enhanceAccessibility = () => {
    // Add keyboard navigation for tabs
    tabs.forEach(tab => {
      tab.addEventListener('keydown', (e) => {
        let index = Array.from(tabs).indexOf(tab);
        
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          index = (index + 1) % tabs.length;
          tabs[index].focus();
          tabs[index].click();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          index = (index - 1 + tabs.length) % tabs.length;
          tabs[index].focus();
          tabs[index].click();
        }
      });
    });
    
    // Add focus styles
    const style = document.createElement('style');
    style.textContent = `
      .tab:focus-visible, .read-more:focus-visible {
        outline: 2px solid var(--active-color, var(--group1-color));
        outline-offset: 2px;
      }
    `;
    document.head.appendChild(style);
  };
  
  enhanceAccessibility();
  
  // Performance optimization
  const optimizePerformance = () => {
    // Debounce function for resize events
    const debounce = (func, delay) => {
      let timeoutId;
      return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(context, args);
        }, delay);
      };
    };
    
    // Handle resize events
    const handleResize = debounce(() => {
      const activeTab = document.querySelector('.tab[aria-selected="true"]');
      if (activeTab) {
        const tabIndicator = document.querySelector('.tab-indicator');
        if (tabIndicator) {
          const tabRect = activeTab.getBoundingClientRect();
          const tabsListRect = document.querySelector('.tabs-list').getBoundingClientRect();
          
          tabIndicator.style.width = `${tabRect.width}px`;
          tabIndicator.style.left = `${tabRect.left - tabsListRect.left}px`;
        }
      }
    }, 100);
    
    window.addEventListener('resize', handleResize);
  };
  
  optimizePerformance();
});
    
}
