/* ============================================
   PORTFOLIO — Main Script
   ============================================ */
(function () {
  'use strict';

  /* -------------------------------------------
     DOM References
     ------------------------------------------- */
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.querySelector('.nav-overlay');
  const navAnchors = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const revealElements = document.querySelectorAll('.reveal');

  /* -------------------------------------------
     1. Navbar scroll effect
     ------------------------------------------- */
  function handleNavScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // run on load

  /* -------------------------------------------
     2. Mobile nav toggle
     ------------------------------------------- */
  function openMobileNav() {
    navToggle.classList.add('open');
    navLinks.classList.add('open');
    navOverlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
    navToggle.setAttribute('aria-expanded', 'true');
  }

  function closeMobileNav() {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
    navOverlay.classList.remove('visible');
    document.body.style.overflow = '';
    navToggle.setAttribute('aria-expanded', 'false');
  }

  navToggle.addEventListener('click', function () {
    if (navLinks.classList.contains('open')) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });

  navOverlay.addEventListener('click', closeMobileNav);

  /* Close mobile nav on Escape key */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      closeMobileNav();
    }
  });

  /* -------------------------------------------
     3. Smooth scroll for nav links
     ------------------------------------------- */
  navAnchors.forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }

      /* Close mobile menu after clicking a link */
      closeMobileNav();
    });
  });

  /* -------------------------------------------
     4. Active nav-link highlighting on scroll
     ------------------------------------------- */
  function highlightActiveNav() {
    const scrollPos = window.scrollY + navbar.offsetHeight + 80;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navAnchors.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightActiveNav, { passive: true });
  highlightActiveNav(); // run on load

  /* -------------------------------------------
     5. Scroll-reveal using Intersection Observer
     ------------------------------------------- */
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target); // animate once
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    /* Fallback: show all elements immediately */
    revealElements.forEach(function (el) {
      el.classList.add('revealed');
    });
  }

  /* -------------------------------------------
     6. Dynamic copyright year
     ------------------------------------------- */
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
})();
