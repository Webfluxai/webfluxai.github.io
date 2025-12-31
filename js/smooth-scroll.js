// Smooth scroll functionality
document.addEventListener('DOMContentLoaded', function () {

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Don't do anything for # links
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const offsetTop = target.offsetTop - 80; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll to top button (optional enhancement)
    // You can add a scroll-to-top button if desired
    const createScrollToTop = () => {
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '↑';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: var(--primary-gradient);
      color: white;
      border: none;
      font-size: 24px;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 1000;
      box-shadow: var(--shadow-lg);
    `;

        document.body.appendChild(scrollBtn);

        // Show/hide scroll to top button
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                scrollBtn.style.opacity = '1';
                scrollBtn.style.visibility = 'visible';
            } else {
                scrollBtn.style.opacity = '0';
                scrollBtn.style.visibility = 'hidden';
            }
        });

        // Scroll to top on click
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Hover effect
        scrollBtn.addEventListener('mouseenter', () => {
            scrollBtn.style.transform = 'translateY(-4px)';
            scrollBtn.style.boxShadow = 'var(--shadow-xl)';
        });

        scrollBtn.addEventListener('mouseleave', () => {
            scrollBtn.style.transform = 'translateY(0)';
            scrollBtn.style.boxShadow = 'var(--shadow-lg)';
        });
    };

    // Uncomment to enable scroll to top button
    // createScrollToTop();
});
