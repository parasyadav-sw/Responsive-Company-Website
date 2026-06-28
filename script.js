/**
 * TechNova Solutions - Core Script
 * Handles Theme Toggling, Navigation, Animations, Counters, and Form Validation
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Light/Dark Theme Switcher
  initThemeToggle();

  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Active Navbar Page Indicator
  setActiveNavLink();

  // Sticky Header Effect
  initStickyHeader();

  // Mobile Menu Toggle
  initMobileMenu();

  // Scroll Reveal Animations
  initScrollReveal();

  // Stats Counter Animation
  initStatsCounter();

  // Contact Form Validation
  initFormValidation();
});

/**
 * Handles Light/Dark Mode initialization and toggling with localStorage persistence
 */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggle');
  if (!themeToggleBtn) return;

  const body = document.body;

  // Retrieve previous settings or default to system theme preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    body.classList.add('dark');
  } else {
    body.classList.remove('dark');
  }

  // Bind click event to toggle classes and save choices
  themeToggleBtn.addEventListener('click', () => {
    const isDark = body.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Smooth rotate/scale transition feedback
    themeToggleBtn.style.transform = 'scale(0.8) rotate(45deg)';
    setTimeout(() => {
      themeToggleBtn.style.transform = 'scale(1) rotate(0deg)';
    }, 150);
  });
}

/**
 * Sets the active navbar link dynamically based on the current page file name
 */
function setActiveNavLink() {
  const currentPath = window.location.pathname;
  const filename = currentPath.substring(currentPath.lastIndexOf('/') + 1);
  
  const navLinks = document.querySelectorAll('.nav-link');
  let matched = false;

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === filename || (filename === '' && href === 'index.html')) {
      link.classList.add('active');
      matched = true;
    } else {
      link.classList.remove('active');
    }
  });

  // Fallback to home if nothing matched
  if (!matched && (filename === '' || filename === 'index.html')) {
    const homeLink = document.querySelector('.nav-link[href="index.html"]');
    if (homeLink) homeLink.classList.add('active');
  }
}

/**
 * Adds background shadow and blur to the header on scroll
 */
function initStickyHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  // Run on load and scroll
  handleScroll();
  window.addEventListener('scroll', handleScroll);
}

/**
 * Handles mobile hamburger toggle menu and backdrop overlay
 */
function initMobileMenu() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const body = document.body;

  if (!navToggle || !navMenu) return;

  // Create overlay element dynamically if not present
  let menuOverlay = document.querySelector('.menu-overlay');
  if (!menuOverlay) {
    menuOverlay = document.createElement('div');
    menuOverlay.classList.add('menu-overlay');
    body.appendChild(menuOverlay);
  }

  const toggleMenu = () => {
    const isOpen = navToggle.classList.toggle('open');
    navMenu.classList.toggle('active', isOpen);
    menuOverlay.classList.toggle('active', isOpen);
    body.classList.toggle('menu-open', isOpen);
  };

  const closeMenu = () => {
    navToggle.classList.remove('open');
    navMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    body.classList.remove('menu-open');
  };

  navToggle.addEventListener('click', toggleMenu);
  menuOverlay.addEventListener('click', closeMenu);

  // Close menu when clicking navigation links
  const links = navMenu.querySelectorAll('.nav-link');
  links.forEach(link => link.addEventListener('click', closeMenu));

  // Responsive reset
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
      closeMenu();
    }
  });
}

/**
 * Uses IntersectionObserver to trigger elements reveal on scroll
 */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length === 0) return;

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => revealObserver.observe(el));
}

/**
 * Stats animation that increments numbers smoothly when they appear on screen
 */
function initStatsCounter() {
  const statsSection = document.querySelector('.stats');
  const statsNumbers = document.querySelectorAll('.stats-number');
  if (!statsSection || statsNumbers.length === 0) return;

  let animated = false;

  const countUp = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000; // 2 seconds animation
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target + (el.textContent.includes('+') ? '+' : (el.textContent.includes('%') ? '%' : ''));
        clearInterval(timer);
      } else {
        let suffix = '';
        if (el.getAttribute('data-suffix')) {
          suffix = el.getAttribute('data-suffix');
        }
        el.textContent = Math.floor(current) + suffix;
      }
    }, stepTime);
  };

  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        statsNumbers.forEach(num => countUp(num));
        animated = true;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  statsObserver.observe(statsSection);
}

/**
 * Comprehensive Contact Form Validation with real-time UI response
 */
function initFormValidation() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const inputs = form.querySelectorAll('.form-control');

  const validators = {
    name: (value) => {
      if (!value.trim()) return 'Name is required';
      if (value.trim().length < 2) return 'Name must be at least 2 characters';
      return '';
    },
    email: (value) => {
      if (!value.trim()) return 'Email is required';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return 'Please enter a valid email address';
      return '';
    },
    phone: (value) => {
      if (!value.trim()) return 'Phone number is required';
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(value.replace(/[-() ]/g, ''))) {
        return 'Please enter a valid 10-digit phone number';
      }
      return '';
    },
    subject: (value) => {
      if (!value.trim()) return 'Subject is required';
      if (value.trim().length < 5) return 'Subject must be at least 5 characters';
      return '';
    },
    message: (value) => {
      if (!value.trim()) return 'Message is required';
      if (value.trim().length < 15) return 'Message must be at least 15 characters';
      return '';
    }
  };

  const showError = (input, message) => {
    const group = input.parentElement;
    group.classList.remove('success');
    group.classList.add('error');
    
    let errorEl = group.querySelector('.form-error-msg');
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.classList.add('form-error-msg');
      group.appendChild(errorEl);
    }
    errorEl.textContent = message;
  };

  const showSuccess = (input) => {
    const group = input.parentElement;
    group.classList.remove('error');
    group.classList.add('success');
  };

  const validateField = (input) => {
    const name = input.getAttribute('name');
    if (validators[name]) {
      const errorMsg = validators[name](input.value);
      if (errorMsg) {
        showError(input, errorMsg);
        return false;
      } else {
        showSuccess(input);
        return true;
      }
    }
    return true;
  };

  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      const group = input.parentElement;
      if (group.classList.contains('error')) {
        validateField(input);
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isFormValid = true;

    inputs.forEach(input => {
      const isValid = validateField(input);
      if (!isValid) {
        isFormValid = false;
      }
    });

    if (isFormValid) {
      const formData = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        subject: form.subject.value,
        message: form.message.value
      };

      console.log('Form Submitted successfully:', formData);
      showToast('Success!', 'Your message has been sent successfully. We will get back to you shortly.');

      form.reset();
      inputs.forEach(input => {
        input.parentElement.classList.remove('success', 'error');
      });
    } else {
      const firstError = form.querySelector('.form-group.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });
}

/**
 * Creates and displays a success toast message at the bottom right
 */
function showToast(title, message) {
  let toast = document.getElementById('successToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'successToast';
    toast.className = 'toast toast-success';
    
    toast.innerHTML = `
      <svg class="toast-icon success" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
      <div class="toast-content">
        <h4 id="toastTitle"></h4>
        <p id="toastMessage"></p>
      </div>
    `;
    document.body.appendChild(toast);
  }

  document.getElementById('toastTitle').textContent = title;
  document.getElementById('toastMessage').textContent = message;

  setTimeout(() => {
    toast.classList.add('show');
  }, 100);

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}
