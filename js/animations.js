// Scroll-triggered animations using Intersection Observer
document.addEventListener('DOMContentLoaded', function () {

    // Create Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: unobserve after animation to improve performance
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with reveal classes
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    revealElements.forEach(el => observer.observe(el));

    // Service card hover effects with micro-interactions
    const serviceCards = document.querySelectorAll('.service-card, .industry-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(-4px)';
        });
    });

    // Feature card animations
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add stagger effect to grid items
    const addStaggerEffect = (selector, delay = 100) => {
        const items = document.querySelectorAll(selector);
        items.forEach((item, index) => {
            item.style.transitionDelay = `${index * delay}ms`;
        });
    };

    addStaggerEffect('.grid .card', 80);
    addStaggerEffect('.service-detail', 100);
    addStaggerEffect('.value-card', 80);
    addStaggerEffect('.benefit-card', 60);

    // Button ripple effect on click
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
      `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation to styles
    if (!document.querySelector('#ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
        document.head.appendChild(style);
    }

    // Removed parallax effect to prevent section overlapping
    // Smooth scrolling is handled by smooth-scroll.js instead

    // Interactive icon animations
    const serviceIcons = document.querySelectorAll('.service-icon, .value-icon, .industry-icon');
    serviceIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function () {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'iconBounce 0.5s ease';
            }, 10);
        });
    });

    // Add icon bounce animation
    if (!document.querySelector('#icon-animations')) {
        const style = document.createElement('style');
        style.id = 'icon-animations';
        style.textContent = `
      @keyframes iconBounce {
        0%, 100% { transform: scale(1) rotate(0deg); }
        25% { transform: scale(1.1) rotate(-5deg); }
        50% { transform: scale(1.15) rotate(5deg); }
        75% { transform: scale(1.1) rotate(-3deg); }
      }
    `;
        document.head.appendChild(style);
    }

    // Smooth number counting animation (if you add stats)
    const animateNumber = (element, target, duration = 2000) => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    };

    // Add loading state removal (fade in content)
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
