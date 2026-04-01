/* ============================================
   JOVENY MODELS ACADEMY — Main JavaScript
   Animations, Interactions & UI Logic
   ============================================ */

(function () {
  'use strict';

  // ============================================
  // HEADER — Scroll behavior (transparent → solid)
  // ============================================
  const header = document.getElementById('header');
  let lastScroll = 0;

  function handleHeaderScroll() {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });

  // ============================================
  // MOBILE MENU — Hamburger toggle
  // ============================================
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  function toggleMobileMenu() {
    const isOpen = hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMobileMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', toggleMobileMenu);

  // Close mobile menu when a nav link is clicked
  mobileMenu.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  // ============================================
  // SMOOTH SCROLL — for anchor links
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      var headerHeight = header.offsetHeight;
      var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Close mobile menu if open
      closeMobileMenu();
    });
  });

  // ============================================
  // ACTIVE NAV LINK — highlight on scroll
  // ============================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link, .mobile-overlay .nav-link');

  function updateActiveNav() {
    var scrollPos = window.pageYOffset + header.offsetHeight + 100;

    sections.forEach(function (section) {
      var sectionTop = section.offsetTop;
      var sectionHeight = section.offsetHeight;
      var sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ============================================
  // SCROLL REVEAL — Intersection Observer
  // ============================================
  var revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show all elements
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ============================================
  // COUNTER ANIMATION — Animated numbers
  // ============================================
  var statNumbers = document.querySelectorAll('.stat-number[data-count]');

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var textValue = el.getAttribute('data-text');

    // If it's a text stat (not a number)
    if (target === 0 && textValue) {
      el.textContent = textValue;
      return;
    }

    var prefix = el.textContent.includes('+') ? '+' : '';
    var duration = 1500;
    var start = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * target);
      el.textContent = prefix + current;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = prefix + target;
      }
    }

    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });

    statNumbers.forEach(function (el) {
      counterObserver.observe(el);
    });
  }

  // ============================================
  // HERO PARALLAX — Subtle background movement
  // ============================================
  var heroBg = document.querySelector('.hero-bg img');

  function handleParallax() {
    if (window.innerWidth < 768) return;
    var scrolled = window.pageYOffset;
    var heroHeight = document.querySelector('.hero').offsetHeight;
    if (scrolled <= heroHeight) {
      var parallaxValue = scrolled * 0.3;
      heroBg.style.transform = 'scale(1.05) translateY(' + parallaxValue + 'px)';
    }
  }

  window.addEventListener('scroll', handleParallax, { passive: true });

  // ============================================
  // HERO PARTICLES — Floating gold particles (Canvas)
  // ============================================
  var particleCanvas = document.getElementById('heroParticles');

  if (particleCanvas) {
    var ctx = particleCanvas.getContext('2d');
    var particles = [];
    var particleCount = 60;
    var animFrameId = null;

    function resizeCanvas() {
      var hero = document.querySelector('.hero');
      particleCanvas.width = hero.offsetWidth;
      particleCanvas.height = hero.offsetHeight;
    }

    function createParticle() {
      return {
        x: Math.random() * particleCanvas.width,
        y: Math.random() * particleCanvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.2 - 0.15,
        opacity: Math.random() * 0.5 + 0.1,
        fadeDir: Math.random() > 0.5 ? 1 : -1,
        fadeSpeed: Math.random() * 0.005 + 0.002
      };
    }

    function initParticles() {
      particles = [];
      for (var i = 0; i < particleCount; i++) {
        particles.push(createParticle());
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];

        // Update position
        p.x += p.speedX;
        p.y += p.speedY;

        // Pulse opacity
        p.opacity += p.fadeDir * p.fadeSpeed;
        if (p.opacity >= 0.6) { p.fadeDir = -1; }
        if (p.opacity <= 0.05) { p.fadeDir = 1; }

        // Wrap around
        if (p.x < -10) p.x = particleCanvas.width + 10;
        if (p.x > particleCanvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = particleCanvas.height + 10;
        if (p.y > particleCanvas.height + 10) p.y = -10;

        // Draw particle with golden glow
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = '#D4AF37';
        ctx.shadowColor = '#D4AF37';
        ctx.shadowBlur = p.size * 4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animFrameId = requestAnimationFrame(drawParticles);
    }

    // Only run particles when hero is visible
    var heroSection = document.querySelector('.hero');
    var particlesRunning = false;

    function startParticles() {
      if (!particlesRunning) {
        particlesRunning = true;
        drawParticles();
      }
    }

    function stopParticles() {
      if (particlesRunning) {
        particlesRunning = false;
        if (animFrameId) {
          cancelAnimationFrame(animFrameId);
          animFrameId = null;
        }
      }
    }

    if ('IntersectionObserver' in window) {
      var particleObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            startParticles();
          } else {
            stopParticles();
          }
        });
      }, { threshold: 0 });

      particleObserver.observe(heroSection);
    } else {
      startParticles();
    }

    resizeCanvas();
    initParticles();

    window.addEventListener('resize', function () {
      resizeCanvas();
      initParticles();
    });
  }

  // ============================================
  // COURSE MODALS — Open / Close
  // ============================================
  var modalButtons = document.querySelectorAll('[data-modal]');
  var modalOverlays = document.querySelectorAll('.modal-overlay');

  function openModal(modalId) {
    var modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus the close button
    var closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function closeAllModals() {
    modalOverlays.forEach(function (overlay) {
      closeModal(overlay);
    });
  }

  modalButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var modalId = this.getAttribute('data-modal');
      openModal(modalId);
    });
  });

  // Close buttons
  document.querySelectorAll('.modal-close').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var overlay = this.closest('.modal-overlay');
      closeModal(overlay);
    });
  });

  // Close on overlay click (outside modal)
  modalOverlays.forEach(function (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  // Close modal links that navigate to contact
  document.querySelectorAll('.modal-contact-link').forEach(function (link) {
    link.addEventListener('click', function () {
      closeAllModals();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeAllModals();
      closeMobileMenu();
    }
  });

  // ============================================
  // CONTACT FORM — UI feedback (no backend)
  // ============================================
  var contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var nombre = document.getElementById('form-nombre').value.trim();
      var email = document.getElementById('form-email').value.trim();

      if (!nombre || !email) {
        return;
      }

      // Visual feedback
      var submitBtn = contactForm.querySelector('button[type="submit"]');
      var originalText = submitBtn.textContent;
      submitBtn.textContent = 'Mensaje Enviado ✓';
      submitBtn.style.background = '#2ecc71';
      submitBtn.disabled = true;

      setTimeout(function () {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
        contactForm.reset();
      }, 3000);
    });
  }

})();
