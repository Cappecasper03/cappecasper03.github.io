document.addEventListener('DOMContentLoaded', () => {
    const navHeight = document.querySelector('nav').offsetHeight;
    const mobileNavButton = document.querySelector('.mobile-nav-button');
    const navLinks = document.querySelector('.nav-links');

    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu after clicking a link
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // Mobile menu toggle
    if (mobileNavButton) {
        mobileNavButton.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !mobileNavButton.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });
});
