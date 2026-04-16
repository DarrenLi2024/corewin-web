/**
 * Corewin Website — Main JavaScript
 * Handles navigation, scroll effects, animations, and form
 */

(function() {
  'use strict';

  // ========================================
  // DOM Elements
  // ========================================
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const contactForm = document.getElementById('contactForm');
  const sections = document.querySelectorAll('section[id]');
  const productCards = document.querySelectorAll('.product-card');
  const revealElements = document.querySelectorAll('.reveal, .stagger');

  // ========================================
  // Navigation
  // ========================================
  let lastScrollY = 0;
  let ticking = false;

  function handleScroll() {
    lastScrollY = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateNavbar();
        updateActiveNavLink();
        ticking = false;
      });
      ticking = true;
    }
  }

  function updateNavbar() {
    if (lastScrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  function updateActiveNavLink() {
    const scrollPos = lastScrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop - 100;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // Mobile nav toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });
  }

  // Close mobile nav on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ========================================
  // Scroll Reveal Animation
  // ========================================
  function setupRevealAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // For product cards, delay visible to create stagger effect
          if (entry.target.classList.contains('product-card')) {
            const delay = parseInt(entry.target.dataset.delay, 10) || 0;
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, delay * 100);
          } else {
            entry.target.classList.add('visible');
          }
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));

    // Observe product cards individually
    productCards.forEach((card, index) => {
      card.dataset.delay = index % 6;
      observer.observe(card);
    });
  }

  // ========================================
  // Smooth Scroll for Anchor Links
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = target.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ========================================
  // Contact Form
  // ========================================
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData.entries());

      // Basic validation
      if (!data.name || !data.email) {
        showFormError('Please fill in all required fields.');
        return;
      }

      if (!isValidEmail(data.email)) {
        showFormError('Please enter a valid email address.');
        return;
      }

      // Simulate form submission
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      // Simulate API call
      setTimeout(() => {
        // Show success state
        const formContainer = contactForm.parentElement;
        formContainer.innerHTML = `
          <div class="form-success">
            <div class="form-success-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h3>消息已发送</h3>
            <p>感谢您的咨询，我们将在24小时内回复您。</p>
          </div>
        `;
      }, 1500);
    });
  }

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function showFormError(message) {
    // Remove existing error
    const existingError = document.querySelector('.form-error');
    if (existingError) existingError.remove();

    // Create error message
    const errorDiv = document.createElement('p');
    errorDiv.className = 'form-error';
    errorDiv.style.cssText = 'color: #ef4444; font-size: 14px; margin-bottom: 16px; text-align: center;';
    errorDiv.textContent = message;

    // Insert after form
    contactForm.insertBefore(errorDiv, contactForm.firstChild);

    // Remove after 3s
    setTimeout(() => errorDiv.remove(), 3000);
  }

  // ========================================
  // Initialize
  // ========================================
  function init() {
    setupRevealAnimations();
    updateNavbar();
    updateActiveNavLink();

    // Add loaded class to body for any CSS transitions on load
    document.body.classList.add('loaded');
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
