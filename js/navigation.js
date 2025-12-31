// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.navbar');
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarMobile = document.querySelector('.navbar-mobile');
  const navbarOverlay = document.querySelector('.navbar-overlay');
  const body = document.body;

  // Mobile menu toggle
  if (navbarToggle) {
    navbarToggle.addEventListener('click', function() {
      navbarToggle.classList.toggle('active');
      navbarMobile.classList.toggle('active');
      navbarOverlay.classList.toggle('active');
      body.style.overflow = navbarMobile.classList.contains('active') ? 'hidden' : '';
    });
  }

  // Close mobile menu when overlay is clicked
  if (navbarOverlay) {
    navbarOverlay.addEventListener('click', function() {
      navbarToggle.classList.remove('active');
      navbarMobile.classList.remove('active');
      navbarOverlay.classList.remove('active');
      body.style.overflow = '';
    });
  }

  // Close mobile menu when a link is clicked
  const mobileLinks = document.querySelectorAll('.navbar-mobile-link, .navbar-mobile-cta');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      navbarToggle.classList.remove('active');
      navbarMobile.classList.remove('active');
      navbarOverlay.classList.remove('active');
      body.style.overflow = '';
    });
  });

  // Scroll effect on navbar
  let lastScroll = 0;
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class when scrolling down
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });

  // Highlight active page in navigation
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-link, .navbar-mobile-link');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    
    // Remove existing active classes first
    link.classList.remove('active');
    
    // Add active class to current page
    if (linkPage === currentPage || 
        (currentPage === '' && linkPage === 'index.html') ||
        (currentPage === '/' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });
});
