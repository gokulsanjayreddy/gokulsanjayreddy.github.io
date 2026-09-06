/* ============================================
   PORTFOLIO — Main Interactivity & Motion
   Gokul Sanjay Reddy Chatrala — Algorithmic Minimalism
   ============================================ */
(function () {
  'use strict';

  /* -------------------------------------------
     1. Accessibility & Feature Check
     ------------------------------------------- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isGsapAvailable = typeof gsap !== 'undefined' && !prefersReducedMotion;

  if (isGsapAvailable) {
    if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);
    if (typeof ScrollToPlugin !== 'undefined') gsap.registerPlugin(ScrollToPlugin);
  }

  /* -------------------------------------------
     2. DOM Elements
     ------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const navOverlay = document.getElementById('nav-overlay');
  const navAnchors = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('header[id], section[id], footer[id]');
  const progressBar = document.getElementById('scroll-progress-bar');
  const revealElements = document.querySelectorAll('.reveal');
  const backToTopBtn = document.getElementById('back-to-top');

  /* -------------------------------------------
     3. Orchestrated Page-Load Sequence (GSAP)
     ------------------------------------------- */
  if (isGsapAvailable) {
    const heroTl = gsap.timeline({
      defaults: { ease: 'power3.out' }
    });

    heroTl
      .fromTo('#hero-greeting',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.1 }
      )
      .fromTo('#hero-name',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.3'
      )
      .fromTo('#hero-tagline',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.35'
      )
      .fromTo('.hero-cta .btn',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
        '-=0.3'
      );

    /* Restrained, subtle geometric node parallax on mouse movement */
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const deltaX = (clientX - window.innerWidth / 2) / (window.innerWidth / 2);
        const deltaY = (clientY - window.innerHeight / 2) / (window.innerHeight / 2);

        gsap.to('.shape-1', { x: deltaX * 12, y: deltaY * 10, duration: 1.4, ease: 'power1.out' });
        gsap.to('.shape-2', { x: -deltaX * 14, y: -deltaY * 12, duration: 1.6, ease: 'power1.out' });
        gsap.to('.shape-3', { x: deltaX * 8, y: deltaY * 14, duration: 1.5, ease: 'power1.out' });
        gsap.to('.shape-4', { x: -deltaX * 16, y: deltaY * 8, duration: 1.4, ease: 'power1.out' });
        gsap.to('.shape-5', { x: deltaX * 10, y: -deltaY * 12, duration: 1.6, ease: 'power1.out' });
      }, { passive: true });
    }
  }

  /* -------------------------------------------
     4. ScrollTrigger & Scroll Interactions
     ------------------------------------------- */
  if (isGsapAvailable && typeof ScrollTrigger !== 'undefined') {
    /* Top Scroll Progress Bar */
    if (progressBar) {
      gsap.to(progressBar, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.2
        }
      });
    }

    /* Navbar styling on scroll */
    ScrollTrigger.create({
      start: 'top -20',
      onUpdate: (self) => {
        if (self.direction === 1 || window.scrollY > 20) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    });

    /* Section entry reveals */
    revealElements.forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () => el.classList.add('revealed')
      });
    });
  } else {
    /* Fallback if reduced motion or GSAP not loaded */
    revealElements.forEach((el) => el.classList.add('revealed'));
  }

  /* -------------------------------------------
     5. Mobile Navigation
     ------------------------------------------- */
  function openMobileNav() {
    if (!navToggle || !navLinks || !navOverlay) return;
    navToggle.classList.add('open');
    navLinks.classList.add('open');
    navOverlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
    navToggle.setAttribute('aria-expanded', 'true');
  }

  function closeMobileNav() {
    if (!navToggle || !navLinks || !navOverlay) return;
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
    navOverlay.classList.remove('visible');
    document.body.style.overflow = '';
    navToggle.setAttribute('aria-expanded', 'false');
  }

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', closeMobileNav);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('open')) {
      closeMobileNav();
    }
  });

  /* -------------------------------------------
     6. Smooth Navigation Scrolling
     ------------------------------------------- */
  navAnchors.forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        if (isGsapAvailable && typeof ScrollToPlugin !== 'undefined') {
          gsap.to(window, {
            duration: 0.8,
            scrollTo: { y: targetEl, offsetY: 72 },
            ease: 'power2.inOut'
          });
        } else {
          const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - 72;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
      }

      closeMobileNav();
    });
  });

  /* -------------------------------------------
     7. Interactive Card Links with Keyboard Access
     ------------------------------------------- */
  const clickableItems = document.querySelectorAll('[data-href]');

  function openItemLink(item) {
    const href = item.getAttribute('data-href');
    if (href) {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  }

  clickableItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      openItemLink(item);
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openItemLink(item);
      }
    });
  });

  /* -------------------------------------------
     8. Active Navigation Highlighting on Scroll
     ------------------------------------------- */
  function highlightActiveNav() {
    const scrollPos = window.scrollY + 100;
    let activeId = null;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        activeId = id;
      }
    });

    // Check if bottom of page reached
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
      activeId = 'contact';
    }

    navAnchors.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === '#' + activeId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', highlightActiveNav, { passive: true });
  highlightActiveNav();

  /* -------------------------------------------
     9. Back to Top Button
     ------------------------------------------- */
  function updateBackToTop() {
    if (!backToTopBtn) return;
    if (window.scrollY > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  if (backToTopBtn) {
    window.addEventListener('scroll', updateBackToTop, { passive: true });
    updateBackToTop();

    backToTopBtn.addEventListener('click', () => {
      if (isGsapAvailable && typeof ScrollToPlugin !== 'undefined') {
        gsap.to(window, {
          duration: 0.8,
          scrollTo: { y: 0 },
          ease: 'power2.inOut'
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  /* -------------------------------------------
     10. Dynamic Copyright Year
     ------------------------------------------- */
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
})();
