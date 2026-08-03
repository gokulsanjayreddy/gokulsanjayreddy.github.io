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
    document.querySelectorAll('.magnetic-btn').forEach((btn) => {
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
      y: 20,
      x: -10,
      rotation: 12,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to('.shape-2', {
      y: -25,
      x: 12,
      rotation: -15,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to('.shape-3', {
      scale: 1.15,
      rotation: 90,
      duration: 9,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
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
    const tags = document.querySelectorAll('.project-card-tags .tag');
    if (tags.length > 0) {
      gsap.fromTo(tags,
        { opacity: 0, scale: 0, y: 10 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: 'back.out(2.2)',
          scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

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
    const tiltCards = document.querySelectorAll('.project-card, .practice-item, .notes-item');

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
})();
