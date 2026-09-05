/* ============================================
   PORTFOLIO — Main GSAP & Interactivity Script
   ============================================ */
(function () {
  'use strict';

  /* -------------------------------------------
     1. Register GSAP Plugins & Fallback Check
     ------------------------------------------- */
  const isGsapAvailable = typeof gsap !== 'undefined';

  if (isGsapAvailable) {
    if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);
    if (typeof TextPlugin !== 'undefined') gsap.registerPlugin(TextPlugin);
    if (typeof ScrollToPlugin !== 'undefined') gsap.registerPlugin(ScrollToPlugin);
  }

  /* -------------------------------------------
     2. DOM References
     ------------------------------------------- */
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.querySelector('.nav-overlay');
  const navAnchors = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], footer[id]');
  const progressBar = document.getElementById('scroll-progress-bar');
  const revealElements = document.querySelectorAll('.reveal');

  /* -------------------------------------------
     3. Magnetic Buttons Pull Effect
     ------------------------------------------- */
  if (isGsapAvailable) {
    document.querySelectorAll('.magnetic-btn, .about-highlight-pill').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);

        gsap.to(btn, {
          x: relX * 0.35,
          y: relY * 0.35,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1.2, 0.4)'
        });
      });
    });
  }

  /* -------------------------------------------
     4. GSAP Hero Entrance Timeline & Floating SVGs
     ------------------------------------------- */
  if (isGsapAvailable) {
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    /* Greeting Reveal */
    heroTl.fromTo('#hero-greeting', 
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.7 }
    );

    /* Title Scale/Pop Reveal */
    heroTl.fromTo('#hero-name',
      { opacity: 0, y: 35, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'back.out(1.5)' },
      '-=0.4'
    );

    /* Tagline Typewriter / Text Scramble */
    const taglineEl = document.getElementById('hero-tagline');
    if (taglineEl && typeof TextPlugin !== 'undefined') {
      const taglineText = taglineEl.textContent;
      taglineEl.textContent = '';
      heroTl.to(taglineEl, {
        opacity: 1,
        duration: 0.3
      }, '-=0.3');
      heroTl.to(taglineEl, {
        text: taglineText,
        duration: 2.0,
        ease: 'none'
      });
    } else {
      heroTl.fromTo('#hero-tagline',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.3'
      );
    }

    /* CTA Buttons Elastic Stagger Entrance */
    heroTl.fromTo('.hero-cta .btn',
      { opacity: 0, y: 30, scale: 0.88 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: 'back.out(1.7)' },
      '-=0.5'
    );

    /* Continuous Background Ambient SVG Floating Animation */
    gsap.to('.shape-1', {
      y: 22,
      x: -12,
      rotation: 14,
      duration: 5.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to('.shape-2', {
      y: -28,
      x: 15,
      rotation: -18,
      duration: 7.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to('.shape-3', {
      scale: 1.18,
      rotation: 90,
      duration: 9.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to('.shape-4', {
      y: -18,
      x: -14,
      rotation: 10,
      duration: 6.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to('.shape-5', {
      rotation: 120,
      scale: 1.1,
      duration: 11,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    /* Interactive Mouse Parallax on Hero Shapes */
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const deltaX = (clientX - centerX) / centerX;
        const deltaY = (clientY - centerY) / centerY;

        gsap.to('.shape-1', { x: deltaX * 30, y: deltaY * 20, duration: 1.2, ease: 'power2.out' });
        gsap.to('.shape-2', { x: -deltaX * 35, y: -deltaY * 25, duration: 1.4, ease: 'power2.out' });
        gsap.to('.shape-3', { x: deltaX * 20, y: deltaY * 30, duration: 1.6, ease: 'power2.out' });
        gsap.to('.shape-4', { x: -deltaX * 40, y: deltaY * 20, duration: 1.3, ease: 'power2.out' });
        gsap.to('.shape-5', { x: deltaX * 25, y: -deltaY * 30, duration: 1.5, ease: 'power2.out' });
      });
    }
  }

  /* -------------------------------------------
     5. ScrollTrigger Animations & Progress Bar
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

    /* Navbar backdrop blur & shrink effect */
    ScrollTrigger.create({
      start: 'top -30',
      onUpdate: (self) => {
        if (self.direction === 1 || window.scrollY > 30) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    });

    /* Global GSAP Scroll Reveal for ALL .reveal elements (headers, cards, footer) */
    revealElements.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            onEnter: () => el.classList.add('revealed'),
            toggleActions: 'play none none none'
          }
        }
      );
    });

    /* Section Title Underline Draw & Pop */
    document.querySelectorAll('.section-title').forEach((title) => {
      gsap.fromTo(title,
        { scale: 0.95 },
        {
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: title,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    /* Skills / Tags Pop Entrance */
    const tagContainers = document.querySelectorAll('.projects-grid, .skills-grid');
    tagContainers.forEach((container) => {
      const tags = container.querySelectorAll('.tag');
      if (tags.length > 0) {
        gsap.fromTo(tags,
          { opacity: 0, scale: 0, y: 10 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: container,
              start: 'top 82%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    });

    /* Footer Socials Elastic Stagger Entrance */
    const footerSocials = document.querySelectorAll('.footer-socials .social-link');
    if (footerSocials.length > 0) {
      gsap.fromTo(footerSocials,
        { opacity: 0, scale: 0.4, y: 25 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: '.footer',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    /* Refresh ScrollTrigger after setup to calculate exact positions */
    ScrollTrigger.refresh();

  } else {
    /* Fallback if GSAP is disabled/loading: instantly reveal all elements */
    revealElements.forEach((el) => {
      el.classList.add('revealed');
    });
  }

  /* -------------------------------------------
     6. Interactive 3D Card Tilt Mouse Effect
     ------------------------------------------- */
  if (isGsapAvailable) {
    const tiltCards = document.querySelectorAll('.project-card, .practice-item, .notes-item, .skills-card, .about-card-integrated');

    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg tilt
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          scale: 1.025,
          duration: 0.3,
          ease: 'power1.out',
          transformPerspective: 1000
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power2.out'
        });
      });
    });
  }

  /* -------------------------------------------
     7. Mobile Navigation Toggle
     ------------------------------------------- */
  function openMobileNav() {
    navToggle.classList.add('open');
    navLinks.classList.add('open');
    navOverlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
    navToggle.setAttribute('aria-expanded', 'true');

    if (isGsapAvailable) {
      gsap.fromTo('.nav-links li',
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' }
      );
    }
  }

  function closeMobileNav() {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
    navOverlay.classList.remove('visible');
    document.body.style.overflow = '';
    navToggle.setAttribute('aria-expanded', 'false');
  }

  if (navToggle) {
    navToggle.addEventListener('click', function () {
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

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      closeMobileNav();
    }
  });

  /* -------------------------------------------
     8. GSAP Smooth Navigation Scrolling
     ------------------------------------------- */
  navAnchors.forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        if (isGsapAvailable && typeof ScrollToPlugin !== 'undefined') {
          gsap.to(window, {
            duration: 1.2,
            scrollTo: { y: targetEl, offsetY: 64 },
            ease: 'power3.inOut'
          });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }

      closeMobileNav();
    });
  });

  /* -------------------------------------------
     9. Clickable Repository Cards & Items
     ------------------------------------------- */
  const clickableItems = document.querySelectorAll('[data-href]');

  function openItemLink(item) {
    const href = item.getAttribute('data-href');
    if (href) {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  }

  clickableItems.forEach(function (item) {
    item.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        return;
      }
      openItemLink(item);
    });

    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openItemLink(item);
      }
    });
  });

  /* -------------------------------------------
     10. Active Nav Link Scroll Highlighting
     ------------------------------------------- */
  function highlightActiveNav() {
    const pageHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    const scrollBottom = window.scrollY + window.innerHeight;
    const isAtPageEnd = scrollBottom >= pageHeight - 80;
    const marker = window.scrollY + navbar.offsetHeight + Math.round(window.innerHeight * 0.35);
    let activeSectionId = sections[0] ? sections[0].getAttribute('id') : null;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute('id');

      if (marker >= sectionTop) {
        activeSectionId = sectionId;
      }
    });

    if (isAtPageEnd && sections.length > 0) {
      activeSectionId = sections[sections.length - 1].getAttribute('id');
    }

    navAnchors.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + activeSectionId);
    });
  }

  window.addEventListener('scroll', highlightActiveNav, { passive: true });
  highlightActiveNav();

  /* -------------------------------------------
     11. Dynamic Copyright Year
     ------------------------------------------- */
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* -------------------------------------------
     12. Back to Top Button
     ------------------------------------------- */
  const backToTopBtn = document.getElementById('back-to-top');

  function updateBackToTop() {
    if (!backToTopBtn) return;
    if (window.scrollY > 320) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  if (backToTopBtn) {
    window.addEventListener('scroll', updateBackToTop, { passive: true });
    updateBackToTop();

    backToTopBtn.addEventListener('click', function () {
      if (isGsapAvailable && typeof ScrollToPlugin !== 'undefined') {
        gsap.to(window, {
          duration: 1.0,
          scrollTo: { y: 0 },
          ease: 'power3.inOut'
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
})();
